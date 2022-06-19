
const config = {
    gridW: 12,
    gridH: 15,
    circleR: 16,
    padding: 8,
    colors: [
        '#eff9eb',
        '#f3c352',
        '#2c625d',
        '#bc3f00',
    ]
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
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
        r: rand(20) < 1 ? 25 : config.circleR
    }
}))

const visuals = d3.select('#visuals')

function drawGrid() {
    d3.selectAll("#visuals > *").remove()
    
    grid.forEach((row, i) => {
        row.forEach((p) => {
            visuals.append('circle')
                .attr('r', p.r)
                .attr('cx', config.padding + p.x)
                .attr('cy', config.padding + p.y)
                .attr('fill', config.colors[rand(i+2) % config.colors.length])
        })
    })

}

drawGrid()
