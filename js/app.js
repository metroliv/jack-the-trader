document.addEventListener("DOMContentLoaded", () => {
  const APP_ID = "68037";
  const REDIRECT_URL = window.location.href;
  const token = new URLSearchParams(window.location.search).get("token");

  const loginBtn = document.getElementById("loginBtn");
  const loginSection = document.getElementById("login-section");
  const userInfo = document.getElementById("user-info");
  const symbolSelector = document.getElementById("symbolSelector");
  const marketSelector = document.getElementById("marketSelector");
  const candleIntervalSelector = document.getElementById("candleIntervalSelector");
  const chartTypeSelector = document.getElementById("chartTypeSelector");
  const digitOutput = document.getElementById("digitOutput");

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
    layout: { background: { color: "#fff" }, textColor: "#000" },
    grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    priceScale: { borderColor: "#ccc" },
    timeScale: { borderColor: "#ccc" },
  });

  let lineSeries = chart.addLineSeries();
  let candleSeries = null;
  let ws;
  let tickSubscriptionId;
  let candleSubscriptionId;

  function resetChart(type) {
    chart.removeSeries(lineSeries);
    if (candleSeries) chart.removeSeries(candleSeries);

    if (type === "line") {
      lineSeries = chart.addLineSeries();
    } else if (type === "candlestick") {
      candleSeries = chart.addCandlestickSeries();
    }
  }

  function startWebSocket(symbol, chartType, interval) {
    if (ws) ws.close();
    ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`);

    ws.onopen = () => {
      if (token) ws.send(JSON.stringify({ authorize: token }));

      if (chartType === "line" || chartType === "digits") {
        ws.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
      } else if (chartType === "candlestick") {
        ws.send(
          JSON.stringify({
            candles: symbol,
            count: 100,
            granularity: parseInt(interval),
            subscribe: 1,
          })
        );
      }
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.msg_type === "tick") {
        const tick = data.tick;
        tickSubscriptionId = tick.id;

        if (chartType === "line") {
          lineSeries.update({ time: tick.epoch, value: tick.quote });
        } else if (chartType === "digits") {
          const digit = tick.quote.toString().slice(-1);
          const evenOdd = parseInt(digit) % 2 === 0 ? "Even" : "Odd";
          digitOutput.textContent = `Last digit: ${digit} (${evenOdd})`;
        }
      }

      if (data.msg_type === "candles") {
        candleSubscriptionId = data.subscription.id;
        const candles = data.candles.map((c) => ({
          time: c.epoch,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
        }));
        candleSeries.setData(candles);
      }
    };

    ws.onerror = (e) => console.error("WebSocket error:", e);
    ws.onclose = () => console.warn("WebSocket closed");
  }

  function updateChart() {
    const symbol = symbolSelector.value;
    const chartType = chartTypeSelector.value;
    const interval = candleIntervalSelector.value;

    resetChart(chartType);
    startWebSocket(symbol, chartType, interval);
  }

  symbolSelector.addEventListener("change", updateChart);
  marketSelector.addEventListener("change", updateChart);
  chartTypeSelector.addEventListener("change", updateChart);
  candleIntervalSelector.addEventListener("change", updateChart);

  updateChart();
});
