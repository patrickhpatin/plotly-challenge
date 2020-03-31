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
            case OTU_LABELS:
                return row["otu_labels"];
                break;
            case SAMPLE_VALUES:
                return row["sample_values"];
                break;
        };
    });
};

var demoData = "";

var ages = [];
var names = [];
var wfreqs = [];
var genders = [];
var bbtypes = [];
var otu_ids = [];
var metaData = [];
var locations = [];
var sampleData = [];
var otu_labels = [];
var ethnicities = [];
var sample_values = [];


function addOption( index ) {
    dropdownList.options[dropdownList.options.length] = new Option("BB_" + names[index], index.toString());
};


for (var i = 0; i < names.length; i++) {
    addOption(i);
};


d3.json("static/data/samples.json").then((incomingData) => {
    // Store the raw data for later use
    sampleData = incomingData;
    samples = sampleData["samples"];
    metaData = sampleData["metadata"];

    names = sampleData["names"]; // ID

    ages = unpackMetadata(metaData, AGE);
    wfreqs = unpackMetadata(metaData, WFREQ);
    otu_ids = unpackSamples(samples, OTU_IDS);
    genders = unpackMetadata(metaData, GENDER);
    bbtypes = unpackMetadata(metaData, BBTYPE);
    locations = unpackMetadata(metaData, LOCATION);
    otu_labels = unpackSamples(samples, OTU_LABELS);
    ethnicities = unpackMetadata(metaData, ETHNICITY);
    sample_values = unpackSamples(samples, SAMPLE_VALUES);

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
        marker: { color: "#3E78B3" }
    };
  
  // data
  var data = [trace];
  
  // Define the HBar Layout
  var layout = {
    title: `OTU Information For: BB_${names[index]}`,
    paper_bgcolor: "#DBDE6D",
    xaxis: { title: { text: "QUANTITY OF BACTERIUM" } },
    yaxis: { title: { text: "OTU ID" } }
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
        text: otu_labels[index],
        mode: 'markers',
        marker: {
          color: otu_ids[index],
          size: sample_values[index]
        }
      };
      
      var data = [trace];
      
      var layout = {
        title: `Bubble Chart For: BB_${names[index]}`,
        showlegend: false,
        paper_bgcolor: "#DBDE6D",
        xaxis: { title: { text: "OTU ID" } },
        yaxis: { title: { text: "QUANTITY OF BACTERIUM" } }
      };
      
      Plotly.newPlot('bubble', data, layout);
};


function optionChanged(index) {
    var ddlIndex = parseInt(index);

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