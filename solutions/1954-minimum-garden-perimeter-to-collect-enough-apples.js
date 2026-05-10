/**
 * Minimum Garden Perimeter To Collect Enough Apples
 * Intuition: The number of apples within an axis-aligned square plot centered at (0,0) with coordinates from -k to k (perimeter 8k) can be calculated using a derived formula: 2 * k * (k + 1) * (2 * k + 1). Since this count is monotonically increasing with k, we can find the minimum k that satisfies the required apple count through an iterative search.
 * Approach: 1. Initialize a variable `currentSideParameter` to 0, representing the 'k' value for the square. 2. Initialize `applesInCurrentPlot` to 0. 3. Enter an infinite loop. 4. Inside the loop, first check if `applesInCurrentPlot` is greater than or equal to `neededApplesAmount`. If true, the current `currentSideParameter` is the minimum required value, so break the loop. 5. If not enough apples, increment `currentSideParameter` by 1. 6. Recalculate `applesInCurrentPlot` using the formula `2 * currentSideParameter * (currentSideParameter + 1) * (2 * currentSideParameter + 1)`. 7. After the loop, return `8 * currentSideParameter` as the minimum perimeter.
 * Dry Run: neededApplesAmount = 12
 *   Initialize currentSideParameter = 0, applesInCurrentPlot = 0.
 *   Loop 1:
 *     Is 0 >= 12? No.
 *     currentSideParameter becomes 1.
 *     applesInCurrentPlot = 2 * 1 * (1 + 1) * (2 * 1 + 1) = 2 * 1 * 2 * 3 = 12.
 *   Loop 2:
 *     Is 12 >= 12? Yes.
 *     Break loop.
 *   Return 8 * currentSideParameter = 8 * 1 = 8.
 *
 * Dry Run: neededApplesAmount = 0
 *   Initialize currentSideParameter = 0, applesInCurrentPlot = 0.
 *   Loop 1:
 *     Is 0 >= 0? Yes.
 *     Break loop.
 *   Return 8 * currentSideParameter = 8 * 0 = 0.
 * Time Complexity: O((neededApplesAmount)^(1/3))
 * Space Complexity: O(1)
 */
var minimumPerimeter = function (neededApplesAmount) {
  let currentSideParameter = 0;
  let applesInCurrentPlot = 0;

  for (;;) {
    if (applesInCurrentPlot >= neededApplesAmount) {
      break;
    }

    currentSideParameter++;
    applesInCurrentPlot =
      2 *
      currentSideParameter *
      (currentSideParameter + 1) *
      (2 * currentSideParameter + 1);
  }

  return 8 * currentSideParameter;
};
