// set the dimensions and margins of the graph
var margin_player = {top: 10, right: 30, bottom: 30, left: 60},
    width_player = 460 - margin_player.left - margin_player.right,
    height_player = 400 - margin_player.top - margin_player.bottom;

// append the svg object to the body of the page
var svg_player = d3.select("#player_dataviz")
  .append("svg")
    .attr("width", width_player + margin_player.left + margin_player.right)
    .attr("height", height_player + margin_player.top + margin_player.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_player.left + "," + margin_player.top + ")");

// var tooltip_player = d3.select("#player_dataviz").append("div")
//                 .attr("class", "tooltip")
//                 .style("opacity", 0);

//Read the data
d3.csv("data/player_stats.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([72, 142])
    .range([ 0, width_player ]);
  svg_player.append("g")
    .attr("transform", "translate(0," + height_player + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([175, 227])
    .range([ height_player, 0]);
  svg_player.append("g")
    .call(d3.axisLeft(y));

  // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["C", "F", "G", "C-F", "F-C", "F-G", "G-F"])
    .range([ "#046865", "#92D0A3", "#FF934F", "#D8315B", "#D68FD6", "#5C80BC", "#622CEF"])

  // Add dots
  svg_player.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Wt); } )
      .attr("cy", function (d) { return y(d.Ht); } )
      .attr("r", 3)
      .attr('fill-opacity', 0.8)
      .style("fill", function (d) { return color(d.Pos) } )


  svg_player.append('text')
		.attr('x', 10)
		.attr('y', 10)
		.attr('class', 'label')
        .attr("font-size", "10")
        .attr("font-family", "sans-serif")
		.text('Height (cm)');

  svg_player.append('text')
		.attr('x', width_player-50)
		.attr('y', height_player-10)
		// .attr('text-anchor', 'end')
		.attr('class', 'label')
        .attr("font-size", "10")
        .attr("font-family", "sans-serif")
		.text('Weight (cm)');

    // const scale = d3.scaleOrdinal()
    // .domain(["Bike", "Run", "Walk"])
    // .range(["#8242a8", "#ff1493", "#FFCE1E"]);

    // svg_player.selectAll(".circle")
    // .data(data)
    // .enter().append("circle")
    // // .attr("class", "circle")
    // // .attr("d", function(d, i) { return symbol.type(symbols(d.Pos))(); })
    // .style("fill", function(d) { return color(d.Pos); })
    // .attr("transform", function(d) {
    //   return "translate(" + x(d.Wt) + "," + y(d.Ht) +")";
    // });

    // var clicked = ""

    var legend = svg_player.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // legend.append("g")
    //   .append("circle")
    //   // .style("fill", function(d) { return color(d); })
    //       .style("fill", function (d) { return color(d.Pos) } )
    //       	// .attr("d", function(d, i) { return symbol.type(symbols(d))(); })
    //   	    .attr("transform", function(d, i) {
    //       		return "translate(" + (width_player -10) + "," + 10 + ")";
    //     		})
    //     		.on("click",function(d){
    //  d3.selectAll("dot").style("opacity",1)
    //
    //  if (clicked !== d){
    //    d3.selectAll("dot")
    //      .filter(function(e){
    //      return e.Pos !== d;
    //    })
    //      .style("opacity",0.1)
    //    clicked = d
    //  }
    //   else{
    //     clicked = ""
    //   }
    // });

    legend.append("text")
        .attr("x", width_player+22)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("font-size", "10")
        .attr("font-family", "sans-serif")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    legend.append("g")
        .append("circle")
          .attr("cx", width_player+27)
          .attr("cy", 9)
          .attr("r", 3)
          // .attr('fill-opacity', 0.8)
          .style("fill", function (d) { return color(d) } )

})
