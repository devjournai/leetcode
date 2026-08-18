/**
 * String Compression III
 * Intuition: Compress each run of identical characters into digit(s) plus the character, splitting runs longer than 9.
 * Approach: 1. Walk the string tracking the current run. 2. While a run remains, append min(9, remaining) and the character. 3. Return the compressed string.
 * Dry Run:
 *   word = "aaaaaaaaaaaaaabb"
 *   9a then 5a then 2b -> "9a5a2b"
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var compressedString = function (word) {
  const compressedParts = [];
  let runStartIndex = 0;
  while (runStartIndex < word.length) {
    let runEndIndex = runStartIndex;
    while (
      runEndIndex < word.length &&
      word[runEndIndex] === word[runStartIndex]
    ) {
      runEndIndex++;
    }
    let remainingRunLength = runEndIndex - runStartIndex;
    while (remainingRunLength > 0) {
      const chunkLength = Math.min(9, remainingRunLength);
      compressedParts.push(String(chunkLength), word[runStartIndex]);
      remainingRunLength -= chunkLength;
    }
    runStartIndex = runEndIndex;
  }
  return compressedParts.join("");
};
