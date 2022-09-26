async function likePost() {
  const bbLikeButton = document.querySelector("#bbLikeButton");
  const bbLikeCounter = document.querySelector("#bbLikeCounter");
  const bbLikeCounterWrapper = document.querySelector("#bbLikeCounterWrapper");

  // Check there is a like button
  if (!bbLikeButton || !bbLikeCounter || !bbLikeCounterWrapper) {
    return;
  }

  // Check there is a user nonce
  if (!wp_api_settings.nonce) {
    return;
  }

  // Check User has liked this Post and Set liked class
  const url = wp_api_settings.root + "promptbeauty/v1/like/";
  const request = {
    method: "GET",
    headers: {
      "X-WP-Nonce": wp_api_settings.nonce,
    },
  };
  const response = await fetch(url, request);
  const data = await response.json();
  if (data.userHasLiked) {
    bbLikeCounterWrapper.classList.add("bb-is-liked");
  }

  // Add Event Listener to Like Button
  bbLikeButton.addEventListener("click", async (event) => {
    const { default: Notiflix } = await import(/* webpackChunkName: "notiflix" */ "notiflix");

    if (!wp_api_settings.nonce) {
      Notiflix.Notify.failure("Liking is only available for logged in users.");
    }

    const url = wp_api_settings.root + "promptbeauty/v1/like/";
    const request = {
      method: "POST",
      headers: {
        "X-WP-Nonce": wp_api_settings.nonce,
      },
    };
    const response = await fetch(url, request);
    const data = await response.json();

    if (data.status === "error") {
      Notiflix.Notify.failure(data.message);
    }

    if (data.status === "success") {
      if (data.action === "liked") {
        bbLikeCounterWrapper.classList.add("bb-is-liked");
      } else if (data.action === "unliked") {
        bbLikeCounterWrapper.classList.remove("bb-is-liked");
      }
      bbLikeCounter.textContent = data.new_like_count;
      return;
    }

    Notiflix.Notify.failure("Something is Rotten in the State of Denmark");
  });
}
likePost();
export default likePost;
