/**
 * Maximize Area of Square Hole in Grid
 *
 * Intuition:
 *
 * We have horizontal bars and vertical bars.
 *
 * If we remove consecutive bars, they create a larger gap.
 *
 * For example:
 *
 *     hBars = [2, 3, 4]
 *
 * These are 3 consecutive bars.
 *
 * Removing them creates a hole with side:
 *
 *     3 + 1 = 4
 *
 * So:
 *
 *     side = number of consecutive removed bars + 1
 *
 * We need a SQUARE, so the side length is limited by the
 * smaller of the maximum horizontal and vertical gaps.
 *
 * Therefore:
 *
 *     horizontalSide = max consecutive hBars + 1
 *     verticalSide   = max consecutive vBars + 1
 *
 *     side = Math.min(horizontalSide, verticalSide)
 *
 * Finally:
 *
 *     area = side * side
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 * hBars = [2, 3, 4]
 * vBars = [1, 2]
 *
 * Horizontal:
 *
 *     2, 3, 4
 *     ↑ 3 consecutive bars
 *
 *     horizontalSide = 3 + 1 = 4
 *
 * Vertical:
 *
 *     1, 2
 *     ↑ 2 consecutive bars
 *
 *     verticalSide = 2 + 1 = 3
 *
 * The largest square side is:
 *
 *     min(4, 3) = 3
 *
 * Therefore:
 *
 *     area = 3 * 3 = 9
 *
 * ------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort horizontal bars.
 * 2. Find the longest consecutive sequence.
 * 3. Add 1 to get the maximum horizontal side.
 * 4. Do the same for vertical bars.
 * 5. Take the smaller side.
 * 6. Return side * side.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(H log H + V log V)
 * Space Complexity: O(1)
 */

var maximizeSquareHoleArea = function (n, m, hBars, vBars) {
  const maxHSide = getMaxSide(hBars);

  const maxVSide = getMaxSide(vBars);
  const side = Math.min(maxHSide, maxVSide);

  return side * side;
};

function getMaxSide(bars) {
  bars.sort((a, b) => a - b);

  let maxConsecutiveLength = 1;
  let currentConsecutiveLength = 1;

  for (let i = 1; i < bars.length; i++) {
    if (bars[i] === bars[i - 1] + 1) {
      currentConsecutiveLength++;
    } else {
      currentConsecutiveLength = 1;
    }

    maxConsecutiveLength = Math.max(
      maxConsecutiveLength,
      currentConsecutiveLength,
    );
  }

  return maxConsecutiveLength + 1;
}
