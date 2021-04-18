let token = localStorage.getItem("token");
let divButton = document.querySelector(".home__header__button");
let info = JSON.parse(localStorage.getItem("info"));
if (!!token) {
  divButton.innerHTML = "";
  let logoutButton = document.createElement("a");
  logoutButton.textContent = "Đăng xuất";

  let name = document.createElement("a");
  name.textContent = info.username;

  divButton.appendChild(name);
  divButton.appendChild(logoutButton);
}

let mainPage_form = document.querySelector(".MainPage__header-form");
let mainPage_content = document.getElementById("MainPage__content");
let mainPage_image = document.getElementById("MainPage__imageUpload");
let mainPage_video = document.getElementById("MainPage__videoUpload");
let mainPage_audio = document.getElementById("MainPage__soundUpload");
let mainPage_submit = document.getElementById("MainPage__header-form__submit");

let image;
mainPage_image.addEventListener("change", () => {
  let reader = new FileReader();
  let preview = document.createElement("img");
  reader.readAsDataURL(mainPage_image.files[0]);
  reader.onload = () => {
    image = reader.result;
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
mainPage_video.addEventListener("change", () => {
  let reader = new FileReader();
  let preview = document.createElement("video");
  reader.readAsDataURL(mainPage_video.files[0]);
  reader.onload = () => {
    video = reader.result;
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
mainPage_audio.addEventListener("change", () => {
  let reader = new FileReader();
  let preview = document.createElement("audio");
  reader.readAsDataURL(mainPage_audio.files[0]);
  reader.onload = () => {
    audio = reader.result;
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
const addPOSTs = () => {
  /* Data form img,video,audio,mainPage__content.value */
};

mainPage_submit.addEventListener("click", addPOSTs);
