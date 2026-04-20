/**
 * Longest Repeating Character Replacement
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var characterReplacement = function (s, k) {
    const charFrequencies = new Array(26).fill(0);
    let windowStart = 0;
    let highestFrequencyInWindow = 0;
    let maximumLength = 0;

    for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
        const currentCharacter = s[windowEnd];
        const indexValue = currentCharacter.charCodeAt(0) - 'A'.charCodeAt(0);
        charFrequencies[indexValue]++;

        highestFrequencyInWindow = Math.max(highestFrequencyInWindow, charFrequencies[indexValue]);

        let currentWindowSize = windowEnd - windowStart + 1;
        if (currentWindowSize - highestFrequencyInWindow > k) {
            const characterForRemoval = s[windowStart];
            const removalIndex = characterForRemoval.charCodeAt(0) - 'A'.charCodeAt(0);
            charFrequencies[removalIndex]--;
            windowStart++;
        }

        maximumLength = Math.max(maximumLength, windowEnd - windowStart + 1);
    }

    return maximumLength;
};