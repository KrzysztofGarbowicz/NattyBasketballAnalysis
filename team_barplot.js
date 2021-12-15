// set the dimensions and margins of the graph
var margin_team_viz = {top: 10, right: 30, bottom: 90, left: 40},
    width_team_viz = 460 - margin.left - margin.right,
    height_team_viz = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_team_dataviz = d3.select("#team_dataviz")
  .append("svg")
    .attr("width", width_team_viz + margin_team_viz.left + margin_team_viz.right)
    .attr("height", height_team_viz + margin_team_viz.top + margin_team_viz.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_team_viz.left + "," + margin_team_viz.top + ")");

// Parse the Data
d3.csv("data\2_pt_jump_shots\HOU_2pt_jumpshts.csv", function(data) {

var groups = d3.map(data, function(d) { return d.Name; }).keys()

console.log(typeof groups == 'object')

// X axis
var x = d3.scaleBand()
    .domain(groups)
    .range([ 0, width_team_viz ])
    .padding(0.2);
svg_team_dataviz.append("g")
  .attr("transform", "translate(0," + height_team_viz + ")")
  .call(d3.axisBottom(x))
//   .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 13000])
  .range([ height_team_viz, 0]);
svg_team_dataviz.append("g")
  .call(d3.axisLeft(y));

// Bars
svg_team_dataviz.selectAll("g")
.data(data)
.enter()
.append("rect")
  .attr("x", function(d) { return x(d.Name); })
  .attr("width", x.bandwidth())
  .attr("fill", "#69b3a2")
  // no bar at the beginning thus:
  .attr("height", function(d) { return height - y(0); }) // always equal to 0
  .attr("y", function(d) { return y(0); })
// svg_team_dataviz.append("g")
//   .selectAll("g")
//   .data(data)
//   .enter()
//   .append("g")
//     .attr("x", function(d) { return x(d.Country); })
//     .attr("width", x.bandwidth())
//     .attr("fill", "#69b3a2")
//     // no bar at the beginning thus:
//     .attr("height", function(d) { return height - y(0); }) // always equal to 0
//     .attr("y", function(d) { return y(0); })


  // Show the bars
//   svg_shot.append("g")
//     .selectAll("g")
//     // Enter in the stack data = loop key per key = group per group
//     .data(stackedData)
//     .enter().append("g")
//       .attr("fill", function(d) { return color(d.key); })
//       .selectAll("rect")
//       // enter a second time = loop subgroup per subgroup to add all rectangles
//       .data(function(d) { return d; })
//       .enter().append("rect")
//         .attr("x", function(d) { return x(d.data.type); })
//         .attr("y", function(d) { return y(d[1]); })
//         .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//         .attr("width",x.bandwidth())
//         .attr("stroke", "grey")
//       .on("mouseover", mouseover)
//       .on("mousemove", mousemove)
//       .on("mouseleave", mouseleave)


})