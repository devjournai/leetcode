/**
 * Count Total Number Of Colored Cells
 * Intuition: The colored cells form an expanding diamond shape. For `n=1`, it's a single cell. For `n>1`, each minute, a new layer of cells is colored around the previous diamond. The number of cells added in minute `n` corresponds to the perimeter of the diamond formed in minute `n-1`. This perimeter increases linearly, leading to a quadratic growth in total cells.
 * Approach: 1. Observe the growth pattern of colored cells for small values of `n` (n=1, 2, 3). 2. Identify the shape as a diamond and recognize that each subsequent minute adds a new "layer" around the previous shape. 3. Derive a recurrence relation by noting the number of cells added at each step, and then convert it into a direct mathematical formula for `n`.
 * Dry Run: n = 3
 * 1. `initialColoredCells = 1`
 * 2. `scalingFactor = 2`
 * 3. `currentNValue = 3`
 * 4. `previousNValue = currentNValue - 1 = 3 - 1 = 2`
 * 5. `intermediateProduct = scalingFactor * currentNValue * previousNValue = 2 * 3 * 2 = 12`
 * 6. `finalCount = initialColoredCells + intermediateProduct = 1 + 12 = 13`
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var coloredCells = function (n) {
  const initialColoredCells = 1;
  const scalingFactor = 2;
  const currentNValue = n;
  const previousNValue = n - 1;
  const intermediateProduct = scalingFactor * currentNValue * previousNValue;
  const finalCount = initialColoredCells + intermediateProduct;
  return finalCount;
};
