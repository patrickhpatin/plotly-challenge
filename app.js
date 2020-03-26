
// {"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}
const NAME = 0;
const ETHNICITY = 1;
const GENDER = 2;
const AGE = 3;
const LOCATION = 4;
const BBTYPE = 5;
const WFREQ = 6;

var dropdownList = document.getElementById("selDataset");

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 */
function unpack(rows, index) {
    return rows.map(function(row) {
        switch (index) {
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
}

var sampleData = [];
var metaData = [];

var names = ["940", "941", "943", "944", "945"];
var ethnicities = [];
var genders = [];
var ages = [];
var locations = [];
var bbtypes = [];
var wfreqs = [];

function addOption( index ) {
    dropdownList.options[dropdownList.options.length] = new Option(names[index], index.toString());
};

d3.json("static/data/samples.json").then((incomingData) => {
    // Store the raw data for later use
    sampleData = incomingData;
    metaData = sampleData["metadata"];

    // Let's see the raw data
    // console.log("ALL DATA:");
    // console.log(sampleData);
    // console.log("----------------------");

    // console.log("Survey Data:");
    // console.log(sampleData["metadata"]);
    // console.log("----------------------");

    names = sampleData["names"]; // ID
    // console.log("Names (IDs):");
    // console.log(names);
    // console.log("----------------------");

    ethnicities = unpack(metaData, ETHNICITY);
    // console.log("Ethnicities:");
    // console.log(ethnicities);
    // console.log("----------------------");

    genders = unpack(metaData, GENDER);
    // console.log("Genders:");
    // console.log(genders);
    // console.log("----------------------");

    ages = unpack(metaData, AGE);
    // console.log("Ages:");
    // console.log(ages);
    // console.log("----------------------");

    locations = unpack(metaData, LOCATION);
    // console.log("Locations:");
    // console.log(locations);
    // console.log("----------------------");

    bbtypes = unpack(metaData, BBTYPE);
    // console.log("BBTypes:");
    // console.log(bbtypes);
    // console.log("----------------------");

    wfreqs = unpack(metaData, WFREQ);
    // console.log("WFreqs:");
    // console.log(wfreqs);
    // console.log("----------------------");
    
    // Clear out the drop down list
    // dropdownList.options.length = 0;

    for (var i = 0; i < names.length; i++) {
        addOption(i);
    };
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
//     var trace = {
//     x: reversedData.map(object => object.greekSearchResults),
//     y: reversedData.map(object => object.greekName),
//     text: reversedData.map(object => object.greekName),
//     name: "Greek",
//     type: "bar",
//     orientation: "h"
//   };
  
//   // data
//   var data = [trace];
  
//   // Apply the group bar mode to the layout
//   var layout = {
//     title: "Greek gods search results",
//     margin: {
//       l: 100,
//       r: 100,
//       t: 100,
//       b: 100
//     }
//   };
  
//   // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("plot", data, layout);
};

// Make sure my testing is being done on the right file    
console.log("Added function optionChanged(index).");


function generateDemoData(index) {
    var selectedInfo = `<table><tr><td><strong>id:</strong></td><td>${names[index]}</td></tr>` +
    `<tr><td><strong>ethnicity:</strong></td><td>${ethnicities[index]}</td></tr>` +
    `<tr><td><strong>gender:</strong></td><td>${genders[index]}</td></tr>` +
    `<tr><td><strong>age:</strong></td><td>${ages[index]}</td></tr>` +
    `<tr><td><strong>location:</strong></td><td>${locations[index]}</td></tr>` +
    `<tr><td><strong>bbtype:</strong></td><td>${bbtypes[index]}</td></tr>` +
    `<tr><td><strong>wfreq:</strong></td><td>${wfreqs[index]}</td></tr></table>`
    return selectedInfo;
};

// d3.select("#selDataset").on("change", () => {
function optionChanged(index) {
    // var ddlIndex = parseInt(dropdownList.options[dropdownList.selectedIndex].value);
    var ddlIndex = parseInt(index);
    console.log(names[ddlIndex]);

    // var demoData = generateDemoData(ddlIndex);
    // d3.select("#sample-metadata").html(demoData);

    // populateHBar(ddlIndex);
});