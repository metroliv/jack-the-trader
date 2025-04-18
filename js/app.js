
document.addEventListener("DOMContentLoaded", () => {
  const APP_ID = "68037";
  const REDIRECT_URL = window.location.origin + window.location.pathname;
  const token = new URLSearchParams(window.location.search).get("token1");

  const loginBtn = document.getElementById("loginBtn");
  const loginSection = document.getElementById("login-section");
  const userInfo = document.getElementById("user-info");
  const balanceInfo = document.getElementById("balance-info");
  const symbolSelector = document.getElementById("symbolSelector");
  const chartContainer = document.getElementById("tv_chart_container");
  const placeTradeBtn = document.getElementById("placeTradeBtn");

  let ws, tickSubscriptionId = null;
  let currentSymbol = symbolSelector.value;
  let candlestickSeries, chart;

  function initChart() {
    chart = LightweightCharts.createChart(chartContainer, {
      width: chartContainer.clientWidth,
      height: 500,
      layout: { background: { color: "#ffffff" }, textColor: "#333" },
      grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
      crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
      priceScale: { borderColor: "#ccc" },
      timeScale: { borderColor: "#ccc" },
    });

    candlestickSeries = chart.addCandlestickSeries();
  }

  function sendMessage(message) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  function authorizeAndSubscribe(symbol) {
    if (token) sendMessage({ authorize: token });
    subscribeToTicks(symbol);
    subscribeToBalance();
    fetchCandles(symbol);
  }

  function subscribeToTicks(symbol) {
    sendMessage({ ticks: symbol, subscribe: 1 });
  }

  function unsubscribeTicks() {
    if (tickSubscriptionId) {
      sendMessage({ forget: tickSubscriptionId });
      tickSubscriptionId = null;
    }
  }

  function subscribeToBalance() {
    if (token) sendMessage({ balance: 1, subscribe: 1 });
  }

  function fetchCandles(symbol) {
    sendMessage({
      candles: symbol,
      count: 100,
      granularity: 60, // 1-minute candles
    });
  }

  function startWebSocket(symbol) {
    if (ws) ws.close();

    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
      authorizeAndSubscribe(symbol);
    };

    ws.onmessage = ({ data }) => {
      const msg = JSON.parse(data);
      if (msg.error) return console.error("❌", msg.error.message);

      switch (msg.msg_type) {
        case "authorize":
          userInfo.innerHTML = `✅ Logged in as <strong>${msg.authorize.loginid}</strong>`;
          break;

        case "balance":
          const { balance, currency } = msg.balance;
          balanceInfo.innerHTML = `💰 Balance: <span class="text-dark">${currency} ${balance.toFixed(2)}</span>`;
          break;

        case "tick":
          tickSubscriptionId = msg.tick.id;
          const { quote, epoch } = msg.tick;
          document.getElementById("lastPrice").textContent = quote.toFixed(2);
          document.getElementById("marketName").textContent = currentSymbol;
          document.getElementById("status").textContent = "⚡ Live Data";
          break;

        case "candles":
          const candleData = msg.candles.map(c => ({
            time: c.epoch,
            open: c.open,
            high: c.high,
            low: c.low,
            close: c.close,
          }));
          candlestickSeries.setData(candleData);
          break;
      }
    };

    ws.onerror = (e) => console.error("⚠️ WS Error", e);
    ws.onclose = () => setTimeout(() => startWebSocket(currentSymbol), 1500);
  }

  // Handle login redirect
  if (token) {
    loginSection.classList.add("d-none");
    userInfo.textContent = "🔄 Logging in...";
  }

  loginBtn.addEventListener("click", () => {
    const loginUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
    window.location.href = loginUrl;
  });

  // Symbol switching
  symbolSelector.addEventListener("change", () => {
    unsubscribeTicks();
    currentSymbol = symbolSelector.value;
    startWebSocket(currentSymbol);
  });

  // Trade button (mock)
  placeTradeBtn.addEventListener("click", () => {
    if (!token) return alert("🚫 Login first to trade.");

    sendMessage({
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
    });
  });

  // Chart init & WebSocket start
  initChart();
  startWebSocket(currentSymbol);
});
