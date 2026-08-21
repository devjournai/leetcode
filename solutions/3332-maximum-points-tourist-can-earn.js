/**
 * Maximum Points Tourist Can Earn
 * Intuition: Each day the tourist either stays in the current city or travels to another. The best score after k days is the max over cities of a DP that tries both choices.
 * Approach: dp[city] = best score so far ending in that city. For each day, newDp[dest] = max(dp[dest] + stayScore[day][dest], max over curr != dest of dp[curr] + travelScore[curr][dest]).
 * Dry Run: n=2, k=1, stayScore=[[2,3]], travelScore=[[0,5],[6,0]]. Dest 0: stay 2 or travel from 1 -> 6. Dest 1: stay 3 or travel from 0 -> 5. Answer 6.
 * Time Complexity: O(N^2 * K)
 * Space Complexity: O(N)
 */

var maxScore = function (n, k, stayScore, travelScore) {
  let dp = Array(n).fill(0);

  for (let day = 0; day < k; day++) {
    const nextDp = Array(n).fill(0);
    for (let dest = 0; dest < n; dest++) {
      nextDp[dest] = dp[dest] + stayScore[day][dest];
      for (let current = 0; current < n; current++) {
        if (current !== dest) {
          nextDp[dest] = Math.max(
            nextDp[dest],
            dp[current] + travelScore[current][dest]
          );
        }
      }
    }
    dp = nextDp;
  }

  return Math.max(...dp);
};
