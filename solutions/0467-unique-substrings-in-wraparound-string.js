/**
 * Unique Substrings In Wraparound String
 * Time Complexity: O(s.length)
 * Space Complexity: O(1)
 */
var findSubstringInWraproundString = function (s) {
    if (s.length === 0) {
        return 0;
    }

    const maximumLengthsEndingWithChar = new Array(26).fill(0);
    let currentConsecutiveRunLength = 0;

    for (let iteratorIndex = 0; iteratorIndex < s.length; iteratorIndex++) {
        let currentCharCodeValue = s.charCodeAt(iteratorIndex);
        let previousCharDifference = 0;

        if (iteratorIndex > 0) {
            let previousCharCodeValue = s.charCodeAt(iteratorIndex - 1);
            previousCharDifference = (currentCharCodeValue - previousCharCodeValue - 1) % 26;
        }

        if (iteratorIndex === 0 || previousCharDifference === 0) {
            currentConsecutiveRunLength++;
        } else {
            currentConsecutiveRunLength = 1;
        }

        let charMappingIndex = currentCharCodeValue - 97;
        maximumLengthsEndingWithChar[charMappingIndex] = Math.max(maximumLengthsEndingWithChar[charMappingIndex], currentConsecutiveRunLength);
    }

    let totalUniqueSubstringsCount = 0;
    for (let currentLengthValue of maximumLengthsEndingWithChar) {
        totalUniqueSubstringsCount += currentLengthValue;
    }

    return totalUniqueSubstringsCount;
};