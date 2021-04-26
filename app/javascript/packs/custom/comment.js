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
  document.body.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("MainPage__feed-bodyComment-all__cmt")) {
      let post_id_cmt = target.dataset.post_id_cmt;
      setInterval(async () => {
        let rq = await fetch(`/v1/comment/${btoa(post_id_cmt)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((x) => x.json());
        let post_cmt;
        post_cmt = document.querySelector(
          `.MainPage__feed-bodyComment[data-post_id_cmt="${post_id_cmt}"]`
        );
        post_cmt.innerHTML = "";
        rq.data.forEach((cmt) => {
          if (post_id_cmt == cmt.post_id) {
            let commenters = document.createElement("div");
            commenters.classList.add("MainPage__feed-bodyComment-commenters");
            post_cmt.appendChild(commenters);
            let avatar = document.createElement("div");
            let text = document.createElement("p");
            /* Avatar */
            avatar.classList.add(
              "MuiAvatar-root",
              "MuiAvatar-circle",
              "MainPage__feed-bodyComment-avatar"
            );
            /* Text */
            text.classList.add("MainPage__feed-bodyComment-text");
            commenters.appendChild(avatar);
            commenters.appendChild(text);
            // /* Avatar img */
            // let avatar_img = document.createElement("img");
            // avatar_img.alt = "avatar";
            // avatar_img.src =
            //   "https://res.cloudinary.com/marca/image/upload/v1610762261/rxezapdzrwbw4ritwqdy.jpg";
            // avatar_img.classList.add("MuiAvatar-img");
            // avatar.appendChild(avatar_img);
            /* Text content */
            let text_content = document.createElement("strong");
            text_content.classList.add("MainPage__feed-bodyComment-username");
            text_content.textContent = `${cmt.username}`;
            text.appendChild(text_content);
            text.append(`${cmt.text}`);
            /* Options */
            if (cmt.user_id === rq.user_id) {
              let delDiv = document.createElement("div");
              delDiv.style.width = "20px";
              delDiv.style.height = "20px";
              delDiv.style.margin = "0 0 0 20px";
              delDiv.dataset.del_cmt = cmt.id;
              delDiv.classList.add("cmt_delete");
              let delIc = document.createElement("img");
              delIc.src =
                "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trash-can-2.png&r=0&g=0&b=0";
              delIc.style.width = "inherit";
              delIc.style.height = "inherit";
              delIc.dataset.del_cmt = cmt.id;
              delIc.classList.add("cmt_delete");
              delDiv.appendChild(delIc);
              commenters.appendChild(delDiv);
            }
          }
        });
      }, 1000);
    }
  });
})();

/* Delete */

document.body.addEventListener("click", async (e) => {
  let target = e.target;
  if (target.classList.contains("cmt_delete")) {
    let cmt_id = target.dataset.del_cmt;
    let rq = fetch(`/v1/comment/${cmt_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then((x) => x.json());
    if (rq.status === "success") {
      window.location.reload();
    }
  }
});
