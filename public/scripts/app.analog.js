// var pv = 'scripts/vendor/';
// var pl = 'scripts/libs/';
// require(["jquery", pv + "dropdown.js", pv + "prettify.js", pl + 'Noduino.js', pl + 'Noduino.Socket.js', pl + 'Logger.HTML.js'], function($, dd, p, NoduinoObj, Connector, Logger) {
//   var Noduino = null;

//   analogData = [];

//   var analogReading = function(board) {
//     board.withAnalogInput({pin:  'A0'}, function(err, AnalogInput) { 
//       AnalogInput.on('change', function(a) { 
//         var reading = a.value;
//         $('#analog-reading').text(reading);
//         //analogData.push(reading);
//         //console.log(analogData);
//       });
//     });

//   };

//   $(document).ready(function(e) {
//     $('#analog-reading').click(function(e) {
//       e.preventDefault();
        
//         Noduino = new NoduinoObj({debug: true, host: 'http://localhost:8090', logger: {container: '#connection-log'}}, Connector, Logger);
//         Noduino.connect(function(err, board) {
//           analogReading(board);
//         });
//           });
//   });
// });