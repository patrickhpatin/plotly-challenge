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

var names = ["940", "941", "943", "944", "945", "946", "947"];
var ethnicities = [null, "Black", "PacificIslander", "Caucasian", "Caucasian", "Caucasian", "Caucasian"];
var genders = ["f", "m", "F", null, "F", "F", "M"];
var ages = [24, 34, 49, null, 48, 42, 49];
var locations = ["Beaufort/NC", "Chicago/IL", "Omaha/NE", "NewHaven/CT", "Philidelphia/PA", "Deerfield/MA", "ChapelHill/NC"];
var bbtypes = ["o", "O", "Unknown", null, "i", "I", "Both"];
var wfreqs = [4, 1, 3.5, 7, null, 1, 6];
var otu_ids = [
	[1167, 2859, 482, 2264, 41, 1189, 352, 189, 2318, 1977, 3450, 874, 1959, 2191, 1950, 2077, 2275, 944, 2184, 2244, 2024, 2419, 2811, 165, 2782, 2247, 2011, 2396, 830, 2964, 1795, 2722, 307, 2178, 2908, 1193, 2167, 1208, 2039, 1274, 2739, 2737, 1314, 1962, 2186, 2335, 2936, 907, 833, 2483, 2475, 2491, 2291, 159, 2571, 2350, 2342, 2546, 725, 170, 1505, 513, 259, 1169, 258, 1232, 1497, 1498, 1503, 412, 2235, 1960, 1968, 121, 2065, 340, 2110, 2188, 357, 342],
[2722, 944, 2419, 2539, 3450, 1795, 2389, 1314, 922, 1167, 2859, 963, 2964, 2651, 2308, 482, 874, 2908, 1870, 2264, 41, 728, 1188, 352, 2782, 1926, 1959, 1200, 1977, 3312, 261, 296, 2890, 1929, 555, 2704, 2688, 710, 189, 2500, 2461, 854, 939, 1310],
[1795],
[922, 3555, 943, 1013, 1795, 944, 3368, 923, 1770, 3516, 3120, 3541, 2308, 3527, 3312, 41, 1929, 2651, 2937, 2722, 728, 2130, 3440, 3521, 3523, 3524, 1035, 970],
[944, 1795, 922, 2419, 2859, 943, 2722, 1167, 2651, 1314, 719, 2190, 2964, 296, 1169, 2782, 41, 2011, 728, 2539, 482, 2571, 2461, 1286, 3120, 1200, 909, 2318, 606, 2389, 3459, 830, 3450, 2191, 2275, 1189, 3379, 3389, 1929, 930, 2500, 917, 818, 2551, 1202, 1380, 3288, 1728, 2985, 391, 2524, 2820, 555, 2244, 2688, 811, 2647, 2614, 919, 2855],
[1167, 2859, 2011, 41, 296, 909, 2782, 2722, 2964, 1314, 1169, 1286, 2190, 3459, 2571, 2419, 2908, 1200, 2318, 830, 482, 1189, 3450, 2985, 2275, 2539, 2191, 2396, 2483, 2264, 391, 841, 1977, 874, 2079, 944, 1951, 1188, 2342, 1197, 1202, 728, 2086, 491, 833, 2651, 2308, 1214, 2244, 854, 2688, 2479, 2185, 1218, 2125, 2058, 1956, 1289, 1224, 1094, 2845, 2724, 2728, 1141, 2807, 2820, 2837, 2873, 2858, 1174, 814, 2927, 571, 345, 2987, 97, 1159, 2233, 2657, 2654, 2198, 2341, 1795, 1487, 2413, 1292, 2481, 1251, 2487, 2536, 2542, 2544, 2547, 1220, 2204, 18],
[2419, 2722, 2859, 944, 2651, 1795, 3450, 922, 1167, 2964, 2539, 728, 2011, 41, 1314, 1169, 296, 2190, 2389, 909, 1286, 2318, 1453, 2571, 2908, 2532, 2769, 2672, 2557, 2855, 3459, 2399, 2483, 2782, 2845, 2711, 1602, 2324, 1200, 830, 2369, 2985, 482, 1672, 841, 2858, 2847, 2846, 3368, 2820, 2203, 2762, 2424, 2704, 2688, 2675, 2275, 2638, 2331, 2560, 2396, 2526, 2525, 2500]
];
var sample_values = [
[163, 126, 113, 78, 71, 51, 50, 47, 40, 40, 37, 36, 30, 28, 25, 23, 22, 19, 19, 14, 13, 13, 13, 12, 12, 11, 11, 11, 10, 10, 10, 8, 7, 7, 7, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[194, 178, 162, 92, 84, 40, 37, 28, 27, 24, 21, 21, 13, 10, 10, 8, 8, 5, 5, 4, 4, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[2],
[278, 33, 19, 18, 11, 8, 7, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[274, 141, 129, 110, 40, 37, 35, 32, 26, 20, 17, 15, 15, 15, 15, 14, 14, 12, 10, 10, 9, 8, 8, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[217, 195, 159, 153, 123, 116, 116, 114, 109, 100, 93, 83, 80, 42, 39, 36, 34, 33, 31, 28, 28, 26, 24, 20, 19, 18, 17, 16, 13, 12, 12, 12, 9, 8, 7, 7, 7, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[412, 236, 200, 135, 115, 102, 46, 45, 27, 24, 23, 19, 15, 13, 11, 10, 9, 9, 9, 7, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];
var otu_labels = [
["Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae;Varibaculum", "Bacteria;Firmicutes;Clostridia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae", "Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Firmicutes;Clostridia;Clostridiales;Peptococcaceae;Peptococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Gallicola", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Gallicola", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae;Prevotella", "Bacteria;Firmicutes;Clostridia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;Ruminococcaceae", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria", "Bacteria;Firmicutes", "Bacteria", "Bacteria", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes", "Bacteria;Firmicutes", "Bacteria;Firmicutes", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia", "Bacteria;Firmicutes;Clostridia", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria", "Bacteria"],
["Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae;Prevotella", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Dermabacteraceae;Dermabacter", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae;Varibaculum", "Bacteria;Firmicutes;Clostridia;Clostridiales;Peptococcaceae;Peptococcus", "Bacteria;Firmicutes;Bacilli;Lactobacillales;Aerococcaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Bacilli;Lactobacillales;Streptococcaceae;Streptococcus", "Bacteria;Firmicutes;Clostridia", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Proteobacteria;Betaproteobacteria;Burkholderiales", "Bacteria", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;Lachnospiraceae", "Bacteria;Firmicutes;Bacilli;Lactobacillales;Streptococcaceae;Streptococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae;Mobiluncus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae;Prevotella"],
["Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus"],
["Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Proteobacteria;Gammaproteobacteria;Pseudomonadales;Moraxellaceae;Enhydrobacter", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Micrococcaceae;Kocuria", "Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Proteobacteria;Betaproteobacteria;Burkholderiales;Comamonadaceae;Pelomonas", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Gemella", "Bacteria;Proteobacteria;Gammaproteobacteria;Oceanospirillales;Oceanospirillaceae;Marinomonas", "Bacteria;Proteobacteria;Alphaproteobacteria;Caulobacterales;Caulobacteraceae;Brevundimonas", "Bacteria;Proteobacteria;Gammaproteobacteria;Pseudomonadales;Moraxellaceae;Acinetobacter", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Proteobacteria;Gammaproteobacteria;Pasteurellales;Pasteurellaceae", "Bacteria;Proteobacteria;Betaproteobacteria;Burkholderiales", "Bacteria", "Bacteria;Firmicutes;Bacilli;Lactobacillales;Streptococcaceae;Streptococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;Ruminococcaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Proteobacteria;Gammaproteobacteria;Pasteurellales;Pasteurellaceae", "Bacteria;Proteobacteria;Gammaproteobacteria;Pasteurellales;Pasteurellaceae", "Bacteria;Proteobacteria;Gammaproteobacteria;Pasteurellales;Pasteurellaceae", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Nocardioidaceae", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Dermacoccaceae;Dermacoccus"],
["Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae;Prevotella", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae", "Bacteria", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae", "Bacteria;Proteobacteria;Alphaproteobacteria;Caulobacterales;Caulobacteraceae;Brevundimonas", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Proteobacteria;Betaproteobacteria;Burkholderiales;Oxalobacteraceae;Janthinobacterium", "Bacteria;Proteobacteria;Betaproteobacteria;Neisseriales;Neisseriaceae", "Bacteria;Firmicutes;Bacilli;Lactobacillales;Streptococcaceae;Streptococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Bacteroidetes;Sphingobacteria;Sphingobacteriales;Chitinophagaceae", "Bacteria;Proteobacteria;Alphaproteobacteria;Sphingomonadales;Sphingomonadaceae;Sphingopyxis", "Bacteria;Firmicutes;Bacilli;Bacillales", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae;Dialister", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus"],
["Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria", "Bacteria", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae;Prevotella", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;Peptococcaceae;Peptococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae;Dialister", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae;Actinomyces", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae;Varibaculum", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Clostridia", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae;Mobiluncus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria;Firmicutes;Clostridia", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae;Hallella", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Bacteroidetes", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;Peptococcaceae;Peptococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae;Dialister", "Bacteria", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerosphaera", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerosphaera", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus", "Bacteria;Firmicutes", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae;Prevotella", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria"],
["Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales", "Bacteria", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae;Prevotella", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Prevotellaceae", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Cyanobacteria;Cyanobacteria;Chloroplast;Streptophyta", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;Peptococcaceae;Peptococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Proteobacteria;Epsilonproteobacteria;Campylobacterales;Campylobacteraceae;Campylobacter", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Bacilli", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;Veillonellaceae;Dialister", "Bacteria", "Bacteria;Firmicutes;Bacilli", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Actinomycetaceae;Actinomyces", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Proteobacteria;Betaproteobacteria;Burkholderiales;Comamonadaceae;Pelomonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus"]
];
var demoData = "";

function addOption( index ) {
    dropdownList.options[dropdownList.options.length] = new Option(names[index], index.toString());
};

for (var i = 0; i < names.length; i++) {
    addOption(i);
};

// d3.json("static/data/samples.json").then((incomingData) => {
//     // Store the raw data for later use
//     sampleData = incomingData;
//     metaData = sampleData["metadata"];
    // samples = sampleData["samples"];

//     // Let's see the raw data
//     console.log("ALL DATA:");
//     console.log(sampleData);
//     console.log("----------------------");

//     console.log("Survey Data:");
//     console.log(sampleData["metadata"]);
//     console.log("----------------------");

//     names = sampleData["names"]; // ID
//     console.log("Names (IDs):");
//     console.log(names);
//     console.log("----------------------");

//     ethnicities = unpackMetadata(metaData, ETHNICITY);
//     console.log("Ethnicities:");
//     console.log(ethnicities);
//     console.log("----------------------");

//     genders = unpackMetadata(metaData, GENDER);
//     console.log("Genders:");
//     console.log(genders);
//     console.log("----------------------");

//     ages = unpackMetadata(metaData, AGE);
//     console.log("Ages:");
//     console.log(ages);
//     console.log("----------------------");

//     locations = unpackMetadata(metaData, LOCATION);
//     console.log("Locations:");
//     console.log(locations);
//     console.log("----------------------");

//     bbtypes = unpackMetadata(metaData, BBTYPE);
//     console.log("BBTypes:");
//     console.log(bbtypes);
//     console.log("----------------------");

//     wfreqs = unpackMetadata(metaData, WFREQ);
//     console.log("WFreqs:");
//     console.log(wfreqs);
//     console.log("----------------------");

//     otu_ids = unpackSamples(samples, OTU_IDS);
//     console.log("OTU_IDs:");
//     console.log(otu_ids);
//     console.log("----------------------");

//     sample_values = unpackSamples(samples, SAMPLE_VALUES);
//     console.log("Sample_Values:");
//     console.log(sample_values);
//     console.log("----------------------");

//     otu_labels = unpackSamples(samples, OTU_LABELS);
//     console.log("OTU_Labels:");
//     console.log(otu_labels);
//     console.log("----------------------");
    
//     // Clear out the drop down list
//     // dropdownList.options.length = 0;

//     for (var i = 0; i < names.length; i++) {
//         addOption(i);
//     };
// });

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
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "#6F2A1A" },
            bar: { color: "#8B4A8C" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray"},
		value: wfreqs[index],
		title: { text: "Weekly Washing Frequency" },
		type: "indicator",
		mode: "gauge+number"
    };

    // data
    var data = [trace];

    // Define the Bubble Chart Layout
    var layout = {
        margin: { t: 0, b: 0 },
        paper_bgcolor: "#DBDE6D"
    };

    // Render the plot to the div tag "gauge"
    Plotly.newPlot("gauge", data, layout);
};

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
    console.log(names[ddlIndex]);
    console.log(`Selected Index = ${dropdownList.selectedIndex}`);

    demoData = generateDemoData(ddlIndex);
    d3.select("#sample-metadata").html(demoData);

    populateHBar(ddlIndex);
    populateBubbleChart(ddlIndex);
    populateGaugeChart(ddlIndex);
};

// demoData = generateDemoData(0);
// d3.select("#sample-metadata").html(demoData);
dropdownList.onchange("0");