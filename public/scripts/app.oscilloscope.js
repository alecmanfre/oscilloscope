var pv = 'scripts/vendor/';
var pl = 'scripts/libs/';
require(["jquery", pv + "dropdown.js", pv + "prettify.js", pl + 'Noduino.js', pl + 'Noduino.Socket.js', pl + 'Logger.js'], function($, dd, p, NoduinoObj, Connector, Logger) {
  var Noduino = null;

  var setupEvents = function() {
    $frequency = $('#frequency');
    $frequency.$controlGroup = $frequency.parents('.control-group');
    $period = $('#period');
    this.frequency = $frequency.val();
    var self = this;

    this.updatePeriod = function(frequency) {
      self.period = 1 / self.frequency * 1000;
      $period.val(self.period);
      window.period = self.period;
    }

    $frequency.on('keyup change', function() {
      newFreq = parseFloat($frequency.val());
      if (newFreq) {
        $frequency.$controlGroup.removeClass('error');
        self.frequency = newFreq;
        self.updatePeriod();
      } else {
        $frequency.$controlGroup.addClass('error');
      }
    });

    this.updatePeriod();
  }

  var setupGraph = function() {
    var palette = new Rickshaw.Color.Palette({scheme: 'classic9'});
    window.graph = new Rickshaw.Graph({
      element: document.getElementById('chart'),
      width: 400,
      height: 200,
      renderer: 'area',
      stroke: true,
      series: new Rickshaw.Series([{data: [{x: Date.now(), y: 0}, {x: Date.now() + 16.0045, y: 123}], name: "moscow"}], palette)
    });
    window.graph.render();
  }

  var createObjects = function(board) {
    var self = this;
    board.withAnalogInput({pin:  'A0'}, function(err, AnalogInput) { 
      AnalogInput.on('change', function(a) {
        self.addData(a.value);
      });
    });
    
    this.lastx = window.period;
    this.cycles = [];
    window.cycles = this.cycles;
    this.nextCycle = [];
    this.addData = function(y) {
      var x = Date.now() % window.period;
      console.log(x);
      if (x >= self.lastx) {
        self.nextCycle.push({x: x, y: y});
      } else {
        self.cycles.push(self.nextCycle);
        console.log('cycle length: ' + self.nextCycle.length);
        if (self.cycles.length >= 10) {
          self.cycles.shift();
        }
        self.nextCycle = [{x: x, y: y}];
      }
      self.lastx = x;
    }

    this.updateGraph = function() {
      var graphData = [];
      for (var i = 0; i < self.cycles.length; i++) {
        graphData = graphData.concat(self.cycles[i]);
      }
      if (graphData.length > 1) {
        graphData.sort(function(a, b) {
          return a.x - b.x;
        });
        minY = Math.min.apply(null, graphData.map(function(sample) { return sample.y; }));
        window.graph.series[0].data = graphData.map(function(sample) { return {x: sample.x, y: sample.y - minY}; });
        window.graph.update();
      }
    }

    setInterval(this.updateGraph, 100);

  };

  $(document).ready(function(e) {
    setupEvents();
    setupGraph();

    $('#connect').click(function(e) {
      e.preventDefault();
      
      if (!Noduino || !Noduino.connected) {
        Noduino = new NoduinoObj({debug: false, host: 'http://localhost:8090'}, Connector, Logger);
        Noduino.connect(function(err, board) {
          $('#connection-status .alert').addClass('hide'); 
          if (err) {
            $('#connection-status .alert-error').removeClass('hide'); }
          else {
            $('#connection-status .alert-success').removeClass('hide');
            createObjects(board);
          }
        });
      }
    });
  });
});