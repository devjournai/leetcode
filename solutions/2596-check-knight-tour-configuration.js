/**
 * Check Knight Tour Configuration
 * Intuition: A valid knight's tour means the knight visits every cell in a specific order, starting with 0. We can reconstruct this order by mapping each visited step `k` to its `[row, column]` coordinates. Then, we verify if each sequential move (from step `k-1` to step `k`) is a legitimate knight's move.
 * Approach: 1. Store the coordinates of each step `k` in a lookup array. 2. Define all 8 possible knight move offsets and put them into a set for efficient lookup. 3. Check if the starting cell `grid[0][0]` is indeed 0. 4. Iterate from step 1 up to `N*N - 1`, fetching the coordinates for the previous and current steps. 5. Calculate the row and column differences and check if this difference pair exists in the set of valid knight move offsets. If any check fails, return `false`. If all checks pass, return `true`.
 * Dry Run:
 * grid = [[0, 3, 2], [5, 8, 1], [6, 7, 4]]
 * dimensionN = 3
 *
 * 1. Initial check: grid[0][0] is 0. Condition passes.
 * 2. `validMovementKeys` (Set of strings): {"-2,-1", "-2,1", "-1,-2", "-1,2", "1,-2", "1,2", "2,-1", "2,1"}
 * 3. `stepCoordinatesStore` (Array of size 9):
 *    - Iterating grid to populate:
 *      grid[0][0]=0 -> stepCoordinatesStore[0] = [0,0]
 *      grid[0][1]=3 -> stepCoordinatesStore[3] = [0,1]
 *      grid[0][2]=2 -> stepCoordinatesStore[2] = [0,2]
 *      grid[1][0]=5 -> stepCoordinatesStore[5] = [1,0]
 *      grid[1][1]=8 -> stepCoordinatesStore[8] = [1,1]
 *      grid[1][2]=1 -> stepCoordinatesStore[1] = [1,2]
 *      grid[2][0]=6 -> stepCoordinatesStore[6] = [2,0]
 *      grid[2][1]=7 -> stepCoordinatesStore[7] = [2,1]
 *      grid[2][2]=4 -> stepCoordinatesStore[4] = [2,2]
 *    `stepCoordinatesStore` becomes: [[0,0], [1,2], [0,2], [0,1], [2,2], [1,0], [2,0], [2,1], [1,1]]
 *
 * 4. Main validation loop (`currentStepSequence` from 1 to 8):
 *    - `currentStepSequence = 1`:
 *      `previousSquare = stepCoordinatesStore[0]` = `[0,0]`
 *      `currentSquare = stepCoordinatesStore[1]` = `[1,2]`
 *      `rowDifference = 1 - 0 = 1`
 *      `colDifference = 2 - 0 = 2`
 *      `movementKey = "1,2"`. `validMovementKeys.has("1,2")` is `true`. Continue.
 *    - `currentStepSequence = 2`:
 *      `previousSquare = stepCoordinatesStore[1]` = `[1,2]`
 *      `currentSquare = stepCoordinatesStore[2]` = `[0,2]`
 *      `rowDifference = 0 - 1 = -1`
 *      `colDifference = 2 - 2 = 0`
 *      `movementKey = "-1,0"`. `validMovementKeys.has("-1,0")` is `false`.
 *      Return `false`.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var checkValidGrid = function (grid) {
  const dimensionN = grid.length;

  if (grid[0][0] !== 0) {
    return false;
  }

  const validMovementKeys = new Set([
    "-2,-1",
    "-2,1",
    "-1,-2",
    "-1,2",
    "1,-2",
    "1,2",
    "2,-1",
    "2,1",
  ]);

  const totalCells = dimensionN * dimensionN;
  const stepCoordinatesStore = new Array(totalCells);

  for (let currentGridRow = 0; currentGridRow < dimensionN; currentGridRow++) {
    for (
      let currentGridCol = 0;
      currentGridCol < dimensionN;
      currentGridCol++
    ) {
      const stepValue = grid[currentGridRow][currentGridCol];
      stepCoordinatesStore[stepValue] = [currentGridRow, currentGridCol];
    }
  }

  for (
    let currentStepSequence = 1;
    currentStepSequence < totalCells;
    currentStepSequence++
  ) {
    const previousSquare = stepCoordinatesStore[currentStepSequence - 1];
    const currentSquare = stepCoordinatesStore[currentStepSequence];

    const previousRowCoord = previousSquare[0];
    const previousColCoord = previousSquare[1];
    const currentRowCoord = currentSquare[0];
    const currentColCoord = currentSquare[1];

    const rowDifference = currentRowCoord - previousRowCoord;
    const colDifference = currentColCoord - previousColCoord;

    const movementKey = `${rowDifference},${colDifference}`;

    if (!validMovementKeys.has(movementKey)) {
      return false;
    }
  }

  return true;
};
