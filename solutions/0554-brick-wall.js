/**
 * Brick Wall
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
