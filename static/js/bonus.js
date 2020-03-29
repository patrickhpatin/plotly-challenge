function populateGaugeChart(index) {
    // ================================================
    //                Gauge Chart Code
    // ================================================
    // Adapt the Gauge Chart
    // from https://plot.ly/javascript/gauge-charts
    // to plot the weekly washing frequency of the individual
    // ================================================

    var trace = {
        gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "#8B4A8C", tickmode: "linear" },
            steps: [
                { range: [0, 1], color: "#dbde6d" },
                { range: [1, 2], color: "#e8c55e" },
                { range: [2, 3], color: "#f0ab5a" },
                { range: [3, 4], color: "#f0925e" },
                { range: [4, 5], color: "#ea7b67" },
                { range: [5, 6], color: "#dd6773" },
                { range: [6, 7], color: "#c8597e" },
                { range: [7, 8], color: "#ad4f87" },
                { range: [8, 9], color: "#8b4a8c" }
              ],
            bar: { color: "#45652A" },
            borderwidth: 2,
            bordercolor: "#8b4a8c"},
		value: wfreqs[index],
		title: { text: "Weekly Washing Frequency" },
		type: "indicator",
		mode: "gauge+number"
    };

    // data
    var data = [trace];

    // Define the Gauge Chart Layout
    var layout = {
        margin: { t: 0, b: 0 },
        paper_bgcolor: "#DBDE6D",
        fontcolor: "#8B4A8C"
    };

    // Render the plot to the div tag "gauge"
    Plotly.newPlot("gauge", data, layout);
};