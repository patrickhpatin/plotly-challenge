var dropdownList = document.getElementById("selDataset");

// ============================================================================
//                           unPacking the JSON Data
// ---------------------------------------------------------------------------
// 1. unpackMetadata - Unpacks the metadata list of dictionaries
//      [id, ethnicity, gender, age, location, bbtype, wfreq]
// 2. unpackSamples - Unpacks the samples list of dictionaries
//      [id (value), otu_ids (list), sample_values (list), otu_labels] (list)
// ============================================================================
/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 */
// Sample row of data and each index to unpack it
// {"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}
const NAME = 0;
const ETHNICITY = 1;
const GENDER = 2;
const AGE = 3;
const LOCATION = 4;
const BBTYPE = 5;
const WFREQ = 6;

function unpackMetadata(rows, fetchValue) {
    return rows.map(function(row) {
        switch (fetchValue) {
            case NAME:
                return row["name"];
                break;
            case ETHNICITY:
                return row["ethnicity"];
                break;
            case GENDER:
                return row["gender"];
                break;
            case AGE:
                return row["age"];
                break;
            case LOCATION:
                return row["location"];
                break;
            case BBTYPE:
                return row["bbtype"];
                break;
            case WFREQ:
                return row["wfreq"];
                break;
        };
    });
};

const OTU_IDS = 0;
const SAMPLE_VALUES = 1;
const OTU_LABELS = 2;
function unpackSamples(rows, fetchValue) {
    return rows.map(function(row) {
        switch (fetchValue) {
            case OTU_IDS:
                return row["otu_ids"];
                break;
            case SAMPLE_VALUES:
                return row["sample_values"];
                break;
            case OTU_LABELS:
                return row["otu_labels"];
                break;
        };
    });
};

var sampleData = [];
var metaData = [];

var names = [];
var ethnicities = [];
var genders = [];
var ages = [];
var locations = [];
var bbtypes = [];
var wfreqs = [];
var otu_ids = [];
var sample_values = [];
var otu_labels = [];
var demoData = "";

function addOption( index ) {
    dropdownList.options[dropdownList.options.length] = new Option("BB_" + names[index], index.toString());
};

for (var i = 0; i < names.length; i++) {
    addOption(i);
};

d3.json("static/data/samples.json").then((incomingData) => {
    // Store the raw data for later use
    sampleData = incomingData;
    metaData = sampleData["metadata"];
    samples = sampleData["samples"];

    // Let's see the raw data
    console.log("ALL DATA:");
    console.log(sampleData);
    console.log("----------------------");

    console.log("Survey Data:");
    console.log(sampleData["metadata"]);
    console.log("----------------------");

    names = sampleData["names"]; // ID
    console.log("Names (IDs):");
    console.log(names);
    console.log("----------------------");

    ethnicities = unpackMetadata(metaData, ETHNICITY);
    console.log("Ethnicities:");
    console.log(ethnicities);
    console.log("----------------------");

    genders = unpackMetadata(metaData, GENDER);
    console.log("Genders:");
    console.log(genders);
    console.log("----------------------");

    ages = unpackMetadata(metaData, AGE);
    console.log("Ages:");
    console.log(ages);
    console.log("----------------------");

    locations = unpackMetadata(metaData, LOCATION);
    console.log("Locations:");
    console.log(locations);
    console.log("----------------------");

    bbtypes = unpackMetadata(metaData, BBTYPE);
    console.log("BBTypes:");
    console.log(bbtypes);
    console.log("----------------------");

    wfreqs = unpackMetadata(metaData, WFREQ);
    console.log("WFreqs:");
    console.log(wfreqs);
    console.log("----------------------");

    otu_ids = unpackSamples(samples, OTU_IDS);
    console.log("OTU_IDs:");
    console.log(otu_ids);
    console.log("----------------------");

    sample_values = unpackSamples(samples, SAMPLE_VALUES);
    console.log("Sample_Values:");
    console.log(sample_values);
    console.log("----------------------");

    otu_labels = unpackSamples(samples, OTU_LABELS);
    console.log("OTU_Labels:");
    console.log(otu_labels);
    console.log("----------------------");

    for (var i = 0; i < names.length; i++) {
        addOption(i);
    };
    
    dropdownList.onchange("0");
});

function populateHBar(index) {
    // ================================================
    //                 HBar Plot Code
    // ================================================
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        // Use `sample_values` as the values for the bar chart.
        // Use `otu_ids` as the labels for the bar chart.
        // Use `otu_labels` as the hovertext for the chart.
    // ================================================
    var str_otu_ids = [];
    for (var i in otu_ids[index]) {
        str_otu_ids.push(`OTU ${otu_ids[index][i]}`);
    };
    
    var trace = {
        x: sample_values[index].slice(0, 10).reverse(),
        y: str_otu_ids.slice(0, 10).reverse(),
        width: sample_values[index].slice(0, 10).length * .08,
        text: otu_labels[index].slice(0, 10).reverse(),
        name: "OTU Information For Selected Dataset",
        type: "bar",
        orientation: "h",
        marker: { color: "#8B4A8C" }
    };
  
  // data
  var data = [trace];
  
  // Define the HBar Layout
  var layout = {
    title: `OTU Information For Selected Dataset: ${names[index]}`,
    paper_bgcolor: "#DBDE6D"
  };
  
  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", data, layout);
};

function populateBubbleChart(index) {
    // ================================================
    //                Bubble Chart Code
    // ================================================
    // Create a bubble chart that displays each sample.
    //     Use `otu_ids` for the x values.    
    //     Use `sample_values` for the y values.    
    //     Use `sample_values` for the marker size.    
    //     Use `otu_ids` for the marker colors.    
    //     Use `otu_labels` for the text values.
    // ================================================

    var trace = {
        x: otu_ids[index],
        y: sample_values[index],
        text: otu_ids[index],
        mode: 'markers',
        marker: {
          color: "#8B4A8C",
          size: sample_values[index]
        }
      };
      
      var data = [trace];
      
      var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        paper_bgcolor: "#DBDE6D"
        // height: 600,
        // width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);
};

// function populateGaugeChart(index) {
//     // ================================================
//     //                Gauge Chart Code
//     // ================================================
//     // Adapt the Gauge Chart
//     // from https://plot.ly/javascript/gauge-charts
//     // to plot the weekly washing frequency of the individual
//     // ================================================

//     var trace = {
//         gauge: {
//             axis: { range: [null, 9], tickwidth: 1, tickcolor: "#8B4A8C", tickmode: "linear" },
//             bar: { color: "#8B4A8C" },
//             bgcolor: "white",
//             borderwidth: 2,
//             bordercolor: "gray"},
// 		value: wfreqs[index],
// 		title: { text: "Weekly Washing Frequency", color: "#8B4A8C" },
// 		type: "indicator",
// 		mode: "gauge+number"
//     };

//     // data
//     var data = [trace];

//     // Define the Gauge Chart Layout
//     var layout = {
//         margin: { t: 0, b: 0 },
//         paper_bgcolor: "#DBDE6D",
//         fontcolor: "#8B4A8C"
//     };

//     // Render the plot to the div tag "gauge"
//     Plotly.newPlot("gauge", data, layout);
// };

// Make sure my testing is being done on the right file    
console.log("Added selectedIndex to the console log.");


function generateDemoData(lstIndex) {
    var selectedInfo = `<table><tr><td><strong>id:</strong></td><td>${names[lstIndex]}</td></tr>` +
    `<tr><td><strong>ethnicity:</strong></td><td>${ethnicities[lstIndex]}</td></tr>` +
    `<tr><td><strong>gender:</strong></td><td>${genders[lstIndex]}</td></tr>` +
    `<tr><td><strong>age:</strong></td><td>${ages[lstIndex]}</td></tr>` +
    `<tr><td><strong>location:</strong></td><td>${locations[lstIndex]}</td></tr>` +
    `<tr><td><strong>bbtype:</strong></td><td>${bbtypes[lstIndex]}</td></tr>` +
    `<tr><td><strong>wfreq:</strong></td><td>${wfreqs[lstIndex]}</td></tr></table>`
    return selectedInfo;
};

// d3.select("#selDataset").on("change", () => {
function optionChanged(index) {
    // var ddlIndex = parseInt(dropdownList.options[dropdownList.selectedIndex].value);
    var ddlIndex = parseInt(index);

    // demoData = generateDemoData(ddlIndex);
    // d3.select("#sample-metadata").html(demoData);
    d3.select("#sample-metadata").html("");
    var mytable = d3.select("#sample-metadata").append("table");
    Object.entries(metaData[ddlIndex]).forEach(([key, value]) => {
        var myrow = mytable.append("tr");
        myrow.append("td").text(key + ": ").style("font-weight", "bold");
        myrow.append("td").text(value);
    });

    populateHBar(ddlIndex);
    populateBubbleChart(ddlIndex);
    populateGaugeChart(ddlIndex);
};