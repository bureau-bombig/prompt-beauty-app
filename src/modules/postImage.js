// import Notiflix from "notiflix";
// import validator from "validator";
//import filetypeinfo from "magic-bytes.js";
import readFileAsync from "./utils/readFileAsync.js";

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
  image.addEventListener("change", async (event) => {
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
    if (file && !error) {
      const { filetypeinfo } = await import(/* webpackChunkName: "magic-bytes.js" */ "magic-bytes.js");
      const fileReader = new FileReader();
      const buffer = await readFileAsync(event.target.files[0]);
      const bytes = new Uint8Array(buffer);
      const type = filetypeinfo(bytes);
      const isImage = type[0].typename === "jpg" || type[0].typename === "png";
      if (!isImage) {
        cleanPreview();
        error = "Your File has to be an Image in PNG or JPG Format.";
        console.log(error);
      }
    }

    // Check File is less than 5MB
    if (file && file.size > 5242880 && !error) {
      cleanPreview();
      image.value = null;
      error = "Your File has to be less than 5mb.";
      console.log(error);
    }

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

  title.addEventListener("change", async (event) => {
    const { default: validator } = await import(/* webpackChunkName: "validator" */ "validator");
    const value = event.target.value;
    if (validator.isEmpty(value)) {
      titleError.textContent = "Please enter a title.";
    } else {
      titleError.textContent = "";
    }
  });

  model.addEventListener("change", (event) => {
    const value = event.target.value;
    if (value === "none") {
      modelError.textContent = "Please enter a model.";
    } else {
      modelError.textContent = "";
    }
  });

  description.addEventListener("change", async (event) => {
    const { default: validator } = await import(/* webpackChunkName: "validator" */ "validator");
    const value = event.target.value;
    if (!validator.isLength(value, { min: 0, max: 1000 })) {
      descriptionError.textContent = "Your description has to be less than 1000 characters.";
    } else {
      descriptionError.textContent = "";
    }
  });

  // Upload Image to Wordpress
  async function uploadImage() {
    const { default: Notiflix } = await import(/* webpackChunkName: "notiflix" */ "notiflix");

    // Bad Idea to validate like this...
    const errorElements = document.querySelectorAll("[id^='bb_error']");

    for (let i = 0; i < errorElements.length; i++) {
      const { default: validator } = await import(/* webpackChunkName: "validator" */ "validator");
      if (!validator.isEmpty(errorElements[i].textContent)) {
        console.log(errorElements[i]);
        console.log(errorElements[i].textContent);
        console.log(errorElements[i].textContent.length);
        Notiflix.Notify.failure(errorElements[i].textContent);
        return;
      }
    }

    const formData = new FormData();
    const imageFile = image.files[0];
    const imageTitle = title.value.length > 120 ? title.value.substring(0, 120) : title.value;
    const blob = imageFile.slice(0, imageFile.size);
    const renamed = new File([blob], imageTitle, { type: `${imageFile.type}` });

    formData.append("file", renamed);
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
