/*
Template: https://www.d3-graph-gallery.com/graph/barplot_stacked_hover.html

data: data/shot.csv
> created from shotsAnalysis.ipynb
*/

// set the dimensions and margins of the graph
var margin_shot = {top: 10, right: 30, bottom: 20, left: 50},
    width_shot = 1000 - margin_shot.left - margin_shot.right,
    height_shot = 500 - margin_shot.top - margin_shot.bottom;

// append the svg object to the body of the page
var svg_shot = d3.select("#shot_dataviz")
    // .append("div")
  .append("svg")
    .attr("width", width_shot + margin_shot.left + margin_shot.right)
    .attr("height", height_shot + margin_shot.top + margin_shot.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_shot.left + "," + margin_shot.top + ")");
	  
svg_shot.append("circle").attr("cx",500).attr("cy",130).attr("r", 6).style("fill", "#C7EFCF")
svg_shot.append("circle").attr("cx",500).attr("cy",160).attr("r", 6).style("fill", "#FE5F55")
svg_shot.append("text").attr("x", 520).attr("y", 130).text("Make").style("font-size", "15px").attr("alignment-baseline","middle")
svg_shot.append("text").attr("x", 520).attr("y", 160).text("Miss").style("font-size", "15px").attr("alignment-baseline","middle")


// Parse the Data
d3.csv("data/shot.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1,-1)
  // document.write(subgroups)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.type)}).keys()

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width_shot])
      .padding([0.2])
  svg_shot.append("g")
    .attr("transform", "translate(0," + height_shot + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 80000])
    .range([ height_shot, 0 ]);
  svg_shot.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#C7EFCF','#FE5F55','#EEF5DB'])

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)




  // ----------------
  // Create a tooltip
  // ----------------
  var tooltip = d3.select("#shot_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    // .style("background-color", "white")
    // .style("border", "solid")
    // .style("border-width", "1px")
    // .style("border-radius", "5px")
    // .style("padding", "10px")
    // .style("position", "absolute")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    var subgroupValue = d.data[subgroupName];
    tooltip
        .html("Miss or make: " + subgroupName + "<br>" + "Shots: "+subgroupValue + " / Ratio: " + (subgroupValue/d.data["sum"]*100).toFixed(2) + "%")
        .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
    .style("position", "absolute")
      // .style("left", (d3.mouse(this)[0]) + width_shot -60 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      // .style("top", (d3.mouse(this)[1]) - height_shot + "px")
      // .style("z-index", 1)
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
  }




  // Show the bars
  svg_shot.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.type); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
        .attr("stroke", "grey")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

})
