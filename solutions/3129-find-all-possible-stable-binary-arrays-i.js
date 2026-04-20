/**
 * Find All Possible Stable Binary Arrays I
 * Time Complexity: O(zero * one * limit)
 * Space Complexity: O(zero * one * limit)
 */
var numberOfStableArrays = function (zero, one, limit) {
  const MOD = 1e9 + 7;

  const dp = Array(zero + 1)
    .fill(0)
    .map(() =>
      Array(one + 1)
        .fill(0)
        .map(() =>
          Array(2)
            .fill(0)
            .map(() => Array(limit + 1).fill(0)),
        ),
    );

  const sumDp = Array(zero + 1)
    .fill(0)
    .map(() =>
      Array(one + 1)
        .fill(0)
        .map(() => Array(2).fill(0)),
    );

  for (let i = 1; i <= limit; i++) {
    if (i <= zero) {
      dp[i][0][0][i] = 1;
      sumDp[i][0][0] = 1;
    }
  }

  for (let j = 1; j <= limit; j++) {
    if (j <= one) {
      dp[0][j][1][j] = 1;
      sumDp[0][j][1] = 1;
    }
  }

  for (let i = 0; i <= zero; i++) {
    for (let j = 0; j <= one; j++) {
      if (i === 0 && j === 0) continue;
      if (i === 0 || j === 0) continue;

      dp[i][j][0][1] = (dp[i][j][0][1] + sumDp[i - 1][j][1]) % MOD;

      for (let k_prev = 1; k_prev <= limit - 1; k_prev++) {
        dp[i][j][0][k_prev + 1] =
          (dp[i][j][0][k_prev + 1] + dp[i - 1][j][0][k_prev]) % MOD;
      }

      sumDp[i][j][0] = 0;
      for (let k = 1; k <= limit; k++) {
        sumDp[i][j][0] = (sumDp[i][j][0] + dp[i][j][0][k]) % MOD;
      }

      dp[i][j][1][1] = (dp[i][j][1][1] + sumDp[i][j - 1][0]) % MOD;

      for (let k_prev = 1; k_prev <= limit - 1; k_prev++) {
        dp[i][j][1][k_prev + 1] =
          (dp[i][j][1][k_prev + 1] + dp[i][j - 1][1][k_prev]) % MOD;
      }

      sumDp[i][j][1] = 0;
      for (let k = 1; k <= limit; k++) {
        sumDp[i][j][1] = (sumDp[i][j][1] + dp[i][j][1][k]) % MOD;
      }
    }
  }

  let totalWays = (sumDp[zero][one][0] + sumDp[zero][one][1]) % MOD;

  return totalWays;
};
