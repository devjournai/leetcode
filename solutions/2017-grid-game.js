/**
 * Grid Game
 * Intuition: The first robot minimizes the second robot's score. The second robot maximizes its score. For any chosen path of the first robot, the matrix is modified. The first robot's path involves moving right in row 0 up to a column 'i', then moving down to (1,i), then moving right in row 1 to (1, n-1). This clears points in `grid[0][0...i]` and `grid[1][i...n-1]`. The remaining points for the second robot are effectively the sum of `grid[0][i+1...n-1]` (top-right portion) and `grid[1][0...i-1]` (bottom-left portion). The second robot, playing optimally, will choose a path that collects the maximum of these two sums. The first robot's optimal strategy is to choose 'i' such that this maximum value is minimized.
 * Approach: 1. Initialize `minimumSecondRobotPoints` to infinity. 2. Calculate the total sum of points in `grid[0]` and store it in `firstRowTotalPoints`. 3. Initialize `secondRowAccumulatedPoints` to 0. 4. Iterate through each column `currentColumnIndex` from 0 to `n-1`. This `currentColumnIndex` represents the column where the first robot moves from row 0 to row 1. 5. For the current `currentColumnIndex`, subtract `grid[0][currentColumnIndex]` from `firstRowTotalPoints`. At this point, `firstRowTotalPoints` holds the sum of points `grid[0][currentColumnIndex+1...n-1]`. 6. Calculate `currentMaxPointsForSecondRobot` as the maximum of `firstRowTotalPoints` and `secondRowAccumulatedPoints`. 7. Update `minimumSecondRobotPoints` with `Math.min(minimumSecondRobotPoints, currentMaxPointsForSecondRobot)`. 8. Add `grid[1][currentColumnIndex]` to `secondRowAccumulatedPoints`. At this point, `secondRowAccumulatedPoints` holds the sum of points `grid[1][0...currentColumnIndex]`. This `secondRowAccumulatedPoints` will be used for the next iteration (i.e., when `currentColumnIndex + 1` is the turn point). 9. After the loop completes, `minimumSecondRobotPoints` will hold the final result.
 * Dry Run: grid = [[2,5,4],[1,8,7]]
 * n = 3
 * minimumSecondRobotPoints = Infinity
 * firstRowTotalPoints = 2+5+4 = 11
 * secondRowAccumulatedPoints = 0
 *
 * currentColumnIndex = 0:
 *   firstRowTotalPoints = 11 - grid[0][0] = 11 - 2 = 9
 *   currentMaxPointsForSecondRobot = Math.max(9, 0) = 9
 *   minimumSecondRobotPoints = Math.min(Infinity, 9) = 9
 *   secondRowAccumulatedPoints = 0 + grid[1][0] = 0 + 1 = 1
 *
 * currentColumnIndex = 1:
 *   firstRowTotalPoints = 9 - grid[0][1] = 9 - 5 = 4
 *   currentMaxPointsForSecondRobot = Math.max(4, 1) = 4
 *   minimumSecondRobotPoints = Math.min(9, 4) = 4
 *   secondRowAccumulatedPoints = 1 + grid[1][1] = 1 + 8 = 9
 *
 * currentColumnIndex = 2:
 *   firstRowTotalPoints = 4 - grid[0][2] = 4 - 4 = 0
 *   currentMaxPointsForSecondRobot = Math.max(0, 9) = 9
 *   minimumSecondRobotPoints = Math.min(4, 9) = 4
 *   secondRowAccumulatedPoints = 9 + grid[1][2] = 9 + 7 = 16
 *
 * Loop ends.
 * Return minimumSecondRobotPoints = 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var gridGame = function (gridParam) {
  let minimumSecondRobotPoints = Infinity;
  let firstRowTotalPoints = gridParam[0].reduce(
    (accumulatorValue, currentValue) => accumulatorValue + currentValue,
    0,
  );
  let secondRowAccumulatedPoints = 0;
  let numberOfGridColumns = gridParam[0].length;

  for (
    let currentColumnIndex = 0;
    currentColumnIndex < numberOfGridColumns;
    currentColumnIndex++
  ) {
    firstRowTotalPoints -= gridParam[0][currentColumnIndex];
    let currentMaxPointsForSecondRobot = Math.max(
      firstRowTotalPoints,
      secondRowAccumulatedPoints,
    );
    minimumSecondRobotPoints = Math.min(
      minimumSecondRobotPoints,
      currentMaxPointsForSecondRobot,
    );
    secondRowAccumulatedPoints += gridParam[1][currentColumnIndex];
  }

  return minimumSecondRobotPoints;
};
