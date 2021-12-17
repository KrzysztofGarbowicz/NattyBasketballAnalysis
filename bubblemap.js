/*
code adapted from 
https://www.d3-graph-gallery.com/graph/bubblemap_circleFeatures.html
*/
var bm_x = -97;
var bm_y = 38;
var bm_zoom = 700;

// The svg
var bm_svg = d3.select("#bubblemap"),
    bm_width = +bm_svg.attr("width"),
    bm_height = +bm_svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .center([bm_x, bm_y])                // GPS of location to zoom on
    .scale(bm_zoom)                       // This is like the zoom
    .translate([ bm_width/2, bm_height/2 ])


// Create data for circles:
var markers = [
  { name:'AT&T Center San Antonio Texas', size: 225.86, long: -98.4375228881836, lat: 29.426937103271484},
 // { name:'AccorHotels Arena Paris France', size: 219, long: , lat: },
 { name:'American Airlines Center Dallas Texas', size: 226.11, long: 96.8102721, lat: 32.7905076},
//{ name:'AmericanAirlines Arena Miami Florida', size: 223.5, long: -80.173529, lat: 25.775927},
 //{ name:'Amway Center Orlando Florida', size: 210.19, long:-81.3840071 , lat: 28.5392739},
 { name:'Bankers Life Fieldhouse Indianapolis Indiana', size: 215.71, long: -86.089601, lat: 39.769844},
{ name: 'Barclays Center Brooklyn New York', size: 220.68, long: -73.975279, lat: 40.6826108},
 { name:'Capital One Arena Washington District of Columbia', size: 230.71875, long: -77.0209382, lat: 38.8981835},
 { name:'Chase Center San Francisco California', size: 222.64705882352936, long: -122.3874072, lat: 37.7678927},
 { name:'Chesapeake Energy Arena Oklahoma City Oklahoma', size: 222.1515151515151, long: -97.5150815, lat:35.4633961 },
 { name:'FedEx Forum Memphis Tennessee', size: 226.12121212121207, long: -90.0516243, lat: 35.1377966},
 { name:'Fiserv Forum Milwaukee Wisconsin', size: 228.77419354838713, long: -87.9174871, lat: 43.0450096},
 { name:'Golden 1 Center Sacramento California', size: 220.74193548387095, long: -121.4995008, lat: 38.5801405},
 //{ name:'HP Field House Bay Lake Florida', size: 224.1967213114754, long: -81.5572362, lat: 28.3373104},
 { name:'Little Caesars Arena Detroit Michigan', size: 220.28125, long: -83.0551622, lat: 42.34093},
 { name:'Madison Square Garden (IV) New York New York', size: 215.87878787878793, long: -73.987056, lat: 40.742142},
 // { name:'Mexico City Arena Mexico City Mexico', 236.5: 473, long: , lat: },
{ name: 'Moda Center Portland Oregon', size: 231.40625, long: -122.6668337, lat:45.5315787 },
 { name:'Pepsi Center Denver Colorado', size: 216.60606060606054, long: -105.007544, lat: 39.7486838},
 { name:'Quicken Loans Arena Cleveland Ohio', size: 223.6111111111111, long:-81.757972 , lat: 41.412459},
 { name:'STAPLES Center Los Angeles California', size: 222.93650793650792, long: -118.2670526, lat: 34.0430046},
 { name:'Scotiabank Arena Toronto Canada', size: 223.125, long: -79.3790595, lat: 43.6434299},
 { name:'Smoothie King Center New Orleans Louisiana', size: 235.6875, long: -90.082069, lat:29.9490392 },
 { name:'Spectrum Center Charlotte North Carolina', size: 213.56666666666666, long: -80.8391541, lat: 35.225098},
{ name: 'State Farm Arena Atlanta Georgia', size: 231.9411764705882, long: -84.3963848, lat: 33.7573698},
 { name:'TD Garden Boston Massachusetts', size: 222.9375, long: -71.0621607, lat: 42.3662986},
 { name:'Talking Stick Resort Arena Phoenix Arizona', size: 226.8529411764706, long: -112.07404, lat: 33.44838},
 { name:'Target Center Minneapolis Minnesota', size: 226.03125, long: -93.276095, lat: 44.9795127},
 { name:'The Arena Bay Lake Florida', size: 224.74712643678168, long: -81.5539707, lat: 28.3387188},
 { name:'Toyota Center Houston Texas', size: 231.21875, long: -95.3622315, lat:29.7507472 },
 { name:'United Center Chicago Illinois', size: 213.73529411764707, long: -87.6741851, lat: 41.8806831},
 //{ name:'Visa Athletic Center Bay Lake Florida', size: 231.87500000000003, long:-87.314059 , lat: 30.919409},
 { name:'Vivint Smart Home Arena Salt Lake City Utah', size: 217.38709677419354, long: -111.9010551, lat: 40.7683273},
 { name:'Wells Fargo Center Philadelphia Pennsylvania', size: 215.38709677419354, long: -75.1720165, lat: 39.9011004},
];
  
// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){

    // Filter data
    data.features = data.features.filter( function(d){return d.properties.name=="USA"} )

    // Add a scale for bubble size
    var size = d3.scaleLinear()
      .domain([210,240])  // What's in the data
      .range([ 10, 40])  // Size in pixel

    // Draw the map
    bm_svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("fill", "#b8b8b8")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "black")
        .style("opacity", .3)
	
    // create a tooltip
    var Tooltip = d3.select("#bubblemap")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("background-color", "blue")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      
     // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      infotext = "Location: "+ d.name + "<br> Average points per game: "+ d.size.toFixed(2);
      document.getElementById('maptooltip').innerHTML=infotext;
    }
    var mousemove = function(d) {
      infotext = "Location: "+ d.name + "<br> Average points per game: "+ d.size.toFixed(2);
      document.getElementById('maptooltip').innerHTML=infotext;
      
    }
    var mouseleave = function(d) {
      document.getElementById('maptooltip').innerHTML="<br><br>";
    }

    // Add circles:
    bm_svg
      .selectAll("myCircles")
      .data(markers)
      .enter()
      .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", function(d){ return size(d.size) })
	.attr("class", "circle")
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
})