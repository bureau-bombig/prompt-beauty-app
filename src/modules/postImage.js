async function postImage() {
  const image = document.querySelector("#bb_image");
  const title = document.querySelector("#bb_title");
  const titleIsPrompt = document.querySelector("#bb_title_is_prompt");
  const model = document.querySelector("#bb_model");
  const description = document.querySelector("#bb_description");
  const submit = document.querySelector("#bb_submit");
  submit.addEventListener("click", sendImage);

  console.log("Formelements: ", image, title, titleIsPrompt, model, description, submit);

  async function sendImage() {
    console.log("Sending image...");
  }
}

export default postImage;
