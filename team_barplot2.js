// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 50},
    width = 660 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// List of Teams
var selectTeam = ["NOP","TOR","LAL","LAC","CHI",
"CHO","DET","IND","CLE","ORL","MIN","BRK","MEM",
"MIA","BOS","PHI","WAS","DAL","NYK","SAS","OKC",
"UTA","SAC","PHO","DEN","POR","ATL","MIL","HOU","GSW"]

var teamMenu = d3.select("#MyselectTeam2")

teamMenu.data(selectTeam)
        .append("select")
        .selectAll("option")
        .data(selectTeam)
       	.enter()
        .append("option")
        .attr("value", function(d){
            return d;
        })
        .text(function(d){
            return d;
        })



// List of groups (here I have one group per column)
var selectFolder = ["3_Pt_Shots", "2_Pt_Jump_Shots", "2_Pt_Hook_Shots", "2_Pt_Layups", "Dunks"]
var folderMenu = d3.select("#MyselectFolder2")

var selectedFolder = "Dunks"
var selectedTeam = "HOU"

folderMenu.data(selectFolder)
        .append("select")
        .selectAll("option")
        .data(selectFolder)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d;
        })
        .text(function(d){
            return d;
        })

teamMenu.on('change', function(){
    selectedTeam = d3.select(this)
       .select("select")
       .property("value")
       console.log('***********')
       console.log(selectedTeam)
       console.log('***********')

       drawGraph(selectedFolder, selectedTeam)
});

folderMenu.on('change', function(){
    selectedFolder = d3.select(this)
       .select("select")
       .property("value")
       console.log('***********')
       console.log(selectedFolder)
       console.log('***********')

       drawGraph(selectedFolder, selectedTeam)
});        

// var teamName = d3.select(teamMenu).on('change').property("value")
// var folderName = d3.select(folderMenu).on('change').property("value")


console.log('let\'s see')

// Parse the Data
var drawGraph = function(fileName = selectedFolder, teamName = selectedTeam) {
    
    d3.selectAll("#my_dataviz2 > *").remove();

    // Create the svg canvas in the "graph" div
    svg = d3.select("#my_dataviz2")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
            
    d3.csv(`data/${fileName}/${teamName}_${fileName}.csv`, function(data) {


    var team_range = d3.map(data, function(d) { return d.NumberOfShots; }).keys()

    // X axis
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d) { return d.Name; }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, (parseInt(team_range[0]) + 20.0) ])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));



    // Bars
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.Name); })
        .attr("y", function(d) { return y(d.NumberOfShots); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.NumberOfShots); })
        .attr("fill", "#69b3a2")

    })  
}

drawGraph() 