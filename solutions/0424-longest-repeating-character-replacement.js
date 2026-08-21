/**
 * Longest Repeating Character Replacement
 * Intuition: In a window, at most `k` chars need changing if `windowSize - highestFrequencyInWindow <= k`. Slide `windowEnd` right; shrink `windowStart` when the inequality fails.
 * Approach: 1. 26-length `charFrequencies`. 2. Expand end, update that letter’s count and `highestFrequencyInWindow`. 3. If replacements needed exceed k, decrement the start letter and advance start. 4. Track max window length.
 * Dry Run: s = "AABABBA", k = 1.
 *   - Grow to "AABA" (A freq 3, size 4, 4-3=1). Next B forces shrink. Max length 4.
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
    const indexValue = currentCharacter.charCodeAt(0) - "A".charCodeAt(0);
    charFrequencies[indexValue]++;

    highestFrequencyInWindow = Math.max(
      highestFrequencyInWindow,
      charFrequencies[indexValue]
    );

    let currentWindowSize = windowEnd - windowStart + 1;
    if (currentWindowSize - highestFrequencyInWindow > k) {
      const characterForRemoval = s[windowStart];
      const removalIndex =
        characterForRemoval.charCodeAt(0) - "A".charCodeAt(0);
      charFrequencies[removalIndex]--;
      windowStart++;
    }

    maximumLength = Math.max(maximumLength, windowEnd - windowStart + 1);
  }

  return maximumLength;
};
