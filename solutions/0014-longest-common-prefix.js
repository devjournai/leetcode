/**
 * Longest Common Prefix
 * Intuition: Only characters up to the shortest string can be shared; compare column by column across all strings and stop at the first mismatch.
 * Approach: 1. Return "" if the array is empty. 2. Compute `shortestStringLength`. 3. For each `charIndex`, take `currentChar` from the first string and require every other string to match. 4. On mismatch return `commonPrefix`; otherwise append the character. 5. Return the built prefix.
 * Dry Run: inputStrings = ["flower", "flow", "flight"].
 *   - charIndex=0 'f' matches all. charIndex=1 'l' matches. charIndex=2 'o' vs "flight"[2]='i' → return "fl".
 * Time Complexity: O(N * M)
 * Space Complexity: O(M)
 */
var longestCommonPrefix = function (inputStrings) {
  if (!inputStrings || inputStrings.length === 0) {
    return "";
  }

  let shortestStringLength = inputStrings[0].length;
  for (let k = 1; k < inputStrings.length; k++) {
    shortestStringLength = Math.min(
      shortestStringLength,
      inputStrings[k].length
    );
  }

  let commonPrefix = "";
  for (let charIndex = 0; charIndex < shortestStringLength; charIndex++) {
    let currentChar = inputStrings[0][charIndex];
    for (
      let stringIndex = 1;
      stringIndex < inputStrings.length;
      stringIndex++
    ) {
      if (inputStrings[stringIndex][charIndex] !== currentChar) {
        return commonPrefix;
      }
    }
    commonPrefix += currentChar;
  }

  return commonPrefix;
};
