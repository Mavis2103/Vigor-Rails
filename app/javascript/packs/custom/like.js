// document.addEventListener("mouseover", (e) => {
let post_like_id = document.querySelector(
  `.MainPage__feed-bodyReaction-like--like`
).dataset.post_like_id;
let post_user_like_id = document.querySelector(
  `.MainPage__feed-bodyReaction-like--like`
).dataset.post_user_like_id;
// let likers = e.target.dataset.likers;
console.log(post_like_id);
// if (!!post_like_id) {
let element = document.querySelector(
  `.MainPage__feed-bodyReaction-like--like[data-post_like_id="${post_like_id}"]`
);
element.addEventListener("click", (event) => {
  console.log(element.dataset.post_like_id);
  console.log(element);
  fetchLIKE(post_like_id);
});
// }

let fetchLIKE = async (post_like_id) => {
  let rq = await fetch(`/v1/like/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
    body: JSON.stringify({
      post_id: post_like_id,
    }),
  }).then((x) => x.json());
  console.log(rq);
  if (rq.status === "success") {
    window.location.reload();
  }
};

/* Delete */
var likers = document.querySelector(".MainPage__feed-bodyReaction-like--unlike")
  .dataset.likers;
var postLiker = document.querySelector(
  ".MainPage__feed-bodyReaction-like--unlike"
).dataset.post_liker;
if (likers == JSON.parse(localStorage.getItem("info")).id) {
  document
    .querySelector(`.MainPage__feed-bodyReaction-like--unlike`)
    .addEventListener("click", async (e) => {
      console.log(1);

      let rq = await fetch(`/v1/like/${postLiker}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((x) => x.json());
      console.log(`dis:${rq}`);
      if (rq.status === "success") {
        window.location.reload();
      }
    });
}
