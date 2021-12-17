/*
Template 1: https://www.d3-graph-gallery.com/graph/circular_barplot_label.html
Template 2: https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html

data: data/intensity.csv
> created from matchAnalysis.ipynb
*/

// set the dimensions and margins of the graph
var margin_inten = {top: 100, right: 0, bottom: 00, left: 0},
    width_inten = 1000 - margin_inten.left - margin_inten.right,
    height_inten = 500 - margin_inten.top - margin_inten.bottom,
    innerRadius_inten = 100,
    outerRadius_inten = Math.min(width_inten, height_inten)-80;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg_inten = d3.select("#intensity_dataviz")
  .append("svg")
    .attr("width", width_inten + margin_inten.left + margin_inten.right)
    .attr("height", height_inten + margin_inten.top + margin_inten.bottom)
  .append("g")
    .attr("transform", "translate(" + (width_inten / 2 + margin_inten.left) + "," + (height_inten / 2 + margin_inten.top-30) + ")");

// Scales
function intenUpdate(selectedVar) {
    // data is computed and created by
    d3.csv("data/intensity.csv", function(data) {

      // Scales
      var x = d3.scaleBand()
          .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
          .align(0)                  // This does nothing
          .domain(data.map(function(d) { return d.team; })); // The domain of the X axis is the list of states.
      var y = d3.scaleRadial()
          .range([innerRadius_inten, outerRadius_inten])   // Domain will be define later.
          .domain([0, 92]); // Domain of Y is from 0 to the max seen in the data


      // To refreash the graph
      svg_inten.selectAll("path.inten").remove()
      svg_inten.selectAll("text.inten").remove()
      // Add the bars
      svg_inten.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
          .attr("class", "inten")
          .attr("fill", "#FF5677")
          .attr("d", d3.arc()     // imagine your doing a part of a donut plot
              .innerRadius(innerRadius_inten)
              .outerRadius(function(d) { return y(d[selectedVar])+1;})
              .startAngle(function(d) { return x(d.team); })
              .endAngle(function(d) { return x(d.team) + x.bandwidth(); })
              .padAngle(0.01)
              .padRadius(innerRadius_inten))


      // Add the labels
      svg_inten.append("g")
          .selectAll("g")
          .data(data)
          .enter()
          .append("g")
            .attr("text-anchor", function(d) { return (x(d.team) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.team) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d[selectedVar])+20) + ",0)"; })
          .append("text")
            .attr("class", "inten")
            .text(function(d){return(d.team)})
            .attr("transform", function(d) { return (x(d.team) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")

    })
}
// Initialize plot
intenUpdate('move')
