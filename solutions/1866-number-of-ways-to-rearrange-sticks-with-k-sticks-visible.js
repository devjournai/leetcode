/**
 * Number Of Ways To Rearrange Sticks With K Sticks Visible
 * Time Complexity: O(n*k)
 * Space Complexity: O(n*k)
 */
var rearrangeSticks = function (nSticksTotal, kVisibleExpected) {
  const modConstant = 1000000007;

  const dpCollection = Array.from({ length: nSticksTotal + 1 }, () =>
    new Array(kVisibleExpected + 1).fill(0),
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
