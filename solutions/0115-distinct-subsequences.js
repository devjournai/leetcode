/**
 * Distinct Subsequences
 * Time Complexity: O(sourceString.length * targetString.length)
 * Space Complexity: O(targetString.length)
*/
var numDistinct = function (sourceString, targetString) {
    var sourceLen = sourceString.length;
    var targetLen = targetString.length;

    var distinctSubsequenceCounts = new Array(targetLen + 1).fill(0);
    distinctSubsequenceCounts[0] = 1;

    for (var sourcePointer = 0; sourcePointer !== sourceLen; ++sourcePointer) {
        for (var targetPointer = targetLen - 1; targetPointer > -1; --targetPointer) {
            if (sourceString[sourcePointer] === targetString[targetPointer]) {
                distinctSubsequenceCounts[targetPointer + 1] += distinctSubsequenceCounts[targetPointer];
            }
        }
    }

    return distinctSubsequenceCounts[targetLen];
};