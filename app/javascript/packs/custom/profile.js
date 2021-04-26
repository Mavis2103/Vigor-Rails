let token = localStorage.getItem("token");
let divName = document.querySelector(".Profile__header-avatarNInfo-info");
let divButton = document.querySelector(".home__header__button");
let info = JSON.parse(localStorage.getItem("info"));
(async () => {
  if (!!token) {
    let name = document.querySelector(".Profile__header-avatarNInfo-info-username");
    name.textContent = info.username;

    divButton.innerHTML = "";
    let logoutButton = document.createElement("a");
    logoutButton.style.cursor = "pointer";
    logoutButton.id = "home__header__button--logout";
    logoutButton.textContent = "Đăng xuất";

    let nameNav = document.createElement("a");
    nameNav.style.cursor = "pointer";
    nameNav.textContent = info.username;
    
    divButton.appendChild(nameNav);
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
