/**
 * Find The Number Of Good Pairs II
 * Intuition: Scale nums2 by k, then for each value in nums1 count how many scaled nums2 values divide it using divisor enumeration.
 * Approach: 1. Count frequencies of nums2[j] * k. 2. For each nums1 value, iterate its divisors and add matching frequencies. 3. Return the total.
 * Dry Run:
 *   nums1 = [1,3,4], nums2 = [1,3,4], k = 1
 *   Same as I: 5 good pairs.
 * Time Complexity: O(N * sqrt(max(nums1)) + M)
 * Space Complexity: O(M)
 */
var numberOfPairs = function (nums1, nums2, k) {
  const scaledFrequency = new Map();
  for (const rightValue of nums2) {
    const scaledValue = rightValue * k;
    scaledFrequency.set(
      scaledValue,
      (scaledFrequency.get(scaledValue) || 0) + 1
    );
  }

  let goodPairCount = 0;
  for (const leftValue of nums1) {
    for (let divisor = 1; divisor * divisor <= leftValue; divisor++) {
      if (leftValue % divisor === 0) {
        goodPairCount += scaledFrequency.get(divisor) || 0;
        const pairedDivisor = leftValue / divisor;
        if (pairedDivisor !== divisor) {
          goodPairCount += scaledFrequency.get(pairedDivisor) || 0;
        }
      }
    }
  }
  return goodPairCount;
};
