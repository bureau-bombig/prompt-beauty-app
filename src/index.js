import postImage from "./modules/postImage.js";
console.log("Welcome to Prompt Beauty");

onDOMContentLoaded = (event) => {
  // Post Image Script
  if (top.location.pathname.toString() === "/post-image/") {
    console.log("Post Image page detected");
    postImage();
  }

  // Edit Image Script
  // ...

  // Edit Profile Script
  // ...

  // Post Resource Script
  // ...
};
