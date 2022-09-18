// Import Third Party Packages
import Notiflix from "notiflix";

// Import Custom Modules
import postImage from "./modules/postImage.js";
import postResource from "./modules/postResource.js";
import likePost from "./modules/likePost.js";
import convertMarkdown from "./modules/convertMarkdown.js";

// Define Settings
Notiflix.Notify.init({
  distance: "20px",
  zindex: 999999,
  fontFamily: "Inter",
  useGoogleFont: false,
  borderRadius: "10px",
  useFontAwesome: false,
});

// Run Modules on specific Sites
window.addEventListener("DOMContentLoaded", (event) => {
  // Post Image Script
  if (top.location.pathname.toString() === "/post-image/") {
    postImage();
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
});
