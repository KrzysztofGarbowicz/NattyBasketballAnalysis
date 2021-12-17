// set the dimensions and margins of the graph
var foul_margin = {top: 10, right: 30, bottom: 140, left: 80},
foul_width = 1200 - foul_margin.left - foul_margin.right,
foul_height = 600 - foul_margin.top - foul_margin.bottom;

// append the svg object to the body of the page
var foulSvg = d3.select("#my_foul_selection_viz")
  .append("svg")
    .attr("width", foul_width + foul_margin.left + foul_margin.right)
    .attr("height", foul_height + foul_margin.top + foul_margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + foul_margin.left + "," + foul_margin.top + ")");


// List of Teams
var foulTeams = ['LAL', 'ATL', 'BOS', 'BRK', 'CHI',
 'CHO', 'CLE', 'DAL', 'DEN', 'DET',
  'GSW', 'HOU', 'IND', 'LAC', 
   'MEM', 'MIA', 'MIL', 'MIN', 'NOP',
    'NYK', 'OKC', 'ORL', 'PHI', 'PHO',
     'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS']

var foulTeamMenu = d3.select("#MyTeamSelection")

foulTeamMenu.data(foulTeams)
        .append("select")
        .selectAll("option")
        .data(foulTeams)
       	.enter()
        .append("option")
        .attr("value", function(d){
            return d;
        })
        .text(function(d){
            return d;
        })


// List of groups (here I have one group per column)
var foulTypeSelection = ["all", "shooting", "offensive", "personal", "loose ball", "technical", "away from play", "personal take", "flagrant", "clear path"]
var foulTypeMenu = d3.select("#MyFoulSelection")

var selectedFoul = "all"
var selectedFoulTeam = "LAL"

foulTypeMenu.data(foulTypeSelection)
        .append("select")
        .selectAll("option")
        .data(foulTypeSelection)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d;
        })
        .text(function(d){
            return d;
        })

foulTeamMenu.on('change', function(){
    selectedFoulTeam = d3.select(this)
       .select("select")
       .property("value")
       console.log('2222222222222')
       console.log(selectedFoulTeam)
       console.log('2222222222222')

       drawFoulGraph(selectedFoul, selectedFoulTeam)
});

foulTypeMenu.on('change', function(){
    selectedFoul = d3.select(this)
       .select("select")
       .property("value")
       console.log('2222222222222')
       console.log(selectedFoul)
       console.log('2222222222222')

       drawFoulGraph(selectedFoul, selectedFoulTeam)
});        

// var teamName = d3.select(teamMenu).on('change').property("value")
// var folderName = d3.select(folderMenu).on('change').property("value")


console.log('let\'s see foul')

// Parse the Data
var drawFoulGraph = function(foulFileName = selectedFoul, foulTeamName = selectedFoulTeam) {
    
    d3.selectAll("#my_foul_selection_viz > *").remove();

    // Create the svg canvas in the "graph" div
    foulSvg = d3.select("#my_foul_selection_viz")
    .append("svg")
      .attr("width", foul_width + foul_margin.left + foul_margin.right)
      .attr("height", foul_height + foul_margin.top + foul_margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + foul_margin.left + "," + foul_margin.top + ")");
    
    var foulFilePath = ""
    if (foulFileName == 'all') {
      foulFilePath = `data/Fouls/${foulTeamName}_Fouls.csv`
    } else {
      foulFilePath = `data/Fouls/${foulTeamName}_${foulFileName}_Fouls.csv`
    }

    d3.csv(foulFilePath, function(foulData) {
    

    var foulTitle = `${foulFileName} : ${foulTeamName}`  
    foulSvg.append('text')
      .attr('class', 'title')
      .attr('x', foul_width / 2)
      .attr('y', 30)
      .style("font-size", "25px")
      .attr('text-anchor', 'middle')
      .text(foulTitle)


    var foulTeamRange = d3.map(foulData, function(d) { return d.NumberOfShots; }).keys()

    // X axis
    var foulX = d3.scaleBand()
      .range([ 0, foul_width ])
      .domain(foulData.map(function(d) { return d.Name; }))
      .padding(0.2);
    foulSvg.append("g")
      .attr("transform", "translate(0," + foul_height + ")")
      .call(d3.axisBottom(foulX))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "15px");

    // Add Y axis
    var foulY = d3.scaleLinear()
      .domain([0, (parseInt(foulTeamRange[0]) + 20.0) ])
      .range([foul_height, 0])

    foulSvg.append("g")
      .call(d3.axisLeft(foulY));

    foulSvg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "translate(-65,-10)rotate(-90)")
      .text("Fouls Commited");


    // Bars
    foulSvg.selectAll("foulbar")
      .data(foulData)
      .enter()
      .append("rect")
        .attr("x", function(d) { return foulX(d.Name); })
        .attr("y", function(d) { return foulY(parseInt(d.NumberOfShots)); })
        .attr("width", foulX.bandwidth())
        .attr("fill", "#eb3a34")
        .style("shape-rendering", "crispEdges")
        .style("stroke", "black")

      var foulInfo = d3.select("#my_foul_selection_viz")
        .append("div")
        .style("opacity", 1)
        .attr("class", "tooltip")

    foulSvg.selectAll("rect")
        .on("mouseover", function (d) {
          d3.select(this).attr('opacity', 0.5);
          foulInfo.style("opacity", 1);
        })
        .on("mousemove", function (d) {
          foulInfo
            .html(d.Name + "<br>" + `Number of ${foulFileName} fouls commited: ${parseInt(d.NumberOfShots)}`)
        })
        .on("mouseout", function (d) {
          d3.select(this).attr('opacity', 1);
          foulInfo
          .transition()
          .duration(200)
          .style("opacity", 0);
        })
   
        // Animation
    foulSvg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return foulY(d.NumberOfShots); })
        .attr("height", function(d) { return foul_height - foulY(parseInt(d.NumberOfShots)); })

    })  
    
}

drawFoulGraph() 