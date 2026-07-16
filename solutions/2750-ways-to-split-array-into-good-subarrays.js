/**
 * Ways to Split Array Into Good Subarrays
 *
 * Intuition:
 * Every good subarray must contain exactly one '1'.
 *
 * Therefore:
 *
 * • Every '1' must belong to a different subarray.
 * • The zeros between two consecutive ones determine the number of possible
 *   split positions.
 *
 * If there are:
 *
 *      gap
 *
 * zeros between two consecutive ones,
 * then there are:
 *
 *      gap + 1
 *
 * ways to place the split.
 *
 * Multiply these choices for every consecutive pair of ones.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Collect the indices of all elements equal to 1.
 *
 * 2. If there is no '1',
 *    return 0.
 *
 * 3. Initialize:
 *
 *      answer = 1
 *
 * 4. For every pair of consecutive ones:
 *
 *      gap = currentIndex - previousIndex - 1
 *
 *      answer *= (gap + 1)
 *
 *      Take modulo 1e9+7.
 *
 * 5. Return the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [0,1,0,0,1]
 *
 * One positions:
 *
 * 1
 * 4
 *
 * Gap:
 *
 * 4 - 1 - 1 = 2
 *
 * Ways:
 *
 * 2 + 1 = 3
 *
 * Answer = 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */

var numberOfGoodSubarraySplits = function (nums) {
  const MOD = 1000000007n;

  const ones = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      ones.push(i);
    }
  }

  if (ones.length === 0) {
    return 0;
  }

  let answer = 1n;

  for (let i = 1; i < ones.length; i++) {
    const gap = ones[i] - ones[i - 1] - 1;

    answer = (answer * BigInt(gap + 1)) % MOD;
  }

  return Number(answer);
};
