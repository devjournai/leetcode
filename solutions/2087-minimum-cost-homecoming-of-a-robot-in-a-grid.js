/**
 * Minimum Cost Homecoming Of A Robot In A Grid
 * Intuition: The movement costs for rows and columns are independent. To reach the home position, the robot must sequentially traverse all intermediate rows and columns from its starting position to the home position, incurring the respective row or column costs for each cell it enters. The order of these moves does not change the total set of cells whose entry costs must be paid. Therefore, the minimum cost is simply the sum of costs for all necessary row and column transitions.
 * Approach: 1. Initialize a variable `currentTotalCost` to zero to accumulate the total cost. 2. Extract the initial row and column coordinates for the robot from `startPos`, and the destination row and column coordinates from `homePos`. 3. Determine the `rowMovementDirection` (1 for down, -1 for up) based on the relative positions of the initial and destination rows. 4. Iterate a `for` loop, starting from the row coordinate immediately after the initial robot's row (in the determined `rowMovementDirection`), and continuing until just before the row coordinate immediately after the destination row. In each iteration, add `rowCosts` for the current `intermediateRowCoord` to `currentTotalCost`. 5. Similarly, determine the `colMovementDirection` (1 for right, -1 for left). 6. Iterate another `for` loop for columns, starting from the column coordinate immediately after the initial robot's column, and continuing until just before the column coordinate immediately after the destination column. In each iteration, add `colCosts` for the current `intermediateColCoord` to `currentTotalCost`. 7. Return the final `currentTotalCost`.
 * Dry Run: Given startPos = [1, 1], homePos = [3, 2], rowCosts = [5, 4, 3, 2], colCosts = [8, 9, 10].
 * 1. `currentTotalCost` is initialized to 0.
 * 2. `initialRobotRow` = 1, `initialRobotColumn` = 1. `destinationRow` = 3, `destinationColumn` = 2.
 * 3. `rowMovementDirection`: Since `initialRobotRow` (1) < `destinationRow` (3), `rowMovementDirection` becomes 1.
 * 4. Row iteration loop:
 *    - `intermediateRowCoord` starts at `initialRobotRow` + `rowMovementDirection` = 1 + 1 = 2.
 *    - Iteration 1: `intermediateRowCoord` = 2. Condition (2 !== `destinationRow` (3) + `rowMovementDirection` (1) => 2 !== 4) is true. `currentTotalCost` += `rowCosts[2]` (which is 3). `currentTotalCost` becomes 3. `intermediateRowCoord` increments to 3.
 *    - Iteration 2: `intermediateRowCoord` = 3. Condition (3 !== 4) is true. `currentTotalCost` += `rowCosts[3]` (which is 2). `currentTotalCost` becomes 3 + 2 = 5. `intermediateRowCoord` increments to 4.
 *    - Iteration 3: `intermediateRowCoord` = 4. Condition (4 !== 4) is false. Loop terminates.
 * 5. `colMovementDirection`: Since `initialRobotColumn` (1) < `destinationColumn` (2), `colMovementDirection` becomes 1.
 * 6. Column iteration loop:
 *    - `intermediateColCoord` starts at `initialRobotColumn` + `colMovementDirection` = 1 + 1 = 2.
 *    - Iteration 1: `intermediateColCoord` = 2. Condition (2 !== `destinationColumn` (2) + `colMovementDirection` (1) => 2 !== 3) is true. `currentTotalCost` += `colCosts[2]` (which is 10). `currentTotalCost` becomes 5 + 10 = 15. `intermediateColCoord` increments to 3.
 *    - Iteration 2: `intermediateColCoord` = 3. Condition (3 !== 3) is false. Loop terminates.
 * 7. The function returns `currentTotalCost` which is 15.
 * Time Complexity: O(abs(homePos[0] - startPos[0]) + abs(homePos[1] - startPos[1]))
 * Space Complexity: O(1)
 */
var minCost = function (startPos, homePos, rowCosts, colCosts) {
  let currentTotalCost = 0;

  const initialRobotRow = startPos[0];
  const initialRobotColumn = startPos[1];

  const destinationRow = homePos[0];
  const destinationColumn = homePos[1];

  const rowMovementDirection = initialRobotRow < destinationRow ? 1 : -1;
  for (
    let intermediateRowCoord = initialRobotRow + rowMovementDirection;
    intermediateRowCoord !== destinationRow + rowMovementDirection;
    intermediateRowCoord += rowMovementDirection
  ) {
    currentTotalCost += rowCosts[intermediateRowCoord];
  }

  const colMovementDirection = initialRobotColumn < destinationColumn ? 1 : -1;
  for (
    let intermediateColCoord = initialRobotColumn + colMovementDirection;
    intermediateColCoord !== destinationColumn + colMovementDirection;
    intermediateColCoord += colMovementDirection
  ) {
    currentTotalCost += colCosts[intermediateColCoord];
  }

  return currentTotalCost;
};
