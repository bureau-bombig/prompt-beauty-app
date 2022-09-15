import postImage from "./modules/postImage.js";

print("top.location.pathname: " + top.location.pathname);

if (top.location.pathname.toString() === "https://prompt.beauty/post-image/") {
  postImage();
}
