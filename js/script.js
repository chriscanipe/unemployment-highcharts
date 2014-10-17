

var theData = [];

$(document).ready(function() {
	setData();

});

//[Date.UTC(1971,  1, 24), 1.92],

function setData() {
	$.getJSON("data/unemployment_us.json", function(data) {

		$.each(data, function(i, item) {

			var newFormat = [Date.UTC(item.year,  item.monthNum-1, 1), item.val];

			theData.push(newFormat);

		});

		drawChart();

	});
}




function drawChart() {

	$('.chart').highcharts({
	    chart: {
	        zoomType: 'x'
	    },
	    title: {
	        text: 'U.S. Unemployment Since 1948'
	    },
	    subtitle: {
	        text: document.ontouchstart === undefined ?
	                'Click and drag in the plot area to zoom in' :
	                'Pinch the chart to zoom in'
	    },
	    xAxis: {
	        type: 'datetime',
	        minRange: 14 * 24 * 3600000 // fourteen days
	    },
	    yAxis: {
	        title: {
	            text: 'Percent unemployed'
	        },
	        min: 0
	    },
	    legend: {
	        enabled: false
	    },
	    tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
	    plotOptions: {
	        area: {
	            fillColor: "#99ccff",
	            marker: {
	                radius: 2
	            },
	            lineWidth: 2,
	            states: {
	                hover: {
	                    lineWidth: 2
	                }
	            },
	            threshold: null
	        }
	    },

	    series: [{
	        type: 'area',
	        name: 'Percent unemployed',
	        //pointInterval: 24 * 3600 * 1000,
	        //pointStart: Date.UTC(2006, 0, 1),
	        data: theData
	    }]
	});





}








