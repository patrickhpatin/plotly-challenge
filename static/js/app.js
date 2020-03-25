
// {"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}
const NAME = 0;
const ETHNICITY = 1;
const GENDER = 2;
const AGE = 3;
const LOCATION = 4;
const BBTYPE = 5;
const WFREQ = 6;

var dropdownList = d3.select("#selDataset");

var sampleData = [];
var metaData = [];

var names = [];
var ethnicities = [];
var genders = [];
var ages = [];
var locations = [];
var bbtypes = [];
var wfreqs = [];

d3.json("static/data/samples.json").then((incomingData) => {
    /**
     * Helper function to select stock data
     * Returns an array of values
     * @param {array} rows
     * @param {integer} index
     */
    function unpack(rows, index) {
        return rows.map(function(row) {
            var value = "";
            switch (index) {
                case NAME:
                    value = row["id"];
                    break;
                case ETHNICITY:
                    value = row["ethnicity"];
                    break;
                case GENDER:
                    value = row["gender"];
                    break;
                case AGE:
                    value = row["age"];
                    break;
                case LOCATION:
                    value = row["location"];
                    break;
                case BBTYPES:
                    value = row["bbtype"];
                    break;
                case WFREQ:
                    value = row["wfreq"];
                    break;
            };
            return value;
        });
    };

    // Store the raw data for later use
    sampleData = incomingData;
    metaData = sampleData["metadata"];

    // Make sure my testing is being done on the right file
    console.log("Testing unpack function spelled correctly this time.");

    // Let's see the raw data
    // console.log("ALL DATA:");
    // console.log(sampleData);
    // console.log("----------------------");

    // console.log("Survey Data:");
    // console.log(sampleData["metadata"]);
    // console.log("----------------------");

    // names = sampleData["names"]; // ID
    // console.log("Names (IDs):");
    // console.log(names);
    // console.log("----------------------");

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

    
    for (var i = 0; i < names.length; i++) {
        // BIND DATA TO <select> ELEMENT.
        dropdownList.innerHTML = dropdownList.innerHTML +
            `<option value="${names[i]}">${names[i]}</option>`;
    };
});

// dropdownList.on("change", () => {
//     var name = dropdownList.node().value;
//     console.log(name);
// });