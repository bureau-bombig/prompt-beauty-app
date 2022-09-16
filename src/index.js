import postImage from "./modules/postImage.js";

console.log("Welcome to Prompt Beauty");

if (top.location.pathname.toString() === "/post-image/") {
  console.log("Post Image page detected");
  postImage();
}
