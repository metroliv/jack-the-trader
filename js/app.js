document.addEventListener("DOMContentLoaded", () => {
  const APP_ID = "68037";
  const REDIRECT_URL = window.location.origin + window.location.pathname; // Clean redirect
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token1"); // Fix here: was 'token'

  const loginBtn = document.getElementById("loginBtn");
  const loginSection = document.getElementById("login-section");
  const userInfo = document.getElementById("user-info");
  const symbolSelector = document.getElementById("symbolSelector");
  const chartContainer = document.getElementById("tv_chart_container");
  const placeTradeBtn = document.getElementById("placeTradeBtn");
  const balanceDisplay = document.getElementById("balanceDisplay");

  if (!chartContainer || !symbolSelector || !loginBtn || !userInfo || !placeTradeBtn || !balanceDisplay) {
    console.error("Required DOM elements not found.");
    return;
  }

  let ws;
  let tickSubscriptionId = null;
  let currentSymbol = symbolSelector.value;

  function startWebSocket(symbol) {
    if (ws) ws.close();

    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      if (token) {
        ws.send(JSON.stringify({ authorize: token }));
      }
      ws.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.error) {
        console.error("❌ Deriv API Error:", data.error.message);
        return;
      }

      if (data.msg_type === "authorize") {
        const loginid = data.authorize.loginid;
        const currency = data.authorize.currency;
        userInfo.innerHTML = `<i class="fas fa-user-circle text-primary"></i> ${loginid} (${currency})`;

        // Fetch balance
        ws.send(JSON.stringify({ balance: 1, subscribe: 1 }));
        // You can also send more requests here like: `statement`, `portfolio`, `account_settings`, etc.
      }

      if (data.msg_type === "balance") {
        const balance = data.balance.balance;
        const currency = data.balance.currency;
        balanceDisplay.innerHTML = `💰 Balance: ${balance} ${currency}`;
      }

      if (data.msg_type === "tick") {
        const tick = data.tick;
        tickSubscriptionId = tick.id;

        lineSeries.update({
          time: Math.floor(tick.epoch),
          value: tick.quote,
        });
      }
    };

    ws.onerror = (e) => {
      console.error("⚠️ WebSocket error:", e);
    };

    ws.onclose = () => {
      console.warn("🔄 WebSocket closed. Reconnecting...");
      setTimeout(() => startWebSocket(currentSymbol), 3000);
    };
  }

  symbolSelector.addEventListener("change", () => {
    const newSymbol = symbolSelector.value;
    if (ws && tickSubscriptionId) {
      ws.send(JSON.stringify({ forget: tickSubscriptionId }));
    }
    currentSymbol = newSymbol;
    startWebSocket(currentSymbol);
  });

  // Login Button
  loginBtn.addEventListener("click", () => {
    const loginUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
    window.location.href = loginUrl;
  });

  // Chart Setup
  const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: 500,
    layout: {
      background: { color: "#ffffff" },
      textColor: "#333",
    },
    grid: {
      vertLines: { color: "#eee" },
      horzLines: { color: "#eee" },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    priceScale: { borderColor: "#ccc" },
    timeScale: { borderColor: "#ccc" },
  });

  const lineSeries = chart.addLineSeries();

  // Trade Example
  function placeTradeExample() {
    if (!token) {
      alert("🚫 You must be logged in to place trades.");
      return;
    }

    const contractRequest = {
      buy: 1,
      price: 1,
      parameters: {
        amount: 1,
        basis: "stake",
        contract_type: "CALL",
        currency: "USD",
        duration: 1,
        duration_unit: "m",
        symbol: currentSymbol,
      },
    };

    ws.send(JSON.stringify(contractRequest));
  }

  placeTradeBtn.addEventListener("click", placeTradeExample);

  // On Load: If token exists, start WebSocket
  if (token) {
    loginSection.classList.add("d-none");
    startWebSocket(currentSymbol);
  }
});
