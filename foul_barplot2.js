/*
Template 1: https://www.d3-graph-gallery.com/graph/barplot_basic.html
Template 2: https://www.d3-graph-gallery.com/graph/barplot_animation_start.html
Template 3: https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html

data: data/Fouls
      data/Fouled
> created from DataVis.ipynb
*/

// set the dimensions and margins of the graph
var foul_margin2 = {top: 10, right: 30, bottom: 140, left: 80},
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
var foulTeams2 = ['TOR', 'ATL', 'BOS', 'BRK', 'CHI',
 'CHO', 'CLE', 'DAL', 'DEN', 'DET',
  'GSW', 'HOU', 'IND', 'LAC', 'LAL',
   'MEM', 'MIA', 'MIL', 'MIN', 'NOP',
    'NYK', 'OKC', 'ORL', 'PHI', 'PHO',
     'POR', 'SAC', 'SAS', 'UTA', 'WAS']

var foulTeamMenu2 = d3.select("#MyTeamSelection2")

foulTeamMenu2.data(foulTeams2)
        .append("select")
        .selectAll("option")
        .data(foulTeams2)
       	.enter()
        .append("option")
        .attr("value", function(fd2){
            return fd2;
        })
        .text(function(fd2){
            return fd2;
        })



// List of groups (here I have one group per column)
var foulTypeSelection2 = ["all", "shooting", "offensive", "personal", "loose ball", "away from play", "personal take", "flagrant"]
var foulTypeMenu2 = d3.select("#MyFoulSelection2")

var selectedFoul2 = "all"
var selectedFoulTeam2 = "TOR"

foulTypeMenu2.data(foulTypeSelection2)
        .append("select")
        .selectAll("option")
        .data(foulTypeSelection2)
        .enter()
        .append("option")
        .attr("value", function(fd2){
            return fd2;
        })
        .text(function(fd2){
            return fd2;
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


    var foulFilePath2 = ""
    if (foulFileName2 == 'all') {
      foulFilePath2 = `data/Fouled/${foulTeamName2}_Fouled.csv`
    } else {
      foulFilePath2 = `data/Fouled/${foulTeamName2}_${foulFileName2}_Fouled.csv`
    }
            
    d3.csv(foulFilePath2, function(foulData2) {
    

    var foulTitle2 = `${foulFileName2} : ${foulTeamName2}`  
    foulSvg2.append('text')
      .attr('class', 'title')
      .attr('x', foul_width2 / 2)
      .attr('y', 30)
      .style("font-size", "25px")
      .attr('text-anchor', 'middle')
      .text(foulTitle2)


    var foulTeamRange2 = d3.map(foulData2, function(fd2) { return fd2.NumberOfShots; }).keys()

    // X axis
    var foulX2 = d3.scaleBand()
      .range([ 0, foul_width2 ])
      .domain(foulData2.map(function(fd2) { return fd2.Name; }))
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
    foulSvg2.selectAll("foulbar2")
      .data(foulData2)
      .enter()
      .append("rect")
        .attr("x", function(fd2) { return foulX2(fd2.Name); })
        .attr("y", function(fd2) { return foulY2(parseInt(fd2.NumberOfShots)); })
        .attr("width", foulX2.bandwidth())
        .attr("fill", "#eb3477")
        .style("stroke", "black")

      var foulInfo2 = d3.select("#my_foul_selection_viz2")
        .append("div")
        .style("opacity", 1)
        .attr("class", "tooltip")

      

    foulSvg2.selectAll("rect")
        .on("mouseover", function (d) {
          d3.select(this).attr('opacity', 0.5);
          foulInfo2.style("opacity", 1);
        })
        .on("mousemove", function (fd2) {
          foulInfo2
            .html(fd2.Name + "<br>" + `Number of ${foulFileName2} fouls experienced: ${parseInt(fd2.NumberOfShots)}`)
        })
        .on("mouseout", function (d) {
          d3.select(this).attr('opacity', 1);
          foulInfo2
          .transition()
          .duration(200)
          .style("opacity", 0);
        })
   
        // Animation
    foulSvg2.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(fd2) { return foulY2(fd2.NumberOfShots); })
        .attr("height", function(fd2) { return foul_height2 - foulY2(fd2.NumberOfShots); })

    })  
    
}

drawFoulGraph2() 