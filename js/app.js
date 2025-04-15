document.addEventListener("DOMContentLoaded", () => {
  // Constants for your Deriv app
  const APP_ID = "68037"; // Your app ID
  const REDIRECT_URL = window.location.href; // Redirect URL after successful login
  const token = new URLSearchParams(window.location.search).get("token");

  // Elements in the DOM
  const loginBtn = document.getElementById("loginBtn");
  const loginSection = document.getElementById("login-section");
  const userInfo = document.getElementById("user-info");
  const symbolSelector = document.getElementById("symbolSelector");

  // Handle login flow
  if (token) {
    loginSection.classList.add("d-none");
    userInfo.textContent = "✅ Logged in via Deriv";
  }

  loginBtn.addEventListener("click", () => {
    // Redirect to the Deriv OAuth login page
    const loginUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
    window.location.href = loginUrl;
  });

  // Chart setup using LightweightCharts
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

  // WebSocket and tick data management
  let ws;
  let tickSubscriptionId;
  let currentSymbol = symbolSelector.value;

  function startWebSocket(symbol) {
    // Initialize WebSocket connection to Deriv's WebSocket API
    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
      // If a token exists (user is logged in), authorize via WebSocket
      if (token) ws.send(JSON.stringify({ authorize: token }));
      
      // Subscribe to the market ticks (real-time price updates)
      ws.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
    };

    // Handle incoming WebSocket messages (price ticks)
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.msg_type === "tick") {
        const tick = data.tick;
        tickSubscriptionId = tick.id;

        // Update the chart with the new tick data
        lineSeries.update({
          time: Math.floor(tick.epoch), // Epoch time converted to seconds
          value: tick.quote, // Price value of the tick
        });
      }
    };

    ws.onerror = (e) => console.error("WebSocket error:", e);
    ws.onclose = () => console.warn("WebSocket closed");
  }

  // Listen for changes in the symbol selector (market choice)
  symbolSelector.addEventListener("change", () => {
    currentSymbol = symbolSelector.value;
    if (ws && tickSubscriptionId) {
      // Unsubscribe from the previous symbol
      ws.send(JSON.stringify({ forget: tickSubscriptionId }));
      ws.close();
    }
    // Start WebSocket connection with the new symbol
    startWebSocket(currentSymbol);
  });

  // Start WebSocket connection with the selected symbol
  startWebSocket(currentSymbol);
});
