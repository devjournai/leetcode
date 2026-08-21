/**
 * Missing Number
 * Intuition: The numbers 0..n should sum to n(n+1)/2. The gap between that and the array sum is the missing value.
 * Approach: 1. `idealTotalSum = n*(n+1)/2`. 2. Sum the array. 3. Return the difference.
 * Dry Run: nums = [3,0,1], n=3.
 *   - Ideal 6, actual 4, missing 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var missingNumber = function (nums) {
  const collectionLength = nums.length;
  const idealTotalSum = (collectionLength * (collectionLength + 1)) / 2;
  let currentElementsSum = 0;

  for (let elementIndex = 0; elementIndex < collectionLength; elementIndex++) {
    currentElementsSum += nums[elementIndex];
  }

  const resultValue = idealTotalSum - currentElementsSum;
  return resultValue;
};
