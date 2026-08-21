/**
 * 4 Keys Keyboard
 * Intuition: For i keystrokes, either type one more A, or after some prefix of j keystrokes (with `dpResult[j]` A's on screen) spend 2 keys to Select All + Copy, then paste (i-j-2) extra times for a multiplier of (i-j-1).
 * Approach: 1. `dpResult[p] = dpResult[p-1]+1` as baseline. 2. For `previousPresses` ≤ p-3, take max of `dpResult[previousPresses] * (p - previousPresses - 1)`. 3. Return `dpResult[n]`.
 * Dry Run: n = 7.
 *   - dp[1..6] = 1,2,3,4,5,6. dp[7] = max(7, 2*4, 3*3, 4*2) = 9. Return 9.
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
        currentTotalFromPaste
      );
    }
  }

  return dpResult[n];
};
