/**
 * Counting Words With A Given Prefix
 * Intuition: To count words starting with a specific prefix, iterate through each word and examine if its initial characters perfectly match the given prefix.
 * Approach: 1. Initialize a numerical counter to keep track of words that match the prefix. 2. Determine the exact length of the provided prefix string. 3. Iterate through each string element present in the input array of words. 4. For every current word, first confirm its total length is greater than or equal to the prefix's length to prevent out-of-bounds errors or mismatches. 5. If the length condition is met, extract a substring from the beginning of the current word, having the same length as the prefix. 6. Compare this extracted substring directly with the original prefix string. 7. If this comparison yields a match, increment the numerical counter. 8. After the iteration completes through all words, return the final value of the counter.
 * Dry Run: words = ["pay","attention","practice","attend"], pref = "at"
 *   - matchingWordsCounter = 0
 *   - targetPrefixLength = 2
 *   - Loop iteration 1:
 *     - currentWordCandidate = "pay"
 *     - "pay".length (3) >= targetPrefixLength (2) is true.
 *     - segmentToCheck = "pay".substring(0, 2) which is "pa".
 *     - "pa" === "at" is false.
 *   - Loop iteration 2:
 *     - currentWordCandidate = "attention"
 *     - "attention".length (9) >= targetPrefixLength (2) is true.
 *     - segmentToCheck = "attention".substring(0, 2) which is "at".
 *     - "at" === "at" is true.
 *     - matchingWordsCounter becomes 1.
 *   - Loop iteration 3:
 *     - currentWordCandidate = "practice"
 *     - "practice".length (8) >= targetPrefixLength (2) is true.
 *     - segmentToCheck = "practice".substring(0, 2) which is "pr".
 *     - "pr" === "at" is false.
 *   - Loop iteration 4:
 *     - currentWordCandidate = "attend"
 *     - "attend".length (6) >= targetPrefixLength (2) is true.
 *     - segmentToCheck = "attend".substring(0, 2) which is "at".
 *     - "at" === "at" is true.
 *     - matchingWordsCounter becomes 2.
 *   - Loop finishes.
 *   - Return 2.
 * Time Complexity: O(N * P)
 * Space Complexity: O(1)
 */
var prefixCount = function (words, pref) {
  let matchingWordsCounter = 0;
  let targetPrefixLength = pref.length;

  for (let currentWordCandidate of words) {
    if (currentWordCandidate.length >= targetPrefixLength) {
      let segmentToCheck = currentWordCandidate.substring(
        0,
        targetPrefixLength,
      );
      if (segmentToCheck === pref) {
        matchingWordsCounter++;
      }
    }
  }

  return matchingWordsCounter;
};
