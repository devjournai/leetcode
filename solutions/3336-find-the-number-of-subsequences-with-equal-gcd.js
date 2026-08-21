/**
 * Find the Number of Subsequences With Equal GCD
 *
 * Intuition:
 * Each number has three choices:
 *
 * • Do not include it.
 * • Put it into the first subsequence.
 * • Put it into the second subsequence.
 *
 * While processing the numbers, we only need to know the current GCD of both
 * subsequences.
 *
 * Since every value is at most 200, there are only:
 *
 *      201 × 201
 *
 * possible GCD states.
 *
 * Dynamic Programming is used where each state represents:
 *
 *      (gcd of first subsequence,
 *       gcd of second subsequence)
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Precompute the gcd for every pair:
 *
 *      gcdTable[a][b]
 *
 *      where
 *
 *      0 ≤ a,b ≤ 200.
 *
 *      Here,
 *
 *      gcd(0,x)=x
 *
 *      because an empty subsequence has GCD 0.
 *
 * 2. Define DP:
 *
 *      dp[g1][g2]
 *
 *      =
 *      number of ways after processing some elements where:
 *
 *      g1 = GCD of first subsequence
 *      g2 = GCD of second subsequence
 *
 * 3. Initialize:
 *
 *      dp[0][0] = 1
 *
 * 4. For every number x:
 *
 *      For every DP state:
 *
 *      Option 1:
 *          Ignore x.
 *
 *      Option 2:
 *          Put x into first subsequence.
 *
 *          newGcd1 =
 *          gcd(g1,x)
 *
 *      Option 3:
 *          Put x into second subsequence.
 *
 *          newGcd2 =
 *          gcd(g2,x)
 *
 * 5. Store all transitions into the next DP table.
 *
 * 6. After all numbers are processed,
 *    every valid answer satisfies:
 *
 *      gcd1 == gcd2
 *      and gcd > 0
 *
 * 7. Sum all such states.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [2,4]
 *
 * Initial:
 *
 * dp[0][0] = 1
 *
 * ----------------
 *
 * Process 2:
 *
 * (0,0)
 *
 * →
 *
 * (0,0)
 *
 * (2,0)
 *
 * (0,2)
 *
 * ----------------
 *
 * Process 4:
 *
 * (2,0)
 *
 * →
 *
 * (2,0)
 *
 * (2,0)
 *
 * (2,4)
 *
 * ...
 *
 * Final answer:
 *
 * Sum all states where
 *
 * gcd1 == gcd2 > 0
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × 201²)
 * Space Complexity: O(201²)
 */
var subsequencePairCount = function (nums) {
  const MOD = 1e9 + 7;
  const MAX = 200;

  const gcd = (a, b) => {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const gcdTable = Array.from(
    { length: MAX + 1 },
    () => new Int32Array(MAX + 1)
  );
  for (let i = 0; i <= MAX; i++) {
    for (let j = 0; j <= MAX; j++) {
      if (i === 0) gcdTable[i][j] = j;
      else if (j === 0) gcdTable[i][j] = i;
      else gcdTable[i][j] = gcd(i, j);
    }
  }

  let dp = new Int32Array(201 * 201);
  dp[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    let next_dp = new Int32Array(201 * 201);

    for (let j = 0; j < 40401; j++) {
      if (dp[j] > 0) {
        let ways = dp[j];
        let g1 = Math.floor(j / 201);
        let g2 = j % 201;

        next_dp[j] = (next_dp[j] + ways) % MOD;

        let ng1 = gcdTable[g1][x];
        let idx1 = ng1 * 201 + g2;
        next_dp[idx1] = (next_dp[idx1] + ways) % MOD;

        let ng2 = gcdTable[g2][x];
        let idx2 = g1 * 201 + ng2;
        next_dp[idx2] = (next_dp[idx2] + ways) % MOD;
      }
    }
    dp = next_dp;
  }

  let ans = 0;

  for (let g = 1; g <= MAX; g++) {
    ans = (ans + dp[g * 201 + g]) % MOD;
  }

  return ans;
};
