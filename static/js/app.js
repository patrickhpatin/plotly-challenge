/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * {"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}
 * index 0 - id
 * index 1 - ethnicity
 * index 2 - gender
 * index 3 - age
 * index 4 - location
 * index 5 - bbtype
 * index 6 - wfreq
 */
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
};

var dropdownList = d3.select("#selDataset");

const NAME = 0;
const ETHNICITY = 1;
const GENDER = 2;
const AGE = 3;
const LOCATION = 4;
const BBTYPE = 5;
const WFREQ = 6;

var sampleData = [];
var names = [];
var ethnicities = [];
var genders = [];
var ages = [];
var locations = [];
var bbtypes = [];
var wfreqs = [];

var sampleData = d3.json("static/data/samples.json").then((incomingData) => {
    // Store the raw data for later use
    sampleData = incomingData;
    // Let's see the raw data
    // console.log(sampleData);
    // console.log("----------------------");
    console.log(sampleData.metadata);
    console.log("----------------------");

    // names = sampleData.names; // ID
    // ethnicities = upack(sampleData.metadata, ETHNICITY);
    // genders = upack(sampleData.metadata, GENDER);
    // ages = upack(sampleData.metadata, AGE);
    // locations = upack(sampleData.metadata, LOCATION);
    // bbtypes = upack(sampleData.metadata, BBTYPE);
    // wfreqs = upack(sampleData.metadata, WFREQ);

    
    // for (var i = 0; i < ids.length; i++) {
    //     // BIND DATA TO <select> ELEMENT.
    //     dropdownList.innerHTML = dropdownList.innerHTML +
    //         `<option value="${names[i]}">${names[i]}</option>`;
    // }
});

dropdownList.on("change", () => {
    var name = dropdownList.node().value;
    console.log(name);
});