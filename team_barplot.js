// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 140, left: 80},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// List of Teams
var selectTeam = ['HOU', 'ATL', 'BOS', 'BRK', 'CHI',
 'CHO', 'CLE', 'DAL', 'DEN', 'DET',
  'GSW', 'IND', 'LAC', 'LAL',
   'MEM', 'MIA', 'MIL', 'MIN', 'NOP',
    'NYK', 'OKC', 'ORL', 'PHI', 'PHO',
     'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS']

var teamMenu = d3.select("#MyselectTeam")

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
var selectFolder = ["All_Shots", "3_Pt_Shots", "2_Pt_Jump_Shots", "2_Pt_Hook_Shots", "2_Pt_Layups", "Dunks",
 "Free_Throws", "Assists", "Blocks",
 "Steals", "All_Rebounds", "Offensive_Rebounds", "Defensive_Rebounds",
 "Bad_Plays", "Bad_Passes", "Lost_Balls" ]
var folderMenu = d3.select("#MyselectFolder")

var selectedFolder = "All_Shots"
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
    
    d3.selectAll("#my_dataviz > *").remove();

    // Create the svg canvas in the "graph" div
    svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
            
    d3.csv(`data/${fileName}/${teamName}_${fileName}.csv`, function(data) {

    var title = `${fileName} : ${teamName}`
    svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 )
        .attr('y', 30)
        .style("font-size", "25px")
        .attr('text-anchor', 'middle')
        .text(title)


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
        .style("text-anchor", "end")
        .style("font-size", "15px");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, (parseInt(team_range[0]) + 20.0) ])
      .range([height, 0])

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "translate(-65,-10)rotate(-90)")
      .text("Number of executions");
  



    // Bars
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.Name); })
        .attr("y", function(d) { return y(parseInt(d.NumberOfShots)); })
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        .style("stroke", "black")

        // .attr("height", function(d) { return height - y(d.NumberOfShots); })
        // .attr("fill", "#69b3a2")
    
    var teamInfo = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 1)
        .attr("class", "tooltip")


    svg.selectAll("rect")
        .on("mouseover", function (d) {
          d3.select(this).attr('opacity', 0.5);
          teamInfo.style("opacity", 1);
        })
        .on("mousemove", function (d) {
          teamInfo
            .html(d.Name + "<br>" + `Number of ${fileName}: ${parseInt(d.NumberOfShots)}`)
        })
        .on("mouseout", function (d) {
          d3.select(this).attr('opacity', 1);
          teamInfo
          .transition()
          .duration(200)
          .style("opacity", 0);
        })


    // Animation
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d.NumberOfShots); })
        .attr("height", function(d) { return height - y(d.NumberOfShots); })
    })  
    

   

    
}

drawGraph() 