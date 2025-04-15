document.addEventListener("DOMContentLoaded", () => {
  const APP_ID = "68037";
  const REDIRECT_URL = window.location.href;
  const token = new URLSearchParams(window.location.search).get("token");

  const loginBtn = document.getElementById("loginBtn");
  const loginSection = document.getElementById("login-section");
  const dashboard = document.getElementById("dashboard");
  const userInfo = document.getElementById("user-info");
  const price = document.getElementById("price");
  const symbolSelector = document.getElementById("symbolSelector");

  // Always show dashboard
  dashboard.classList.remove("d-none");

  loginBtn.addEventListener("click", () => {
    const loginUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
    window.location.href = loginUrl;
  });

  let currentSymbol = symbolSelector.value;
  let ws = null;
  let tickSubscriptionId = null;

  function connectWebSocket() {
    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
      if (token) {
        ws.send(JSON.stringify({ authorize: token }));
      }
      subscribeToTicks(currentSymbol);
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.msg_type === "authorize") {
        userInfo.textContent = `👋 Welcome ${data.authorize.loginid}`;
        loginSection.classList.add("d-none");
      }

      if (data.msg_type === "tick") {
        price.textContent = data.tick.quote;
      }

      if (data.msg_type === "forget") {
        console.log("Unsubscribed from previous symbol.");
      }
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.warn("WebSocket closed");
  }

  function subscribeToTicks(symbol) {
    if (tickSubscriptionId) {
      ws.send(JSON.stringify({ forget: tickSubscriptionId }));
    }
    const msg = {
      ticks: symbol,
      subscribe: 1
    };
    ws.send(JSON.stringify(msg));
  }

  symbolSelector.addEventListener("change", () => {
    currentSymbol = symbolSelector.value;
    subscribeToTicks(currentSymbol);
  });

  connectWebSocket();
});
