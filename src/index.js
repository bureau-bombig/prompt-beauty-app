import postImage from "./modules/postImage.js";
import Notiflix from "notiflix";

Notiflix.Notify.init({
  distance: "20px",
  zindex: 999999,
  fontFamily: "Inter",
  closeButton: true,
  useGoogleFont: false,
  useFontAwesome: false,
});

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
  // ...
});
