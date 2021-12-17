// set the dimensions and margins of the graph
var margin2 = {top: 10, right: 30, bottom: 120, left: 80},
    width2 = 1200 - margin2.left - margin2.right,
    height2 = 600 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");


// List of Teams
var selectTeam2 = ["LAL", "NOP","TOR","LAC","CHI",
"CHO","DET","IND","CLE","ORL","MIN","BRK","MEM",
"MIA","BOS","PHI","WAS","DAL","NYK","SAS","OKC",
"UTA","SAC","PHO","DEN","POR","ATL","MIL","HOU","GSW"]

var teamMenu2 = d3.select("#MyselectTeam2")

teamMenu2.data(selectTeam2)
        .append("select")
        .selectAll("option")
        .data(selectTeam2)
       	.enter()
        .append("option")
        .attr("value", function(d){
            return d;
        })
        .text(function(d){
            return d;
        })



// List of groups (here I have one group per column)
var selectFolder2 = ["3_Pt_Shots", "2_Pt_Jump_Shots", "2_Pt_Hook_Shots", "2_Pt_Layups", "Dunks"]
var folderMenu2 = d3.select("#MyselectFolder2")

var selectedFolder2 = "3_Pt_Shots"
var selectedTeam2 = "LAL"

folderMenu2.data(selectFolder2)
        .append("select")
        .selectAll("option")
        .data(selectFolder2)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d;
        })
        .text(function(d){
            return d;
        })

teamMenu2.on('change', function(){
    selectedTeam2 = d3.select(this)
       .select("select")
       .property("value")
       console.log('2222222222222')
       console.log(selectedTeam2)
       console.log('2222222222222')

       drawGraph2(selectedFolder2, selectedTeam2)
});

folderMenu2.on('change', function(){
    selectedFolder2 = d3.select(this)
       .select("select")
       .property("value")
       console.log('2222222222222')
       console.log(selectedFolder2)
       console.log('2222222222222')

       drawGraph2(selectedFolder2, selectedTeam2)
});        

// var teamName = d3.select(teamMenu).on('change').property("value")
// var folderName = d3.select(folderMenu).on('change').property("value")


console.log('let\'s see 2')

// Parse the Data
var drawGraph2 = function(fileName2 = selectedFolder2, teamName2 = selectedTeam2) {
    
    d3.selectAll("#my_dataviz2 > *").remove();

    // Create the svg canvas in the "graph" div
    svg2 = d3.select("#my_dataviz2")
    .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin2.left + "," + margin2.top + ")");
            
    d3.csv(`data/${fileName2}/${teamName2}_${fileName2}.csv`, function(data2) {
    

    var title2 = `${fileName2} : ${teamName2}`  
    svg2.append('text')
      .attr('class', 'title')
      .attr('x', width2 / 2)
      .attr('y', 30)
      .style("font-size", "25px")
      .attr('text-anchor', 'middle')
      .text(title2)


    var team_range2 = d3.map(data2, function(d) { return d.NumberOfShots; }).keys()

    // X axis
    var x2 = d3.scaleBand()
      .range([ 0, width2 ])
      .domain(data2.map(function(d) { return d.Name; }))
      .padding(0.2);
    svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "15px");

    // Add Y axis
    var y2 = d3.scaleLinear()
      .domain([0, (parseInt(team_range2[0]) + 20.0) ])
      .range([ height2, 0])

    svg2.append("g")
      .call(d3.axisLeft(y2));

    svg2.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "translate(-65,-10)rotate(-90)")
      .text("Successful attempts");


    // Bars
    svg2.selectAll("mybar2")
      .data(data2)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x2(d.Name); })
        .attr("y", function(d) { return y2(d.NumberOfShots); })
        .attr("width", x2.bandwidth())
        .attr("fill", "#69b3a2")
        .style("shape-rendering", "crispEdges")


    svg2.selectAll("rect")
        .on("mouseover", function (d) {
          d3.select(this).attr('opacity', 0.5);
        }).on("mouseout", function (d) {
          d3.select(this).attr('opacity', 1);
        })
   
        // Animation
    svg2.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y2(d.NumberOfShots); })
        .attr("height", function(d) { return height2 - y2(d.NumberOfShots); })

    })  
    
}

drawGraph2() 