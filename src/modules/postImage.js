import Notiflix from "notiflix";
import validator from "validator";
import isImage from "./utils/isImage.js";

async function postImage() {
  const image = document.querySelector("#bb_image");
  const imageError = document.querySelector("#bb_error_image");
  const preview = document.querySelector("#bb_preview_image");
  const title = document.querySelector("#bb_title");
  const titleError = document.querySelector("#bb_error_title");
  const titleIsPrompt = document.querySelector("#bb_title_is_prompt");
  const titleIsPromptError = document.querySelector("#bb_error_title_is_prompt");
  const model = document.querySelector("#bb_model");
  const modelError = document.querySelector("#bb_error_model");
  const description = document.querySelector("#bb_description");
  const descriptionError = document.querySelector("#bb_error_description");
  const submit = document.querySelector("#bb_submit");

  // Validate Image Input and if okay render Preview
  image.addEventListener("change", (event) => {
    const file = event.target.files[0];

    function cleanPreview() {
      preview.src = "";
      preview.style.display = "none";
    }

    let error = false;

    // Check File exists
    if (!file) {
      cleanPreview();
      error = "Please, select an image.";
      console.log(error);
    }

    // Check File is an Image
    if (!isImage() && error === false) {
      cleanPreview();
      error = "Your File has to be an Image in PNG, JPG or JPEG Format.";
      console.log(error);
    }

    // Check File is less than 5MB

    if (error) {
      imageError.textContent = error;
      return;
    }
    {
      imageError.textContent = "";
    }

    // Render Preview
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  });

  submit.addEventListener("click", uploadImage);

  //title.addEventListener("change", validateForm);
  //titleIsPrompt.addEventListener("change", validateForm);
  //model.addEventListener("change", validateForm);
  //description.addEventListener("change", validateForm);

  // Upload Image to Wordpress
  async function uploadImage() {
    const formData = new FormData();
    formData.append("file", image.files[0]);
    formData.append("status", "publish");
    formData.append("title", title.value);

    const url = wp_api_settings.root + "wp/v2/media";
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
    if (data.id) {
      sendData(data.id);
    } else {
      console.log("error", data);
      Notiflix.Notify.failure("Something is rotten in the state of Denmark");
    }
  }

  // Send Data to Wordpress with Image Id from previous functions
  async function sendData(imageId) {
    const url = wp_api_settings.root + "wp/v2/images/";
    const formData = {
      // Formdata
      title: title.value,
      featured_media: imageId,
      acf: {
        title_is_prompt: titleIsPrompt.checked,
        model: model.value,
        description: description.value,
      },
      // General
      status: "publish",
    };

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

    if (data.link) {
      window.location.href = data.link;
    } else {
      console.log("Error", data);
      Notiflix.Notify.failure("Something is rotten in the state of Denmark");
    }
  }
}

export default postImage;
