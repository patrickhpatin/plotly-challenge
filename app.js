
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

var names = [];
var ethnicities = [];
var genders = [];
var ages = [];
var locations = [];
var bbtypes = [];
var wfreqs = [];

function addOption( value ) {
    dropdownList.options[dropdownList.options.length] = new Option(value);
};

d3.json("static/data/samples.json").then((incomingData) => {
    // Store the raw data for later use
    sampleData = incomingData;
    metaData = sampleData["metadata"];

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

    ethnicities = unpack(metaData, ETHNICITY);
    console.log("Ethnicities:");
    console.log(ethnicities);
    console.log("----------------------");

    genders = unpack(metaData, GENDER);
    console.log("Genders:");
    console.log(genders);
    console.log("----------------------");

    ages = unpack(metaData, AGE);
    console.log("Ages:");
    console.log(ages);
    console.log("----------------------");

    locations = unpack(metaData, LOCATION);
    console.log("Locations:");
    console.log(locations);
    console.log("----------------------");

    bbtypes = unpack(metaData, BBTYPE);
    console.log("BBTypes:");
    console.log(bbtypes);
    console.log("----------------------");

    wfreqs = unpack(metaData, WFREQ);
    console.log("WFreqs:");
    console.log(wfreqs);
    console.log("----------------------");

    var demoData = `<table><tr><td><strong>id:</strong></td><td>${names[0]}</td></tr>` +
                    `<tr><td><strong>ethnicity:</strong></td><td>${ethnicities[0]}</td></tr>` +
                    `<tr><td><strong>gender:</strong></td><td>${genders[0]}</td></tr>` +
                    `<tr><td><strong>age:</strong></td><td>${ages[0]}</td></tr>` +
                    `<tr><td><strong>location:</strong></td><td>${locations[0]}</td></tr>` +
                    `<tr><td><strong>bbtype:</strong></td><td>${bbtypes[0]}</td></tr>` +
                    `<tr><td><strong>wfreq:</strong></td><td>${wfreqs[0]}</td></tr></table>`
    d3.select("#sample-metadata").html(demoData);

    // Make sure my testing is being done on the right file    
    console.log("Changed how we reference the dropdown list.  And changed location of Demo Data code.");
    
    // Clear out the drop down list
    // dropdownList.options.length = 0;

    for (var i = 0; i < names.length; i++) {
        addOption(names[i]);
    };
});


// function generateDemoData(name) {
//     return `<p>Name:<br></p>`
// };

// dropdownList.on("change", () => {
//     var name = dropdownList.value;
//     console.log(name);

//     var demoData = generateDemoData(name);
//     d3.select("#sample-metadata").html(demoData);
// });