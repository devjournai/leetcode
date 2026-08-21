/**
 * Number Of Ways To Rearrange Sticks With K Sticks Visible
 * Intuition: Place the tallest of the first i sticks: put it at the front (always visible) or among the other i−1 positions (hidden). dp[i][j] = ways with i sticks and j visible.
 * Approach: 1. dp[0][0]=1. 2. dp[i][j] += dp[i-1][j-1] (tallest in front) + dp[i-1][j]*(i-1) (tallest not in front). 3. Mod 1e9+7. Return dp[n][k].
 * Dry Run: n=3, k=2. Ways: 2 (e.g. 1,3,2 and 2,3,1). Return 2.
 * Time Complexity: O(n*k)
 * Space Complexity: O(n*k)
 */
var rearrangeSticks = function (nSticksTotal, kVisibleExpected) {
  const modConstant = 1000000007;

  const dpCollection = Array.from({ length: nSticksTotal + 1 }, () =>
    new Array(kVisibleExpected + 1).fill(0)
  );

  dpCollection[0][0] = 1;

  for (
    let currentStickCount = 1;
    currentStickCount <= nSticksTotal;
    currentStickCount++
  ) {
    for (
      let currentVisibleSticks = 0;
      currentVisibleSticks <= kVisibleExpected;
      currentVisibleSticks++
    ) {
      if (currentVisibleSticks > currentStickCount) {
        continue;
      }

      if (currentVisibleSticks > 0) {
        dpCollection[currentStickCount][currentVisibleSticks] =
          (dpCollection[currentStickCount][currentVisibleSticks] +
            dpCollection[currentStickCount - 1][currentVisibleSticks - 1]) %
          modConstant;
      }

      dpCollection[currentStickCount][currentVisibleSticks] =
        (dpCollection[currentStickCount][currentVisibleSticks] +
          dpCollection[currentStickCount - 1][currentVisibleSticks] *
            (currentStickCount - 1)) %
        modConstant;
    }
  }

  return dpCollection[nSticksTotal][kVisibleExpected];
};
