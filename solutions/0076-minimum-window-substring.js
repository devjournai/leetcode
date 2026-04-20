/**
 * Minimum Window Substring
 * Time Complexity: O(S + T)
 * Space Complexity: O(1)
 */
var minWindow = function (s, t) {
    const characterFrequencies = new Array(128).fill(0);
    let charactersNeeded = t.length;

    for (let charIterator = 0; charIterator < t.length; charIterator++) {
        characterFrequencies[t.charCodeAt(charIterator)]++;
    }

    let minSubstringStart = 0;
    let minSubstringLength = Infinity;
    let windowBegin = 0;

    for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
        const currentCharCode = s.charCodeAt(windowEnd);
        if (characterFrequencies[currentCharCode] > 0) {
            charactersNeeded--;
        }
        characterFrequencies[currentCharCode]--;

        while (charactersNeeded === 0) {
            const currentWindowSize = windowEnd - windowBegin + 1;
            if (currentWindowSize < minSubstringLength) {
                minSubstringLength = currentWindowSize;
                minSubstringStart = windowBegin;
            }

            const charToExitCode = s.charCodeAt(windowBegin);
            characterFrequencies[charToExitCode]++;
            if (characterFrequencies[charToExitCode] > 0) {
                charactersNeeded++;
            }
            windowBegin++;
        }
    }

    if (minSubstringLength === Infinity) {
        return "";
    } else {
        return s.substring(minSubstringStart, minSubstringStart + minSubstringLength);
    }
};