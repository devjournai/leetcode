/**
 * Longest Common Prefix
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
      inputStrings[k].length,
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
