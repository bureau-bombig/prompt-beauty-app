async function postImage() {
  const image = document.querySelector("#bb_image");
  const preview = document.querySelector("#bb_preview_image");
  const title = document.querySelector("#bb_title");
  const titleIsPrompt = document.querySelector("#bb_title_is_prompt");
  const model = document.querySelector("#bb_model");
  const description = document.querySelector("#bb_description");
  const submit = document.querySelector("#bb_submit");

  // Set Preview Image on File Input change
  image.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (!file) {
      preview.src = "";
      preview.style.display = "none";
      return;
    }

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  });

  submit.addEventListener("click", uploadImage);

  // Validate Form

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
    const { id } = await response.json();
    sendData(id);
  }

  // Send Data to Wordpress with Image Id from previous functions
  async function sendData(imageId) {
    console.log("imageId", imageId);
    console.log("typeof imageId", typeof imageId);
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

    console.log("data.link:");
    console.log(data.link);
    console.log(typeof data.link);

    if (!data.link) {
      // Error Handling
      console.log("Error", data);
      return;
    } else {
      console.log("success", data);
    }

    // window.location.href = data.link;
  }
}

export default postImage;
