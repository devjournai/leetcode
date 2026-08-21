/**
 * Inverse Coin Change
 * Intuition: Rebuild coins from small amounts up. At amount a, dp[a] is the number of ways using already chosen smaller coins. If the given ways equal dp[a], a is not a coin; if they equal dp[a]+1, a must be a coin; otherwise impossible.
 * Approach: 1. dp[0]=1. 2. For a=1..n compare numWays[a-1] to dp[a]. 3. On +1, append coin a and run unbounded knapsack. 4. Return coins or [].
 * Dry Run: numWays = [0,1,0,2] (amounts 1..4). a=1: dp=0 matches 0. a=2: 0 vs 1 → coin 2, update dp. a=3: 0. a=4: dp becomes 2. Coins [2,4].
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var findCoins = function (numWays) {
  const n = numWays.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  const coins = [];

  for (let amount = 1; amount <= n; amount++) {
    const want = numWays[amount - 1];
    if (dp[amount] === want) {
      continue;
    }
    if (dp[amount] + 1 === want) {
      coins.push(amount);
      for (let x = amount; x <= n; x++) {
        dp[x] += dp[x - amount];
      }
    } else {
      return [];
    }
  }

  return coins;
};
