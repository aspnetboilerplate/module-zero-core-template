$(function () {

    'use strict';

    /* ChartJS
     * -------
     * Here we will create a few charts using ChartJS
     */

    //-----------------------
    //- MONTHLY SALES CHART -
    //-----------------------

    // Get context with jQuery - using jQuery's .get() method.
    var salesChartCanvas = $('#salesChart').get(0).getContext('2d');
    // This will get the first returned node in the jQuery collection.

    var salesChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Electronics',
                fill: '#dee2e6',
                borderColor: '#ced4da',
                pointBackgroundColor: '#ced4da',
                pointBorderColor: '#c1c7d1',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(220,220,220)',
                spanGaps: true,
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Digital Goods',
                fill: 'rgba(0, 123, 255, 0.9)',
                borderColor: 'rgba(0, 123, 255, 1)',
                pointBackgroundColor: '#3b8bba',
                pointBorderColor: 'rgba(0, 123, 255, 1)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 123, 255, 1)',
                spanGaps: true,
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var salesChartOptions = {
        //Boolean - If we should show the scale at all
        showScale: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: false,
        //String - Colour of the grid lines
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - Whether the line is curved between points
        bezierCurve: true,
        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.3,
        //Boolean - Whether to show a dot for each point
        pointDot: false,
        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,
        //Boolean - Whether to fill the dataset with a color
        datasetFill: true,
        //String - A legend template
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%=datasets[i].label%></li><%}%></ul>',
        //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: false,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true
    };

    //Create the line chart
    var salesChart = new Chart(salesChartCanvas, {
        type: 'line',
        data: salesChartData,
        options: salesChartOptions
    });

    //---------------------------
    //- END MONTHLY SALES CHART -
    //---------------------------
});
