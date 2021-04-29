let token = localStorage.getItem("token");
let divButton = document.querySelector(".home__header__button");
let info = JSON.parse(localStorage.getItem("info"));
(async () => {
  if (!!token) {
    // divButton.innerHTML = "";
    // let logoutButton = document.createElement("a");
    // logoutButton.style.cursor = "pointer";
    // logoutButton.id = "home__header__button--logout";
    // logoutButton.textContent = "Đăng xuất";
    // let name = document.createElement("a");
    // name.style.cursor = "pointer";
    // name.textContent = info.username;
    // document.querySelector(
    //   ".MainPage__header-avatarNUserame-username"
    // ).textContent = info.username;
    // divButton.appendChild(name);
    // divButton.appendChild(logoutButton);
    // let avatar = document.querySelector(".MuiAvatar-img");
    // avatar.src =
  }
})();

document
  .getElementById("home__header__button--logout")
  .addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("info");
    window.location.assign("http://localhost:3000/v1/logout");
  });

let btn = document.querySelector(".postBtn");
let mainPage_form = document.querySelector(".MainPage__header-form");
let mainPage_content = document.getElementById("MainPage__content");
let mainPage_image = document.getElementById("MainPage__imageUpload");
let mainPage_video = document.getElementById("MainPage__videoUpload");
let mainPage_audio = document.getElementById("MainPage__soundUpload");
let mainPage_submit = document.getElementById("MainPage__header-form__submit");

let type;

mainPage_content.addEventListener(
  "input",
  () => {
    btn.style.backgroundColor = "#FF9F67";
    btn.style.cursor = "pointer";
  }
  // { once: true }
);

let image;
mainPage_image.addEventListener("change", async () => {
  btn.style.backgroundColor = "#FF9F67";
  btn.style.cursor = "pointer";
  let reader = new FileReader();
  let preview = document.createElement("img");
  type = mainPage_image.files[0].type.replace("image/", "");
  await reader.readAsDataURL(mainPage_image.files[0]);
  reader.onload = async () => {
    image = await reader.result;
    preview.src = image;
    preview.style.width = "30%";
    // preview.style.height = "30%";
    if (!!mainPage_form.childNodes[6]) {
      mainPage_form.replaceChild(preview, mainPage_form.childNodes[6]);
    } else {
      mainPage_form.appendChild(preview);
    }
  };
  reader.onerror = () => {
    console.log(reader.error);
  };
});
let video;
mainPage_video.addEventListener("change", async () => {
  btn.style.backgroundColor = "#FF9F67";
  btn.style.cursor = "pointer";
  let reader = new FileReader();
  let preview = document.createElement("video");
  type = mainPage_video.files[0].type.replace("video/", "");
  await reader.readAsDataURL(mainPage_video.files[0]);
  reader.onload = async () => {
    video = await reader.result;
    preview.src = video;
    preview.controls = true;
    preview.volume = 1;
    preview.style.width = "30%";
    if (!!mainPage_form.childNodes[6]) {
      mainPage_form.replaceChild(preview, mainPage_form.childNodes[6]);
    } else {
      mainPage_form.appendChild(preview);
    }
  };
  reader.onerror = () => {
    console.log(reader.error);
  };
});
let audio;
mainPage_audio.addEventListener("change", async () => {
  btn.style.backgroundColor = "#FF9F67";
  btn.style.cursor = "pointer";
  let reader = new FileReader();
  let preview = document.createElement("audio");
  type = mainPage_audio.files[0].type.replace("audio/", "");
  await reader.readAsDataURL(mainPage_audio.files[0]);
  reader.onload = async () => {
    audio = await reader.result;
    preview.src = audio;
    preview.controls = true;
    preview.volume = 1;
    preview.style.width = "100%";
    if (!!mainPage_form.childNodes[6]) {
      mainPage_form.replaceChild(preview, mainPage_form.childNodes[6]);
    } else {
      mainPage_form.appendChild(preview);
    }
  };
  reader.onerror = () => {
    console.log(reader.error);
  };
});
setInterval(() => {
  if (!!!image && !!!video && !!!audio && !!!mainPage_content.value) {
    btn.style.backgroundColor = "gray";
    btn.style.cursor = "not-allowed";
  } else {
    console.log("lol");
    mainPage_submit.addEventListener("click", addPOSTs);
  }
}, 100);

/* CREATE */
const addPOSTs = async () => {
  const rq = await fetch("/v1/home", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: image,
      video: video,
      audio: audio,
      type: type,
      content: mainPage_content.value,
    }),
  }).then((x) => x.json());
  if (rq.status === "success") {
    window.location.reload();
  }
};

let once = false;

/* ------------------------------DELETE----------------------------------- */

let mouseOptions = document.body.addEventListener("mouseover", (e) => {
  e.preventDefault();
  let target = e.target;
  let post_id = target.dataset.toggle;
  let user_id = target.dataset.user;
  let save, update, del;
  let edit_title, edit_file, statusFile;
  let viewFile;
  if (
    !!target.dataset.toggle &&
    target.classList.contains("MainPage__feed-headerOption")
  ) {
    save = document.querySelector(
      `.MainPage__feed-headerOptionModal-item.save[data-post_id='${post_id}']`
    );
    /* Thêm event mở popup chỉnh sửa ở đây!!!! */
    update = document.querySelector(
      `.MainPage__feed-headerOptionModal-item.update[data-post_id='${post_id}']`
    );
    update.addEventListener("click", (e) => {
      e.preventDefault();
      let popup = document.querySelector(
        `.popup__edit[data-post_id='${post_id}']`
      );
      popup.style.display = "block";
    });
    let exPopup = document.querySelector(
      `.exitPopup[data-post_id='${post_id}']`
    );
    exPopup.addEventListener("click", (e) => {
      e.preventDefault();
      let popup = document.querySelector(
        `.popup__edit[data-post_id='${post_id}']`
      );
      popup.style.display = "none";
    });
    del = document.querySelector(
      `.MainPage__feed-headerOptionModal-item.delete[data-post_id='${post_id}']`
    );

    if (JSON.parse(localStorage.getItem("info")).id == user_id) {
      /* DELETE */
      del.addEventListener("click", () => {
        deletePOST(post_id);
      });
      let file;

      document
        .querySelector(
          `.popup__edit[data-post_id='${post_id}']>input[type='file']`
        )
        .addEventListener("change", (e) => {
          file = e.target.files[0];
          if (!!file) {
            let reader = new FileReader();
            let type = file.type.split("/")[1];
            viewFile = document.querySelector(
              `.popup__edit[data-post_id='${post_id}']>.viewFile`
            );
            viewFile.innerHTML = "";
            let preview;
            reader.readAsDataURL(file);
            reader.onload = () => {
              let data = reader.result;
              switch (type) {
                case "jpeg" || "jpg" || "png":
                  preview = document.createElement("img");
                  preview.src = data;
                  // preview.style.width = "200";
                  break;

                case "mp4" || "webm":
                  preview = document.createElement("video");
                  preview.src = data;
                  preview.controls = true;
                  preview.volume = 1;
                  // preview.style.width = "200";
                  break;

                case "mp3":
                  preview = document.createElement("audio");
                  preview.src = data;
                  preview.controls = true;
                  preview.volume = 1;
                  // preview.style.width = "200";
                  break;

                default:
                  break;
              }
              viewFile.appendChild(preview);
            };
            reader.onerror = () => {};
          }
        });

      /* UPDATE */
      document
        .querySelector(`.popup__edit[data-post_id='${post_id}']>button`)
        .addEventListener(
          "click",
          (event) => {
            edit_title = document.querySelector(
              `.popup__edit[data-post_id='${post_id}']>input[type='text']`
            );
            edit_file = document.querySelector(
              `.popup__edit[data-post_id='${post_id}']>input[type='file']`
            );
            viewFile = document.querySelector(
              `.popup__edit[data-post_id='${post_id}']>.viewFile`
            );
            event.preventDefault();
            if (!!edit_title.value) {
              statusFile = 1;
              let reader = new FileReader();
              if (!!edit_file.files[0]) {
                let type = edit_file.files[0].type.split("/")[1];
                reader.readAsDataURL(edit_file.files[0]);
                console.log(edit_title.value);
                reader.onload = async () => {
                  let file = await reader.result;
                  await updatePOST(
                    post_id,
                    edit_title.value,
                    file,
                    type,
                    statusFile
                  );
                };
                reader.onerror = () => {
                  console.log("Up failed");
                };
              } else {
                statusFile = 0;
                updatePOST(post_id, edit_title.value, "", "", statusFile);
              }
            }
          }
          // { once: true }
        );
    }
  }
  document.removeEventListener("mouseover", mouseOptions);
});
const deletePOST = async (id) => {
  const rq = await fetch(`/v1/home/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((x) => x.json());
  if (rq.status === "success") {
    window.location.reload();
  }
};
const updatePOST = async (id, title, file, typeFile, statusFile) => {
  /* statusFile */
  //- 0 : không up file (tức chỉ sửa title)
  //- 1 : có upfile (kiểm tra type bên server)
  console.log(title);
  const rq = await fetch(`/v1/home/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      title: title,
      file: file,
      typeFile: typeFile,
      statusFile: statusFile,
    }),
  }).then((x) => x.json());
  if (rq.status === "success") {
    window.location.reload();
  }
};
import "./like";
import "./comment";
