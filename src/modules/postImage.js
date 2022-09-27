import Notiflix from "notiflix";
import natify from "natify";
import loader from "../modules/utils/loader.js";

async function postImage() {
  // Form Validation
  const form = natify({ selector: ".bb-form" }).container;
  const submit = form.querySelector("#bb_submit");
  const file = form.querySelector("#bb_image");
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
  let isSending = false;

  // Image Preview
  file.addEventListener("change", (event) => {
    if (file.checkValidityAll()) {
      const oldPreview = document.querySelector(".bb-image-preview");
      if (oldPreview) oldPreview.remove();
      const url = URL.createObjectURL(event.target.files[0]);
      const preview = document.createElement("img");
      preview.src = url;
      preview.classList.add("bb-image-preview");
      preview.alt = "image preview";
      file.after(preview);
    } else {
      const oldPreview = document.querySelector(".bb-image-preview");
      if (oldPreview) oldPreview.remove();
    }
  });

  // Title is Prompt
  function setPdPrompt() {
    if (titleIsPrompt.checked) {
      pdPrompt.value = title.value;
      pdPrompt.disabled = true;
    } else {
      pdPrompt.value = "";
      pdPrompt.disabled = false;
    }
  }
  titleIsPrompt.addEventListener("change", setPdPrompt);
  title.addEventListener("input", setPdPrompt);

  submit.addEventListener("click", async (e) => {
    if (!form.checkValidityAll() || isSending) {
      return;
    }

    isSending = true;
    submit.disabled = true;
    submit.innerHTML = loader;

    const imageUpload = await uploadImage();
    const postPublish = await publishPost(imageUpload.id);
    if (imageUpload && postPublish) {
      window.location.href = postPublish.link;
    } else {
      Notiflix.Notify.failure("Something is Rotten in the State of Denmark!");
    }

    isSending = false;
    submit.disabled = false;
    submit.innerHTML = "Submit";
  });

  async function publishPost(id) {
    const url = wp_api_settings.root + "wp/v2/images/";

    const formData = {};

    // Required
    formData.title = title.value;
    formData.featured_media = id;
    formData.status = "publish";
    const acf = {
      title_is_prompt: titleIsPrompt.checked,
      model: model.value,
    };

    // Optional
    if (description.value) acf.description = description.value;
    if (pdPrompt.value) acf.prompt_details_prompt = pdPrompt.value;
    if (pdSeed.value) acf.prompt_details_seed = pdSeed.value;
    if (pdWidth.value) acf.prompt_details_width = pdWidth.value;
    if (pdHeight.value) acf.prompt_details_height = pdHeight.value;
    if (pdSteps.value) acf.prompt_details_steps = pdSteps.value;
    if (pdGuidanceScale.value) acf.prompt_details_guidance_scale = pdGuidanceScale.value;
    if (pdSampler.value) acf.prompt_details_sampler = pdSampler.value;

    formData.acf = acf;

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
    const imageFile = file.files[0];
    const formData = new FormData();
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
