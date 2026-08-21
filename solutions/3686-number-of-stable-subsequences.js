/**
 * Number Of Stable Subsequences
 * Intuition: A subsequence is unstable only if it ends with three equal parities in a row. Track how many stable subsequences end with one vs two consecutive values of each parity.
 * Approach: For each nums[i] with parity p: sequences ending in two p's grow from those ending in one p; sequences ending in one p start new or append to the opposite parity.
 * Dry Run: nums = [1, 3, 5] are all odd. The six proper nonempty subsequences except [1, 3, 5] are counted → 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countStableSubsequences = function (nums) {
  const MOD = 1e9 + 7;
  const endCount = [
    [0, 0],
    [0, 0],
  ];

  for (const value of nums) {
    const parity = value % 2;
    const other = parity ^ 1;
    endCount[parity][1] = (endCount[parity][1] + endCount[parity][0]) % MOD;
    endCount[parity][0] =
      (endCount[parity][0] + 1 + endCount[other][0] + endCount[other][1]) % MOD;
  }

  return (
    (endCount[0][0] + endCount[0][1] + endCount[1][0] + endCount[1][1]) % MOD
  );
};
