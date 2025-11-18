import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"

function D3Graph(){
    const svg = d3.select("svg")

    let w = svg.node().getBoundingClientRect().width
    let h = svg.node().getBoundingClientRect().height
    
}
export default D3Graph;