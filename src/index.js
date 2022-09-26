// Import Third Party Packages
// import Notiflix from "notiflix";

// Import Custom Modules
import postImage from "./modules/postImage";
import postResource from "./modules/postResource";
import likePost from "./modules/likePost";
import convertMarkdown from "./modules/convertMarkdown";
import editProfil from "./modules/editProfil";
import updateViewMeta from "./modules/updateViewMeta";

// Run Modules on specific Sites
window.addEventListener("DOMContentLoaded", (event) => {
  // Post Image Script
  if (top.location.pathname.toString() === "/post-image/") {
    postImage();
  }

  if (top.location.pathname.toString() === "/edit-profile/") {
    editProfil();
  }

  if (top.location.pathname.toString().includes("/images/")) {
    updateViewMeta();
  }

  // Edit Image Script
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
