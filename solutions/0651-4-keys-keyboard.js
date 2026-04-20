/**
 * 4 Keys Keyboard
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var maxA = function (n) {
  const dpResult = new Array(n + 1).fill(0);

  for (let currentPresses = 1; currentPresses <= n; currentPresses++) {
    dpResult[currentPresses] = dpResult[currentPresses - 1] + 1;
    for (
      let previousPresses = 0;
      previousPresses <= currentPresses - 3;
      previousPresses++
    ) {
      const initialScreenCount = dpResult[previousPresses];
      const pasteMultiplier = currentPresses - previousPresses - 1;
      const currentTotalFromPaste = initialScreenCount * pasteMultiplier;
      dpResult[currentPresses] = Math.max(
        dpResult[currentPresses],
        currentTotalFromPaste,
      );
    }
  }

  return dpResult[n];
};
