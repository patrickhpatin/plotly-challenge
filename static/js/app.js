
// {"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}
const NAME = 0;
const ETHNICITY = 1;
const GENDER = 2;
const AGE = 3;
const LOCATION = 4;
const BBTYPE = 5;
const WFREQ = 6;

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 */
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
};

var dropdownList = d3.select("#selDataset");

var sampleData = [];
var names = [];
var ethnicities = [];
var genders = [];
var ages = [];
var locations = [];
var bbtypes = [];
var wfreqs = [];

d3.json("static/data/samples.json").then((incomingData) => {
    // Store the raw data for later use
    sampleData = incomingData;

    // Let's see the raw data
    // console.log("NAMES:");
    // console.log(sampleData["names"]);
    // console.log("----------------------");
    console.log("METADATA:");
    console.log(sampleData["metadata"][0]["ethnicity"]);
    console.log("----------------------");

    // names = sampleData.names; // ID
    // console.log(names);
    // ethnicities = upack(sampleData.metadata, ETHNICITY);
    // console.log(ethnicities);

    // genders = upack(sampleData.metadata, GENDER);
    // ages = upack(sampleData.metadata, AGE);
    // locations = upack(sampleData.metadata, LOCATION);
    // bbtypes = upack(sampleData.metadata, BBTYPE);
    // wfreqs = upack(sampleData.metadata, WFREQ);

    
    // for (var i = 0; i < names.length; i++) {
    //     // BIND DATA TO <select> ELEMENT.
    //     dropdownList.innerHTML = dropdownList.innerHTML +
    //         `<option value="${names[i]}">${names[i]}</option>`;
    // }
});

dropdownList.on("change", () => {
    // var name = dropdownList.node().value;
    // console.log(name);
});