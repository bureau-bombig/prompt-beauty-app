// Import Third Party Packages
// import Notiflix from "notiflix";

// Import Custom Modules
//import postImage from "./modules/postImage.js";
import postResource from "./modules/postResource.js";
import likePost from "./modules/likePost.js";
import convertMarkdown from "./modules/convertMarkdown.js";
import natify from "natify";

// Run Modules on specific Sites
window.addEventListener("DOMContentLoaded", (event) => {
  // Post Image Script
  if (top.location.pathname.toString() === "/post-image/") {
    //postImage();
  }

  // Edit Image Script
  // ...

  // Edit Profile Script
  // ...

  // Post Resource Script
  if (top.location.pathname.toString() === "/post-resource/") {
    postResource();
  }

  // Like Post Logic
  likePost();

  // Convert Markdown to html
  convertMarkdown();

  // Form Validation
  natify({
    selector: ".bb-form",
    successColor: "#00ff00",
    errorColor: "#ff0000",
    successIcon: "✔",
    errorIcon: "🞭",
    fontSize: "15px",
    borderWidth: "2px",
    borderStyle: "solid",
    preventDefault: true,
    formSubmit: false,
    onSubmit: true,
  });
});

// Define Settings

async function notiflixSetting() {
  const { default: Notiflix } = await import(/* webpackChunkName: "notiflix" */ "notiflix");
  Notiflix.Notify.init({
    distance: "20px",
    zindex: 999999,
    fontFamily: "Inter",
    useGoogleFont: false,
    borderRadius: "10px",
    useFontAwesome: false,
  });
}

notiflixSetting();
