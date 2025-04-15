const APP_ID = "68037";  
const REDIRECT_URL = window.location.href;
const token = new URLSearchParams(window.location.search).get("token");

const loginBtn = document.getElementById("loginBtn");
const loginSection = document.getElementById("login-section");
const dashboard = document.getElementById("dashboard");
const userInfo = document.getElementById("user-info");
const price = document.getElementById("price");

if (!token) {
  loginBtn.addEventListener("click", () => {
    const loginUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
    window.location.href = loginUrl;
  });
} else {
  loginSection.classList.add("d-none");
  dashboard.classList.remove("d-none");

  const ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=" + APP_ID);

  ws.onopen = () => {
    ws.send(JSON.stringify({ authorize: token }));
    ws.send(JSON.stringify({ ticks: "R_100", subscribe: 1 }));
  };

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);

    if (data.msg_type === "authorize") {
      userInfo.innerText = `👋 Welcome ${data.authorize.loginid}`;
    }

    if (data.msg_type === "tick") {
      price.innerText = data.tick.quote;
    }
  };
}
