let token = localStorage.getItem("token");
let divButton = document.querySelector(".home__header__button");
let info = JSON.parse(localStorage.getItem("info"));
(async () => {
  if (!!token) {
    divButton.innerHTML = "";
    let logoutButton = document.createElement("a");
    logoutButton.style.cursor = "pointer";
    logoutButton.id = "home__header__button--logout";
    logoutButton.textContent = "Đăng xuất";

    let name = document.createElement("a");
    name.style.cursor = "pointer";
    name.textContent = info.username;
    document.querySelector(
      ".MainPage__header-avatarNUserame-username"
    ).textContent = info.username;
    divButton.appendChild(name);
    divButton.appendChild(logoutButton);
  }
})();

document
  .getElementById("home__header__button--logout")
  .addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("info");
    window.location.assign("http://localhost:3000/v1/login");
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

import "./comment";
