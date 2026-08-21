/**
 * Brick Wall
 * Intuition: A vertical line through the fewest bricks is a line through the most interior gaps. Count gap x-positions (prefix widths excluding the last brick) and return rows minus the max frequency.
 * Approach: 1. Map prefix width → count. 2. For each row, accumulate brick widths except the last; increment that prefix in the map and track `maximumLinePasses`. 3. Return `totalRowCount - maximumLinePasses`.
 * Dry Run: wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]].
 *   - Gap at x=4 appears in 4 rows (max). 6-4 = 2 bricks crossed.
 * Time Complexity: O(N * K)
 * Space Complexity: O(W)
 */
var leastBricks = function (wall) {
  const gapPositionFrequencies = new Map();
  let maximumLinePasses = 0;
  const totalRowCount = wall.length;

  for (let rowIndex = 0; rowIndex < totalRowCount; ++rowIndex) {
    const currentRowBricks = wall[rowIndex];
    let currentCumulativeWidth = 0;

    for (
      let brickIndex = 0;
      brickIndex < currentRowBricks.length - 1;
      ++brickIndex
    ) {
      currentCumulativeWidth += currentRowBricks[brickIndex];
      const priorCount =
        gapPositionFrequencies.get(currentCumulativeWidth) || 0;
      const updatedCount = priorCount + 1;
      gapPositionFrequencies.set(currentCumulativeWidth, updatedCount);
      maximumLinePasses = Math.max(maximumLinePasses, updatedCount);
    }
  }

  return totalRowCount - maximumLinePasses;
};
