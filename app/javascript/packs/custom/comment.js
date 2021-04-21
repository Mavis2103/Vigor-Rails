document.addEventListener("click", (e) => {
  let post_id = e.target.dataset.post_id;
  if (!!post_id) {
    let element = `.MainPage__feed-commentInput[data-post_id="${post_id}"]`;
    document.querySelector(`${element}`).addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (!!event.target.value) {
          fetchPOST(post_id, event.target.value);
          console.log(event.target.value);
        }
      }
    });
  }

  let fetchPOST = async (post_id, content) => {
    let rq = await fetch("/v1/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")} `,
      },
      body: JSON.stringify({
        post_id: post_id,
        content_cmt: content,
      }),
    }).then((x) => x.json());
    console.log(rq);
  };
});
(() => {
  let allPOST = document.querySelectorAll(".MainPage__feed-commentInput");
  allPOST.forEach((element) => {
    console.log(element.dataset.post_id);
  });
})();
