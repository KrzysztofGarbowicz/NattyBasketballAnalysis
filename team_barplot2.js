// set the dimensions and margins of the graph
var margin2 = {top: 10, right: 30, bottom: 45, left: 50},
    width2 = 660 - margin2.left - margin2.right,
    height2 = 550 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");


// List of Teams
var selectTeam2 = ["NOP","TOR","LAL","LAC","CHI",
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

var selectedFolder2 = "2_Pt_Layups"
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
        .style("text-anchor", "end");

    // Add Y axis
    var y2 = d3.scaleLinear()
      .domain([0, (parseInt(team_range2[0]) + 20.0) ])
      .range([ height2, 0]);
    svg2.append("g")
      .call(d3.axisLeft(y2));



    // Bars
    svg2.selectAll("mybar2")
      .data(data2)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x2(d.Name); })
        .attr("y", function(d) { return y2(d.NumberOfShots); })
        .attr("width", x2.bandwidth())
        .attr("height", function(d) { return height - y2(d.NumberOfShots); })
        .attr("fill", "#69b3a2")

    })  
}

drawGraph2() 