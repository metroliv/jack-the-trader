document.addEventListener("DOMContentLoaded", () => {
  const APP_ID = "68037";
  const REDIRECT_URL = window.location.href;
  const token = new URLSearchParams(window.location.search).get("token");

  const loginBtn = document.getElementById("loginBtn");
  const loginSection = document.getElementById("login-section");
  const userInfo = document.getElementById("user-info");
  const symbolSelector = document.getElementById("symbolSelector");

  if (token) {
    loginSection.classList.add("d-none");
    userInfo.textContent = "✅ Logged in via Deriv";
  }

  loginBtn.addEventListener("click", () => {
    const loginUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
    window.location.href = loginUrl;
  });

  // Chart setup
  const chartContainer = document.getElementById("tv_chart_container");
  const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: 500,
    layout: {
      background: { color: '#ffffff' },
      textColor: '#333',
    },
    grid: {
      vertLines: { color: '#eee' },
      horzLines: { color: '#eee' },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    priceScale: { borderColor: '#ccc' },
    timeScale: { borderColor: '#ccc' },
  });

  const lineSeries = chart.addLineSeries();

  let ws;
  let tickSubscriptionId;
  let currentSymbol = symbolSelector.value;

  function startWebSocket(symbol) {
    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
      if (token) ws.send(JSON.stringify({ authorize: token }));
      ws.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.msg_type === "tick") {
        const tick = data.tick;
        tickSubscriptionId = tick.id;

        lineSeries.update({
          time: Math.floor(tick.epoch),
          value: tick.quote,
        });
      }
    };

    ws.onerror = (e) => console.error("WebSocket error:", e);
    ws.onclose = () => console.warn("WebSocket closed");
  }

  symbolSelector.addEventListener("change", () => {
    currentSymbol = symbolSelector.value;
    if (ws && tickSubscriptionId) {
      ws.send(JSON.stringify({ forget: tickSubscriptionId }));
      ws.close();
    }
    startWebSocket(currentSymbol);
  });

  startWebSocket(currentSymbol);
});
