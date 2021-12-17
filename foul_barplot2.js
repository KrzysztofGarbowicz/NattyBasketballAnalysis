// set the dimensions and margins of the graph
var foul_margin2 = {top: 10, right: 30, bottom: 120, left: 80},
foul_width2 = 1200 - foul_margin2.left - foul_margin2.right,
foul_height2 = 600 - foul_margin2.top - foul_margin2.bottom;

// append the svg object to the body of the page
var foulSvg2 = d3.select("#my_foul_selection_viz2")
  .append("svg")
    .attr("width", foul_width2 + foul_margin2.left + foul_margin2.right)
    .attr("height", foul_height2 + foul_margin2.top + foul_margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + foul_margin2.left + "," + foul_margin2.top + ")");


// List of Teams
var foulTeams2 = ["LAL", "NOP","TOR","LAC","CHI",
"CHO","DET","IND","CLE","ORL","MIN","BRK","MEM",
"MIA","BOS","PHI","WAS","DAL","NYK","SAS","OKC",
"UTA","SAC","PHO","DEN","POR","ATL","MIL","HOU","GSW"]

var foulTeamMenu2 = d3.select("#MyTeamSelection2")

foulTeamMenu2.data(foulTeams2)
        .append("select")
        .selectAll("option")
        .data(foulTeams2)
       	.enter()
        .append("option")
        .attr("value", function(d){
            return d;
        })
        .text(function(d){
            return d;
        })



// List of groups (here I have one group per column)
var foulTypeSelection2 = ["shooting", "offensive", "personal", "loose ball", "technical", "away from play", "personal take", "flagrant", "clear path"]
var foulTypeMenu2 = d3.select("#MyFoulSelection2")

var selectedFoul2 = "shooting"
var selectedFoulTeam2 = "TOR"

foulTypeMenu2.data(foulTypeSelection2)
        .append("select")
        .selectAll("option")
        .data(foulTypeSelection2)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d;
        })
        .text(function(d){
            return d;
        })

foulTeamMenu2.on('change', function(){
    selectedFoulTeam2 = d3.select(this)
       .select("select")
       .property("value")
       console.log('2222222222222')
       console.log(selectedFoulTeam2)
       console.log('2222222222222')

       drawFoulGraph2(selectedFoul2, selectedFoulTeam2)
});

foulTypeMenu2.on('change', function(){
    selectedFoul2 = d3.select(this)
       .select("select")
       .property("value")
       console.log('2222222222222')
       console.log(selectedFoul2)
       console.log('2222222222222')

       drawFoulGraph2(selectedFoul2, selectedFoulTeam2)
});        

// var teamName = d3.select(teamMenu).on('change').property("value")
// var folderName = d3.select(folderMenu).on('change').property("value")


console.log('let\'s see foul 2')

// Parse the Data
var drawFoulGraph2 = function(foulFileName2 = selectedFoul2, foulTeamName2 = selectedFoulTeam2) {
    
    d3.selectAll("#my_foul_selection_viz2 > *").remove();

    // Create the svg canvas in the "graph" div
    foulSvg2 = d3.select("#my_foul_selection_viz2")
    .append("svg")
      .attr("width", foul_width2 + foul_margin2.left + foul_margin2.right)
      .attr("height", foul_height2 + foul_margin2.top + foul_margin2.bottom)
    .append("g")
      .attr("transform",
            "translate(" + foul_margin2.left + "," + foul_margin2.top + ")");
            
    d3.csv(`data/Fouled/${foulTeamName2}_${foulFileName2}_Fouled.csv`, function(foulData2) {
    

    var foulTitle2 = `${foulFileName2} : ${foulTeamName2}`  
    foulSvg2.append('text')
      .attr('class', 'title')
      .attr('x', foul_width2 / 2)
      .attr('y', 30)
      .style("font-size", "25px")
      .attr('text-anchor', 'middle')
      .text(foulTitle2)


    var foulTeamRange2 = d3.map(foulData2, function(d) { return d.NumberOfShots; }).keys()

    // X axis
    var foulX2 = d3.scaleBand()
      .range([ 0, foul_width2 ])
      .domain(foulData2.map(function(d) { return d.Name; }))
      .padding(0.2);
    foulSvg2.append("g")
      .attr("transform", "translate(0," + foul_height2 + ")")
      .call(d3.axisBottom(foulX2))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "15px");

    // Add Y axis
    var foulY2 = d3.scaleLinear()
      .domain([0, (parseInt(foulTeamRange2[0]) + 20.0) ])
      .range([ foul_height2, 0])

    foulSvg2.append("g")
      .call(d3.axisLeft(foulY2));

    foulSvg2.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "translate(-65,-10)rotate(-90)")
      .text("Fouls Experienced");


    // Bars
    foulSvg2.selectAll("foulbar")
      .data(foulData2)
      .enter()
      .append("rect")
        .attr("x", function(d) { return foulX2(d.Name); })
        .attr("y", function(d) { return foulY2(d.NumberOfShots); })
        .attr("width", foulX2.bandwidth())
        .attr("fill", "#eb3477")
        .style("shape-rendering", "crispEdges")
        .style("stroke", "black")

      var tooltip = d3.select("#player_dataviz")
        .append("div")
        .style("opacity", 1)
        .attr("class", "tooltip")

      

    foulSvg2.selectAll("rect")
        .on("mouseover", function (d) {
          d3.select(this).attr('opacity', 0.5);
          tooltip.style("opacity", 1);
        }).on("mouseout", function (d) {
          d3.select(this).attr('opacity', 1);
          tooltip
          .transition()
          .duration(200)
          .style("opacity", 0);
        })
   
        // Animation
    foulSvg2.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return foulY2(d.NumberOfShots); })
        .attr("height", function(d) { return foul_height2 - foulY2(d.NumberOfShots); })

    })  
    
}

drawFoulGraph2() 