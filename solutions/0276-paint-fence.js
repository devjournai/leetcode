/**
 * Paint Fence
 * Intuition: At most two adjacent posts can share a color. Ways to paint post i depend only on whether posts i-1 and i-2 match, so two running counts suffice.
 * Approach: 1. n=0 → 0; n=1 → k. 2. Initialize sameColor = k and differentColor = k*(k-1) for two posts. 3. For posts 3..n: next same = previous different; next different = (same + different)*(k-1). 4. Return their sum.
 * Dry Run: n = 3, k = 2.
 *   - same=2, different=2. Post 3: same becomes 2, different becomes (2+2)*1=4.
 *   - Return 2+4=6.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numWays = function (n, k) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return k;
  }

  let countSameColor = k;
  let countDifferentColor = k * (k - 1);

  for (let postIndex = 3; postIndex <= n; postIndex++) {
    let previousSameColorCount = countSameColor;
    countSameColor = countDifferentColor;
    countDifferentColor =
      (previousSameColorCount + countDifferentColor) * (k - 1);
  }

  return countSameColor + countDifferentColor;
};
