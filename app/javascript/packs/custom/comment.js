document.addEventListener("click", (e) => {
  let post_id = e.target.dataset.post_id;
  if (!!post_id) {
    let element = `.MainPage__feed-commentInput[data-post_id="${post_id}"]`;
    document.querySelector(`${element}`).addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (!!event.target.value) {
          fetchPOST(post_id, event.target.value);
          event.target.value = "";
        }
      }
    });
  }

  let fetchPOST = async (post_id, content) => {
    await fetch("/v1/comment", {
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
  };
});
(async () => {
  let allPOST = document.querySelectorAll(".MainPage__feed-commentInput");
  let list_post_id = [];
  allPOST.forEach((element) => {
    list_post_id.push(element.dataset.post_id);
  });
  console.log(list_post_id);
  // if (list_post_id.length > 0) {
  //   setInterval(async () => {
  //     let rq = await fetch(`/v1/comment/${btoa(list_post_id)}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }).then((x) => x.json());
  //     console.log(rq);
  //     let post_cmt;
  //     allPOST.forEach((post) => {
  //       post_cmt = document.querySelector(
  //         `.MainPage__feed-bodyComment[data-post_id_cmt="${post.dataset.post_id}"]`
  //       );
  //       post_cmt.innerHTML = "";
  //       rq.data.forEach((cmt) => {
  //         if (post.dataset.post_id == cmt.post_id) {
  //           let commenters = document.createElement("div");
  //           commenters.classList.add("MainPage__feed-bodyComment-commenters");
  //           post_cmt.appendChild(commenters);
  //           let avatar = document.createElement("div");
  //           let text = document.createElement("p");
  //           /* Avatar */
  //           avatar.classList.add(
  //             "MuiAvatar-root",
  //             "MuiAvatar-circle",
  //             "MainPage__feed-bodyComment-avatar"
  //           );
  //           /* Text */
  //           text.classList.add("MainPage__feed-bodyComment-text");
  //           commenters.appendChild(avatar);
  //           commenters.appendChild(text);
  //           // /* Avatar img */
  //           // let avatar_img = document.createElement("img");
  //           // avatar_img.alt = "avatar";
  //           // avatar_img.src =
  //           //   "https://res.cloudinary.com/marca/image/upload/v1610762261/rxezapdzrwbw4ritwqdy.jpg";
  //           // avatar_img.classList.add("MuiAvatar-img");
  //           // avatar.appendChild(avatar_img);
  //           /* Text content */
  //           let text_content = document.createElement("strong");
  //           text_content.classList.add("MainPage__feed-bodyComment-username");
  //           text_content.textContent = `${cmt.username}`;
  //           text.appendChild(text_content);
  //           text.append(`${cmt.text}`);
  //         }
  //       });
  //     });
  //   }, 1000);
  // }
})();
