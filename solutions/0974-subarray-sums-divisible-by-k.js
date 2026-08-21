/**
 * Subarray Sums Divisible By K
 * Intuition: Two prefix sums with the same remainder mod k differ by a multiple of k. Count prior prefixes with remainder `((sum % k) + k) % k`.
 * Approach: 1. `remainderFrequency` starts with 0 → 1. 2. Add each `numValue` to `currentCumulativeSum`. 3. Add the stored count for that remainder, then increment it. 4. Return `subarraysCount`.
 * Dry Run: nums = [4,5,0,-2,-3,1], k=5. Prefix remainders 4,4,4,2,4,0. Each repeat of 4 adds previous 4's; remainder 0 adds the initial 1 plus later. Answer 7.
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
