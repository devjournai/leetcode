/**
 * Maximum Total Reward Using Operations I
 * Intuition: You may take a reward only if it is strictly greater than the current total. This is a 0-1 knapsack on possible totals up to max(reward)*2.
 * Approach: 1. Unique-sort rewards. 2. Bitset/boolean DP: reachable totals. 3. For each reward r, for totals t < r that are reachable, mark t+r reachable. 4. Return max reachable.
 * Dry Run:
 *   rewardValues = [1,1,3,3] unique 1,3. Take 1 then 3 = 4.
 * Time Complexity: O(N * MAX)
 * Space Complexity: O(MAX)
 */
var maxTotalReward = function (rewardValues) {
  const uniqueRewards = [...new Set(rewardValues)].sort((a, b) => a - b);
  const maxReward = uniqueRewards[uniqueRewards.length - 1];
  const reachable = new Array(2 * maxReward).fill(false);
  reachable[0] = true;
  let maxTotal = 0;
  for (const rewardValue of uniqueRewards) {
    for (
      let currentTotal = rewardValue - 1;
      currentTotal >= 0;
      currentTotal--
    ) {
      if (reachable[currentTotal]) {
        const nextTotal = currentTotal + rewardValue;
        reachable[nextTotal] = true;
        maxTotal = Math.max(maxTotal, nextTotal);
      }
    }
  }
  return maxTotal;
};
