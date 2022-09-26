import Notiflix from "notiflix";
import natify from "natify";
import loader from "../modules/utils/loader.js";

async function editProfile() {
  const natifyForm = natify({ selector: ".bb-form" });
  const form = natifyForm.container;
  const file = form.querySelector("#bb_user_image");
  const userLogin = form.querySelector("#bb_user_login");
  const email = form.querySelector("#bb_email");
  const bio = form.querySelector("#bb_biographical-info");
  const website = form.querySelector("#bb_website");
  const instagram = form.querySelector("#bb_instagram");
  const twitter = form.querySelector("#bb_twitter");
  const facebook = form.querySelector("#bb_facebook");
  const pinterest = form.querySelector("#bb_pinterest");
  const behance = form.querySelector("#bb_behance");
  const twitch = form.querySelector("#bb_twitch");
  const medium = form.querySelector("#bb_medium");
  const youtube = form.querySelector("#bb_youtube");
  const deviantart = form.querySelector("#bb_deviantart");
  const reddit = form.querySelector("#bb_reddit");
  const tumblr = form.querySelector("#bb_tumblr");
  const dribble = form.querySelector("#bb_dribble");
  const preview = form.querySelector("#bb_current_user_image");
  const submit = form.querySelector("#bb_submit");
  const deleteAccount = form.querySelector("#bb_delete_account");

  let isSending = false;
  const currentImageUrl = preview.src;

  // Profile Image Preview
  file.addEventListener("change", (event) => {
    if (file.checkValidityAll() && event.target.files[0]) {
      const url = URL.createObjectURL(event.target.files[0]);
      preview.src = url;
    } else {
      preview.src = currentImageUrl;
    }
  });

  // Save Profile Changes
  submit.addEventListener("click", saveProfile);

  async function saveProfile() {
    if (!form.checkValidityAll() || isSending) {
      console.log("not valid");
      return;
    }

    isSending = true;
    submit.disabled = true;
    submit.innerHTML = loader;
    console.log("sending...");

    const url = wp_api_settings.root + "wp/v2/users/me";
    const formData = {};
    formData.email = email.value;
    formData.description = bio.value;
    formData.acf = {
      website: website.value,
      instagram: instagram.value,
      twitter: twitter.value,
      facebook: facebook.value,
      pinterest: pinterest.value,
      behance: behance.value,
      twitch: twitch.value,
      medium: medium.value,
      youtube: youtube.value,
      deviantart: deviantart.value,
      reddit: reddit.value,
      tumblr: tumblr.value,
      dribble: dribble.value,
    };

    if (currentImageUrl !== preview.src) {
      const imageUpload = await uploadImage();
      if (imageUpload.id) {
        formData.acf.user_image = imageUpload.id;
      } else {
        Notiflix.Notify.failure("Image upload failed.");
        return;
      }
    }

    const request = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": wp_api_settings.nonce,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, request);
    const data = await response.json();
    console.log(data);

    if (!data.status) {
      Notiflix.Notify.success("Yay, profile updated successfully!");
    } else {
      Notiflix.Notify.failure("Something is Rotten in the State of Denmark.");
    }

    isSending = false;
    submit.disabled = false;
    submit.innerHTML = "Save Changes";
  }

  async function uploadImage() {
    const title = `user-profile-image-${userLogin.value}`;
    const url = wp_api_settings.root + "wp/v2/media";
    const formData = new FormData();
    formData.append("file", file.files[0]);
    formData.append("status", "publish");
    formData.append("title", title);

    const request = {
      method: "POST",
      headers: {
        "Content-Disposition": "attachment",
        "X-WP-Nonce": wp_api_settings.nonce,
      },
      body: formData,
    };

    const response = await fetch(url, request);
    const data = await response.json();
    return data;
  }

  // Delete Account
  // deleteAccount.addEventListener("click", deleteAccountHandler);

  // async function deleteAccountHandler() {
  //   // Create confirm Prompt
  //   const confirm = Notiflix.Confirm.show(
  //     "Delete Account",
  //     "Are you sure you want to delete your account include all your posts? This action cannot be undone.",
  //     "God, no!",
  //     "Delete",
  //     () => {
  //       // do nothing
  //     },
  //     async () => {
  //       // Delete Account
  //       const url = wp_api_settings.root + "wp/v2/users/me/?force=true&reassign=1";
  //       const request = {
  //         method: "DELETE",
  //         headers: {
  //           "X-WP-Nonce": wp_api_settings.nonce,
  //         },
  //       };
  //       const response = await fetch(url, request);
  //       const data = await response.json();
  //       console.log(data);
  //     },
  //     {}
  //   );
  // }
}
export default editProfile;
