/**
 * Longest Turbulent Subarray
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxTurbulenceSize = function (inputElements) {
  if (inputElements.length < 2) {
    return inputElements.length;
  }

  let longestSubarrayLength = 1;
  let currentTurbulenceAscending = 1;
  let currentTurbulenceDescending = 1;

  for (let arrayIndex = 1; arrayIndex < inputElements.length; arrayIndex++) {
    const previousAscendingValue = currentTurbulenceAscending;
    const previousDescendingValue = currentTurbulenceDescending;

    if (inputElements[arrayIndex] === inputElements[arrayIndex - 1]) {
      currentTurbulenceAscending = 1;
      currentTurbulenceDescending = 1;
    } else {
      if (inputElements[arrayIndex] > inputElements[arrayIndex - 1]) {
        currentTurbulenceAscending = previousDescendingValue + 1;
        currentTurbulenceDescending = 1;
      } else {
        currentTurbulenceDescending = previousAscendingValue + 1;
        currentTurbulenceAscending = 1;
      }
    }
    longestSubarrayLength = Math.max(
      longestSubarrayLength,
      currentTurbulenceAscending,
      currentTurbulenceDescending,
    );
  }

  return longestSubarrayLength;
};
