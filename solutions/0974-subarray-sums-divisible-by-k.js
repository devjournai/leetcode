/**
 * Subarray Sums Divisible By K
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
var subarraysDivByK = function (nums, k) {
  const remainderFrequency = new Map();
  remainderFrequency.set(0, 1);

  let currentCumulativeSum = 0;
  let subarraysCount = 0;

  for (const numValue of nums) {
    currentCumulativeSum += numValue;
    const calculatedRemainder = ((currentCumulativeSum % k) + k) % k;

    const previousCount = remainderFrequency.get(calculatedRemainder) || 0;
    subarraysCount += previousCount;
    remainderFrequency.set(calculatedRemainder, previousCount + 1);
  }

  return subarraysCount;
};
