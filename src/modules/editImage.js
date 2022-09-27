import Notiflix from "notiflix";
import natify from "natify";
import loader from "../modules/utils/loader.js";

async function editImage() {
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
  const image = form.querySelector("#bb-edit-image");
  const deleteImage = form.querySelector("#bb_delete");
  let isSending = false;

  const params = new URLSearchParams(top.location.search);
  const postId = params.get("id");

  // Get Image Data on page load
  let response = await fetch(`${wp_api_settings.root}wp/v2/images/${postId}`);
  const data = await response.json();

  response = await fetch(`${wp_api_settings.root}wp/v2/media/${data.featured_media}`);
  const media = await response.json();

  // Set to Input Values
  title.value = data.title.rendered;
  model.value = data.acf.model;
  description.value = data.acf.description;
  pdPrompt.value = data.acf.prompt_details_prompt;
  pdSeed.value = data.acf.prompt_details_seed;
  pdWidth.value = data.acf.prompt_details_width;
  pdHeight.value = data.acf.prompt_details_height;
  pdSteps.value = data.acf.prompt_details_steps;
  pdGuidanceScale.value = data.acf.prompt_details_guidance_scale;
  pdSampler.value = data.acf.prompt_details_sampler;
  titleIsPrompt.checked = data.acf.title_is_prompt;
  image.src = media.media_details.sizes.medium ? media.media_details.sizes.medium.source_url : media.source_url;

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
  setPdPrompt();
  titleIsPrompt.addEventListener("change", setPdPrompt);
  title.addEventListener("input", setPdPrompt);

  // Update Post
  submit.addEventListener("click", postNewImage);

  async function postNewImage() {
    if (!form.checkValidityAll() || isSending) {
      return;
    }

    isSending = true;
    submit.disabled = true;
    submit.innerHTML = loader;

    const url = wp_api_settings.root + `wp/v2/images/${postId}`;

    // update function
    async function updateImage(body) {
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
        body: body,
      };
      const response = await fetch(url, request);
      return await response.json();
    }

    const formData = {};
    formData.title = title.value;
    formData.acf = {
      model: model.value ? model.value : null,
      description: description.value ? description.value : null,
      prompt_details_prompt: pdPrompt.value ? pdPrompt.value : null,
      prompt_details_seed: pdSeed.value ? pdSeed.value : null,
      prompt_details_width: pdWidth.value ? pdWidth.value : null,
      prompt_details_height: pdHeight.value ? pdHeight.value : null,
      prompt_details_steps: pdSteps.value ? pdSteps.value : null,
      prompt_details_sampler: pdSampler.value ? pdSampler.value : null,
      title_is_prompt: titleIsPrompt.checked ? titleIsPrompt.checked : null,
      prompt_details_guidance_scale: pdGuidanceScale.value ? pdGuidanceScale.value : null,
    };

    const response = await updateImage(JSON.stringify(formData));

    if (response.link) {
      window.location.href = response.link;
    } else {
      Notiflix.Notify.failure("Something is Rotten in the State of Denmark!");
    }
  }

  // Submit Form
  deleteImage.addEventListener("click", handleDeleteImage);

  async function handleDeleteImage() {
    if (isSending) {
      return;
    }

    isSending = true;
    deleteImage.disabled = true;
    deleteImage.innerHTML = loader;

    Notiflix.Confirm.show(
      "Delete Image",
      "Are you sure you want to delete this image? This action cannot be undone.",
      "God, no!",
      "Yes, delete it!",
      () => {
        isSending = false;
        deleteImage.disabled = false;
        deleteImage.innerHTML = "Delete Image";
      },
      async () => {
        // Delete Post
        const url = wp_api_settings.root + `wp/v2/images/${postId}?force=true`;
        const request = {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "X-WP-Nonce": wp_api_settings.nonce,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        };
        const response = await fetch(url, request);
        const result = await response.json();

        // Delete Media
        const mediaUrl = wp_api_settings.root + `wp/v2/media/${data.featured_media}?force=true`;
        const mediaRequest = {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "X-WP-Nonce": wp_api_settings.nonce,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        };
        const mediaResponse = await fetch(mediaUrl, mediaRequest);
        const mediaResult = await mediaResponse.json();

        if (result.deleted && mediaResult.deleted) {
          window.location.href = `/artists/${wp_api_settings.userLogin}`;
        } else {
          Notiflix.Notify.failure("Something is Rotten in the State of Denmark!");
        }
      },
      {}
    );
  }
}

export default editImage;
