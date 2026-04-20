/**
 * First Unique Character In A String
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var firstUniqChar = function (s) {
    const charFrequencies = {};
    const stringLength = s.length;

    let initialScanIndex = 0;
    for (; initialScanIndex < stringLength; initialScanIndex++) {
        const currentSymbol = s[initialScanIndex];
        charFrequencies[currentSymbol] = (charFrequencies[currentSymbol] || 0) + 1;
    }

    let finalCheckIndex = 0;
    for (; finalCheckIndex < stringLength; finalCheckIndex++) {
        const symbolToEvaluate = s[finalCheckIndex];
        const symbolCount = charFrequencies[symbolToEvaluate];
        if (symbolCount === 1) {
            return finalCheckIndex;
        }
    }

    return -1;
};