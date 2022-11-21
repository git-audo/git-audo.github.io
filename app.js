const config = {
  gridW: 14,
  gridH: 22,
  circleR: 16,
  padding: 8,
  anomalies: 20,
  anomalyR: 25,
  colors: ["#eff9eb", "#f3c352", "#2c625d", "#bc3f00"],
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

let spacing = (window.innerWidth - 2 * config.padding) / config.gridW;

function generateGrid() {
  let visualsW = window.innerWidth;
  let visualsH = window.innerHeight;

  spacing = (visualsW - 2 * config.padding) / config.gridW;
  config.gridH = Math.floor((visualsH - 2 * config.padding) / spacing);

  const rows = [...Array(config.gridH).keys()];
  const grid = rows.map((r) =>
    [...Array(config.gridW).keys()].map((v) => {
      return {
        x: spacing / 2 + v * spacing,
        y: spacing / 2 + r * spacing,
        r: rand(100) < config.anomalies ? config.anomalyR : config.circleR,
        color: config.colors[rand(v + 2) % config.colors.length],
      };
    })
  );

  return grid;
}

function updateGrid({ grid, generateColors = false }) {
  grid.map((row, i) => {
    row.map((p, j) => {
      (p.x = spacing / 2 + i * spacing),
        (p.y = spacing / 2 + j * spacing),
        (p.r = rand(100) < config.anomalies ? config.anomalyR : config.circleR),
        (p.color = generateColors
          ? config.colors[rand(j + 2) % config.colors.length]
          : p.color);
    });
  });

  return grid;
}

function drawGrid({ grid }) {
  d3.selectAll("#visuals > *").remove();
  const visuals = d3.select("#visuals");

  grid.forEach((row, i) => {
    row.forEach((p) => {
      visuals
        .append("circle")
        .attr("r", p.r)
        .attr("cx", config.padding + p.x)
        .attr("cy", config.padding + p.y)
        .attr("fill", p.color);
    });
  });
}

function updateConfig() {
  const radius = d3.select("#circleRInput").property("value");
  if (radius) config.circleR = Number(radius);

  const anomalies = d3.select("#anomaliesInput").property("value");
  if (anomalies) config.anomalies = Number(anomalies);

  const anomalyR = d3.select("#anomalyRInput").property("value");
  if (anomalyR) config.anomalyR = Number(anomalyR);

  const gridW = d3.select("#gridWInput").property("value");
  if (gridW != config.gridW) {
    config.gridW = Number(gridW);
    grid = generateGrid();
    drawGrid({ grid });
    return;
  }

  grid = updateGrid({ grid });
  drawGrid({ grid });
}

function updateColors() {
  grid = updateGrid({ grid, generateColors: true });
  drawGrid({ grid });
}

function main() {
  const grid = generateGrid();
  drawGrid({ grid });
}

main();
