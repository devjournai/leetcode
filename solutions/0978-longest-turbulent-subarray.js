/**
 * Longest Turbulent Subarray
 * Intuition: Track the longest run ending here that last went up (`currentTurbulenceAscending`) vs down (`currentTurbulenceDescending`). A peak/valley extends the opposite run.
 * Approach: 1. Length < 2 returns that length. 2. For each adjacent pair: equal resets both to 1; greater sets ascending = prev descending + 1; lesser sets descending = prev ascending + 1. 3. Track `longestSubarrayLength`. 4. Return it.
 * Dry Run: inputElements = [9,4,2,10,7,8,8,1,9]. 9>4>2 then 2<10>7<8 resets at 8=8. Longest turbulent is 5 (4,2,10,7,8).
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
      currentTurbulenceDescending
    );
  }

  return longestSubarrayLength;
};
