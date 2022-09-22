import Notiflix from "notiflix";
import natify from "natify";

async function postImage() {
  // Form Validation
  const form = natify({ selector: ".bb-form" }).container;
  const submit = form.querySelector("#bb_submit");
  const title = form.querySelector("#bb_title");
  const titleIsPrompt = form.querySelector("#bb_title_is_prompt");
  const model = form.querySelector("#bb_model");
  const description = form.querySelector("#bb_description");
  const pdPrompt = form.querySelector("#bb_prompt_details_prompt");
  const pdSeed = form.querySelector("#bb_prompt_details_seed");
  const pdWidth = form.querySelector("#bb_prompt_details_width");
  const pdHeight = form.querySelector("#bb_prompt_details_height");
  const pdSteps = form.querySelector("#bb_prompt_details_steps");
  const pdGuidanceScale = form.querySelector("#bb_prompt_details_guidance_scale");
  const pdSampler = form.querySelector("#bb_prompt_details_sampler");

  // Title is Prompt
  function setPdPrompt() {
    if (titleIsPrompt.checked) {
      pdPrompt.value = title.value;
    } else {
      pdPrompt.value = "";
    }
  }
  titleIsPrompt.addEventListener("change", setPdPrompt);
  title.addEventListener("input", setPdPrompt);

  submit.addEventListener("click", async (e) => {
    if (!form.checkValidityAll()) {
      return;
    }
    const imageUpload = await uploadImage();
    const postPublish = await publishPost(imageUpload.id);
    if (imageUpload && postPublish) {
      window.location.href = postPublish.link;
    } else {
      Notiflix.Notify.failure("Something is Rotten in the State of Denmark!");
    }
  });

  async function publishPost(id) {
    const url = wp_api_settings.root + "wp/v2/images/";
    const formData = {
      // Formdata
      title: title.value,
      featured_media: id,
      acf: {
        title_is_prompt: titleIsPrompt.checked,
        model: model.value,
        description: description.value,
        prompt_details_prompt: pdPrompt.value,
        prompt_details_seed: pdSeed.value,
        prompt_details_width: pdWidth.value,
        prompt_details_height: pdHeight.value,
        prompt_details_steps: pdSteps.value,
        prompt_details_guidance_scale: pdGuidanceScale.value,
        prompt_details_sampler: pdSampler.value,
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
      return data;
    } else {
      return false;
    }
  }

  async function uploadImage() {
    const title = form.querySelector("#bb_title").value;
    const formData = new FormData();
    const imageFile = form.querySelector("#bb_image").files[0];
    const extension = imageFile.name.substr(imageFile.name.lastIndexOf(".") + 1);
    formData.append("file", imageFile, title + "." + extension);
    formData.append("status", "publish");
    formData.append("title", title);

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
      return data;
    } else {
      return false;
    }
  }
}

export default postImage;
