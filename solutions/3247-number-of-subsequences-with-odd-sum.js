/**
 * Number of Subsequences with Odd Sum
 * Intuition: A subsequence sum is odd iff it contains an odd number of odd elements. Track how many subsequences have even vs odd sum while appending each number.
 * Approach: 1. evenCount/oddCount are running totals modulo 1e9+7. 2. Append an even number: both parities stay the same and the singleton even subsequence is added to evenCount. 3. Append an odd number: parities swap, plus the singleton odd subsequence. Return oddCount.
 * Dry Run: nums = [1, 2, 3]. After 1: odd=1 even=0. After 2: odd=2 even=1. After 3: odd=4 even=3. Odd subsequences: [1], [1,2], [3], [2,3]. Answer 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var subsequenceCount = function (nums) {
  const MOD = 1e9 + 7;
  let evenSubsequenceCount = 0;
  let oddSubsequenceCount = 0;

  for (const number of nums) {
    if (number % 2 === 0) {
      evenSubsequenceCount =
        (evenSubsequenceCount + evenSubsequenceCount + 1) % MOD;
      oddSubsequenceCount = (oddSubsequenceCount + oddSubsequenceCount) % MOD;
    } else {
      const nextEvenSubsequenceCount =
        (evenSubsequenceCount + oddSubsequenceCount) % MOD;
      oddSubsequenceCount =
        (oddSubsequenceCount + evenSubsequenceCount + 1) % MOD;
      evenSubsequenceCount = nextEvenSubsequenceCount;
    }
  }

  return oddSubsequenceCount % MOD;
};
