/**
 * Longest Substring With At Least K Repeating Characters
 * Time Complexity: O(N * alpha)
 * Space Complexity: O(N + alpha)
*/
var longestSubstring = function (s, k) {
    if (s.length === 0 || k > s.length) {
        return 0;
    }

    let characterOccurrenceMap = new Map();
    for (let charValue of s) {
        characterOccurrenceMap.set(charValue, (characterOccurrenceMap.get(charValue) || 0) + 1);
    }

    let needsSplitting = false;
    let splittingValue = '';
    characterOccurrenceMap.forEach((currentFrequency, charKey) => {
        if (!needsSplitting && currentFrequency < k) {
            needsSplitting = true;
            splittingValue = charKey;
        }
    });

    if (needsSplitting) {
        let currentMaxLength = 0;
        let substringParts = s.split(splittingValue);
        for (let partIndex = 0; partIndex < substringParts.length; partIndex++) {
            let segmentToProcess = substringParts[partIndex];
            let resultFromSubCall = longestSubstring(segmentToProcess, k);
            if (resultFromSubCall > currentMaxLength) {
                currentMaxLength = resultFromSubCall;
            }
        }
        return currentMaxLength;
    }

    return s.length;
};