let btnLogin = document.getElementById("Login");
let rs;

(async () => {
  let token = localStorage.getItem("token");
  if (!!token) {
    await fetch("/", {
      method: "HEAD",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // window.location.assign("http://localhost:3000/v1/home");
  }
})();

let fetchLogin = async () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let url = "/v1/login";
  let rq = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    // redirect: 'http://localhost:3000/',
  }).then((fjson) => fjson.json());
  rs = rq;
};
console.log(localStorage.getItem("token"));
btnLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetchLogin();
  localStorage.setItem("token", rs.jwt);
  localStorage.setItem("info", rs.info);
  window.location.assign("http://localhost:3000/v1/home");
});
