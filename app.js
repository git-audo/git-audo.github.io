
const config = {
    gridW: 16,
    gridH: 16,
    circleR: 14,
    padding: 10,
    colors: [
        '#7ABB8E',
        '#9FC8A1',
        '#FCF7F1',
        '#78CBCF',
        '#5EBDC3',
    ]
}

function rand(max) {
   return Math.floor(Math.random() * max)
}

const spacing = (window.innerWidth - 2 * config.padding) / config.gridW

const rows = [...Array(config.gridH).keys()]
const grid = rows.map(r => [...Array(config.gridW).keys()].map(v => {
    return { 
        x: spacing / 2 + v * spacing, 
        y: spacing / 2 + r * spacing,
        r: rand(30) < 1 ? 20 : config.circleR
    }
}))

const visuals = d3.select('#visuals')

grid.forEach((row, i) => {
    row.forEach((p) => {
        visuals.append('circle')
            .attr('r', p.r)
            .attr('cx', config.padding + p.x)
            .attr('cy', config.padding + p.y)
            .attr('fill', config.colors[rand(i+2) % config.colors.length])
            .on("mouseover", function (d) {
                
             }).on("mouseout", function (d) {
                d3.select(this.parentNode).select("text").style("fill", "black");
             })
    })
})
