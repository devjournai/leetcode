/**
 * Find All Anagrams In A String
 * Time Complexity: O(s.length + p.length)
 * Space Complexity: O(1)
*/
var findAnagrams = function (s, p) {
    const patternCharacterCounts = new Array(26).fill(0);
    const resultStartingIndices = [];

    const sourceLength = s.length;
    const patternLength = p.length;

    if (sourceLength < patternLength) {
        return resultStartingIndices;
    }

    for (let currentPCharIndex = 0; currentPCharIndex < patternLength; currentPCharIndex++) {
        const charCodeP = p.charCodeAt(currentPCharIndex) - 97;
        patternCharacterCounts[charCodeP]--;
    }

    let zeroBalanceCount = 0;

    for (let charEntryIndex = 0; charEntryIndex < 26; charEntryIndex++) {
        if (patternCharacterCounts[charEntryIndex] === 0) {
            zeroBalanceCount++;
        }
    }

    let windowLeftPointer = 0;
    for (let windowRightPointer = 0; windowRightPointer < sourceLength; windowRightPointer++) {
        const charCodeS = s.charCodeAt(windowRightPointer) - 97;

        if (patternCharacterCounts[charCodeS] === 0) {
            zeroBalanceCount--;
        }
        patternCharacterCounts[charCodeS]++;
        if (patternCharacterCounts[charCodeS] === 0) {
            zeroBalanceCount++;
        }

        if (windowRightPointer - windowLeftPointer + 1 === patternLength) {
            if (zeroBalanceCount === 26) {
                resultStartingIndices.push(windowLeftPointer);
            }

            const charCodeLeft = s.charCodeAt(windowLeftPointer) - 97;

            if (patternCharacterCounts[charCodeLeft] === 0) {
                zeroBalanceCount--;
            }
            patternCharacterCounts[charCodeLeft]--;
            if (patternCharacterCounts[charCodeLeft] === 0) {
                zeroBalanceCount++;
            }

            windowLeftPointer++;
        }
    }

    return resultStartingIndices;
};