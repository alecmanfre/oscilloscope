$(document).ready(function(){
var seriesData = [ [], [], [], [], [], [], [], [], [] ];
var random = new Rickshaw.Fixtures.RandomData(150);

for (var i = 0; i < 150; i++) {
    random.addData(seriesData);
}

var palette = new Rickshaw.Color.Palette( { scheme: 'classic9' } );

// instantiate our graph!

var graph = new Rickshaw.Graph( {
    element: document.getElementById("chart"),
    width: 900,
    height: 500,
    renderer: 'area',
    stroke: true,
    series: [
        {
            color: palette.color(),
            data: seriesData[0],
            name: 'Moscow'
        }, {
            color: palette.color(),
            data: seriesData[1],
            name: 'Shanghai'
        }, {
            color: palette.color(),
            data: seriesData[2],
            name: 'Amsterdam'
        }, {
            color: palette.color(),
            data: seriesData[3],
            name: 'Paris'
        }, {
            color: palette.color(),
            data: seriesData[4],
            name: 'Tokyo'
        }, {
            color: palette.color(),
            data: seriesData[5],
            name: 'London'
        }, {
            color: palette.color(),
            data: seriesData[6],
            name: 'New York'
        }
    ]
} );

graph.render();

setInterval( function() {
    random.addData(seriesData);
    graph.update();

}, 3000 );

function addAnnotation(force) {
    if (messages.length > 0 && (force || Math.random() >= 0.95)) {
        annotator.add(seriesData[2][seriesData[2].length-1].x, messages.shift());
    }
}

})

