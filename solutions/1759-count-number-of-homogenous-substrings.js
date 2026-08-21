/**
 * Count Number Of Homogenous Substrings
 * Intuition: A run of length L contributes 1+2+…+L homogenous substrings. Add the current run length at each position (mod 1e9+7).
 * Approach: 1. Scan `inputString`, grow `currentRunLength` when equal to previous else reset to 1. 2. Add the run length into `overallHomogenousCount`. 3. Return the count.
 * Dry Run: inputString = "abbcccaa"
 * runs 1; 1+2; 1+2; 1+2+3; 1+2 → total 13.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countHomogenous = function (inputString) {
  const divisorForModulo = 1e9 + 7;
  let overallHomogenousCount = 0;
  let currentRunLength = 0;

  for (let charIndex = 0; charIndex < inputString.length; charIndex++) {
    if (
      charIndex > 0 &&
      inputString[charIndex] === inputString[charIndex - 1]
    ) {
      currentRunLength++;
    } else {
      currentRunLength = 1;
    }
    overallHomogenousCount =
      (overallHomogenousCount + currentRunLength) % divisorForModulo;
  }

  return overallHomogenousCount;
};
