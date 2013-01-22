var pv = 'scripts/vendor/';
var pl = 'scripts/libs/';
require(["jquery", pv + "dropdown.js", pv + "prettify.js", pl + 'Noduino.js', pl + 'Noduino.Socket.js', pl + 'Logger.HTML.js'], function($, dd, p, NoduinoObj, Connector, Logger) {
  var Noduino = null;

  analogData = [];

  var analogReading = function(board) {
    board.withAnalogInput({pin:  'A0'}, function(err, AnalogInput) { 
      AnalogInput.on('change', function(a) { 
        var reading = a.value;
        $('#analog-reading').text(reading);
        analogData.push({x:Date.now(), y:reading});
        //console.log(analogData);
      });
    });
  };

$(document).ready(function(e) {
  //console.log(analogData);
  $('#analog-reading').click(function(e) {
    e.preventDefault();
      
      Noduino = new NoduinoObj({debug: true, host: 'http://localhost:8090', logger: {container: '#connection-log'}}, Connector, Logger);
      Noduino.connect(function(err, board) {
        analogReading(board);
      });
  });

var palette = new Rickshaw.Color.Palette( { scheme: 'classic9' } );

// instantiate our graph!
window.graph = new Rickshaw.Graph( {
    element: document.getElementById("chart"),
    width: 900,
    height: 500,
    renderer: 'area',
    stroke: true,
    series: new Rickshaw.Series([{data: [{x: Date.now(), y: 0}], name: "moscow"}], palette)
} );

window.graph.render();

setInterval( function() {
    console.log('adding data...');
    console.log(window.graph.series);
    //window.graph.series.addData(analogData);
    if (analogData.length >= 100) {
      window.graph.series[0].data = analogData.slice(-100);
      window.graph.update();
      console.log('update graph');
    }

}, 25 );

});
});

