/**
 * Furthest Building You Can Reach
 * Intuition: Assign ladders to the largest climbs. A min-heap of climbs so far; when it exceeds ladderCount, pay the smallest climb with bricks. Stop when bricks go negative.
 * Approach: 1. For each positive height gap, push it on the min-heap. 2. If heap size > ladders, pop the smallest gap and subtract it from bricks. 3. If bricks < 0, return the current index. 4. If the loop finishes, return n-1.
 * Dry Run: heights=[4,2,7,6,9], bricks=10, ladders=1.
 *   - Climbs 5 then 3; ladder takes 5, bricks cover 3 → reach the end (index 4).
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
