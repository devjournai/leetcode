/**
 * Sum Of All Odd Length Subarrays
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var sumOddLengthSubarrays = function (arr) {
  let totalSumOfOdds = 0;
  let arrayLength = arr.length;

  for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
    let leftChoices = currentIndex + 1;
    let rightChoices = arrayLength - currentIndex;

    let totalSubarraysContainingElement = leftChoices * rightChoices;

    let oddLengthSubarrayAppearances = Math.ceil(
      totalSubarraysContainingElement / 2,
    );

    totalSumOfOdds += arr[currentIndex] * oddLengthSubarrayAppearances;
  }

  return totalSumOfOdds;
};
