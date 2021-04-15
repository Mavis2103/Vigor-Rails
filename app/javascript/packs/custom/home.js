let token = localStorage.getItem("token");
let divButton = document.querySelector(".home__header__button");
let info = JSON.parse(localStorage.getItem("info"));
// const info = () => {
// };
if (!!token) {
  divButton.innerHTML = "";
  let logoutButton = document.createElement("a");
  logoutButton.textContent = "Đăng xuất";

  let name = document.createElement("a");
  name.textContent = info.username;

  divButton.appendChild(name);
  divButton.appendChild(logoutButton);
}
