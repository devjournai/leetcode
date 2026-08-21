/**
 * Number Of Sub Arrays With Odd Sum
 * Intuition: A subarray sum is odd iff prefix parity flips. An odd prefix pairs with prior even prefixes, even with prior odd.
 * Approach: 1. even=1 (empty prefix), odd=0. 2. Add each num; if prefix odd add even else add odd, then increment that parity. 3. Mod 1e9+7.
 * Dry Run: arr = [1,3,5].
 *   - Odd prefixes yield 4 odd-sum subarrays.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numOfSubarrays = function (arr) {
  const moduloDivider = 1000000007;
  let countEvenPrefixSums = 1;
  let countOddPrefixSums = 0;
  let totalOddSubarrays = 0;
  let currentRunningSum = 0;

  for (let numberValue of arr) {
    currentRunningSum += numberValue;

    if (currentRunningSum % 2 === 1) {
      totalOddSubarrays =
        (totalOddSubarrays + countEvenPrefixSums) % moduloDivider;
      countOddPrefixSums++;
    } else {
      totalOddSubarrays =
        (totalOddSubarrays + countOddPrefixSums) % moduloDivider;
      countEvenPrefixSums++;
    }
  }

  return totalOddSubarrays;
};
