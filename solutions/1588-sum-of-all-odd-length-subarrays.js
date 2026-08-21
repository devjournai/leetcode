/**
 * Sum Of All Odd Length Subarrays
 * Intuition: Element i appears in ceil((i+1)*(n-i)/2) odd-length subarrays.
 * Approach: 1. For each i, left=i+1, right=n-i, oddCount=ceil(left*right/2). 2. Add arr[i]*oddCount.
 * Dry Run: arr = [1,4,2,5,3].
 *   - Weighted appearances sum to 58.
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
      totalSubarraysContainingElement / 2
    );

    totalSumOfOdds += arr[currentIndex] * oddLengthSubarrayAppearances;
  }

  return totalSumOfOdds;
};
