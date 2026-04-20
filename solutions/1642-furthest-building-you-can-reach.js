/**
 * Furthest Building You Can Reach
 * Time Complexity: O(N * log L)
 * Space Complexity: O(L)
 */
var furthestBuilding = function (heights, bricksQuantity, ladderCount) {
  const climbsToConsider = new MinPriorityQueue();
  const totalBuildingCount = heights.length;

  for (
    let currentPosition = 0;
    currentPosition < totalBuildingCount - 1;
    currentPosition++
  ) {
    const nextPosition = currentPosition + 1;
    const heightIncrease = heights[nextPosition] - heights[currentPosition];

    if (heightIncrease > 0) {
      climbsToConsider.push(heightIncrease);

      if (climbsToConsider.size() > ladderCount) {
        const smallestClimbForBricks = climbsToConsider.pop().element;
        bricksQuantity -= smallestClimbForBricks;

        if (bricksQuantity < 0) {
          return currentPosition;
        }
      }
    }
  }

  return totalBuildingCount - 1;
};
