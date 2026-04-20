/**
 * Count Number Of Homogenous Substrings
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
