document.addEventListener("DOMContentLoaded", () => {
  const APP_ID = "68037";
  const REDIRECT_URL = window.location.origin + window.location.pathname;
  
  const token = new URLSearchParams(window.location.search).get("token");

  const loginBtn = document.getElementById("loginBtn");
  const loginSection = document.getElementById("login-section");
  const userInfo = document.getElementById("user-info");
  const balanceInfo = document.getElementById("balance-info");
  const symbolSelector = document.getElementById("symbolSelector");
  const chartContainer = document.getElementById("tv_chart_container");
  const placeTradeBtn = document.getElementById("placeTradeBtn");

  if (!chartContainer || !symbolSelector || !loginBtn || !userInfo || !placeTradeBtn || !balanceInfo) {
    console.error("Required DOM elements not found.");
    return;
  }

  let ws;
  let tickSubscriptionId = null;
  let currentSymbol = symbolSelector.value;

  // Function to start WebSocket connection
  function startWebSocket(symbol) {
    if (ws) ws.close();

    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
      console.log("✅ WebSocket connected");

      if (token && ws.readyState === WebSocket.OPEN) {
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

      // Handle login response
      if (data.msg_type === "authorize") {
        const loginid = data.authorize.loginid;
        userInfo.innerHTML = `✅ Logged in as <strong>${loginid}</strong>`;
        ws.send(JSON.stringify({ balance: 1, subscribe: 1 }));
      }

      // Handle balance update
      if (data.msg_type === "balance") {
        const balance = data.balance;
        balanceInfo.innerHTML = `💰 Balance: <span class="text-dark">${balance.currency} ${balance.balance.toFixed(2)}</span>`;
      }

      // Handle tick (price) updates
      if (data.msg_type === "tick") {
        const tick = data.tick;
        tickSubscriptionId = tick.id;

        lineSeries.update({
          time: Math.floor(tick.epoch),
          value: tick.quote,
        });

        document.getElementById("lastPrice").textContent = tick.quote.toFixed(2);
        document.getElementById("marketName").textContent = currentSymbol;
        document.getElementById("status").textContent = "Receiving Live Data...";
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

  // Handle login UI visibility
  if (token) {
    loginSection.classList.add("d-none");
    userInfo.textContent = "🔄 Fetching user data...";
  } else {
    userInfo.textContent = "⚠️ Not logged in.";
    loginSection.classList.remove("d-none");
  }

  // Login button redirects to Deriv OAuth
  loginBtn.addEventListener("click", () => {
    const loginUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
    window.location.href = loginUrl;
  });

  // Initialize TradingView Chart
  const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: 500,
    layout: { background: { color: "#ffffff" }, textColor: "#333" },
    grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    priceScale: { borderColor: "#ccc" },
    timeScale: { borderColor: "#ccc" },
  });

  const lineSeries = chart.addLineSeries();

  // Symbol selector change handler
  symbolSelector.addEventListener("change", () => {
    const newSymbol = symbolSelector.value;
    if (ws && tickSubscriptionId) {
      ws.send(JSON.stringify({ forget: tickSubscriptionId }));
    }
    currentSymbol = newSymbol;
    startWebSocket(currentSymbol);
  });

  // Start WebSocket connection and data fetching
  startWebSocket(currentSymbol);

  // Simulated trade button
  placeTradeBtn.addEventListener("click", () => {
    if (!token) {
      alert("🚫 Please login to place a trade.");
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

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(contractRequest));
    } else {
      alert("❌ WebSocket not connected. Please wait...");
    }
  });
});
