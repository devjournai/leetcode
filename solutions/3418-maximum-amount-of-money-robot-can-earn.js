/**
 * Maximum Amount of Money Robot Can Earn
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var maximumAmount = function (coins) {
  const m = coins.length;
  const n = coins[0].length;

  const dp = Array(m)
    .fill(null)
    .map(() =>
      Array(n)
        .fill(null)
        .map(() => Array(3).fill(-Infinity)),
    );

  const initialCoins = coins[0][0];

  dp[0][0][0] = initialCoins;

  if (initialCoins < 0) {
    dp[0][0][1] = 0;
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      const currentVal = coins[i][j];

      for (let k = 0; k <= 2; k++) {
        let profitWithoutNeutralizingCurrent = -Infinity;

        if (i > 0 && dp[i - 1][j][k] !== -Infinity) {
          profitWithoutNeutralizingCurrent = Math.max(
            profitWithoutNeutralizingCurrent,
            dp[i - 1][j][k],
          );
        }

        if (j > 0 && dp[i][j - 1][k] !== -Infinity) {
          profitWithoutNeutralizingCurrent = Math.max(
            profitWithoutNeutralizingCurrent,
            dp[i][j - 1][k],
          );
        }

        if (profitWithoutNeutralizingCurrent !== -Infinity) {
          dp[i][j][k] = Math.max(
            dp[i][j][k],
            profitWithoutNeutralizingCurrent + currentVal,
          );
        }

        if (currentVal < 0 && k > 0) {
          let profitWithNeutralizingCurrent = -Infinity;

          if (i > 0 && dp[i - 1][j][k - 1] !== -Infinity) {
            profitWithNeutralizingCurrent = Math.max(
              profitWithNeutralizingCurrent,
              dp[i - 1][j][k - 1],
            );
          }

          if (j > 0 && dp[i][j - 1][k - 1] !== -Infinity) {
            profitWithNeutralizingCurrent = Math.max(
              profitWithNeutralizingCurrent,
              dp[i][j - 1][k - 1],
            );
          }

          if (profitWithNeutralizingCurrent !== -Infinity) {
            dp[i][j][k] = Math.max(
              dp[i][j][k],
              profitWithNeutralizingCurrent + 0,
            );
          }
        }
      }
    }
  }

  return Math.max(
    dp[m - 1][n - 1][0],
    dp[m - 1][n - 1][1],
    dp[m - 1][n - 1][2],
  );
};
