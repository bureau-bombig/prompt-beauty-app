import isValidTitle from "./validation/validTitle.js";

async function postImage() {
  const title = document.querySelector("#bb_title");

  title.addEventListener("input", (event) => isValidTitle(event.target));

  //   title.addEventListener("input", (event) => {
  //     if (title.validity.tooShort || title.validity.tooLong) {
  //       title.setCustomValidity("Please choose a title Between 3 or 100 Characters. Like our CMS specifies.");
  //       title.reportValidity();
  //     } else {
  //       title.setCustomValidity("");
  //     }
  //   });
}

export default postImage;
