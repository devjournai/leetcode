/**
 * Maximum Total Reward Using Operations II
 * Intuition: Same as 3180: a reward `x` can be taken only when the running total is < x, so the max total is < 2 * max(x). A bitset of achievable sums expands by masking bits below `x` and shifting.
 * Approach: 1. Same as 3180. 2. Sort rewards, maintain BigInt bitset `dp` of achievable totals. 3. For each `num`, OR in `(dp & ((1 << num) - 1)) << num`. 4. Return the index of the highest set bit.
 * Dry Run: rewardValues = [1, 6, 4, 3]
 *   After processing 1,3,4,6 the highest achievable total is 11
 * Time Complexity: O(n log n + n * maxReward / word)
 * Space Complexity: O(maxReward)
 */
var maxTotalReward = function (rewardValues) {
  let dp = 1n;

  rewardValues.sort((a, b) => a - b);

  for (const num of rewardValues) {
    const smallerNums = dp & ((1n << BigInt(num)) - 1n);
    dp |= smallerNums << BigInt(num);
  }

  return dp.toString(2).length - 1;
};
