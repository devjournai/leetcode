/**
 * Dungeon Game
 * Intuition: Work backwards from the princess: each cell stores the minimum HP you must have *before* entering it so you can still reach the end with at least 1 HP. Take the cheaper of right/down, then subtract this cell's dungeon value (clamped to at least 1).
 * Approach: 1. Build a dp table of the same size. 2. Fill from bottom-right to top-left. 3. Princess cell: max(1, 1 - dungeon[r][c]). 4. Otherwise min(right, down) of neighbors (Infinity if off-grid), then max(1, that - dungeon[r][c]). 5. Return dp[0][0].
 * Dry Run: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]].
 *   - Bottom-right: max(1, 1-(-5)) = 6.
 *   - Cell [1][2] (value 1): next is 6, max(1, 6-1)=5.
 *   - Eventually dp[0][0] = 7.
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var calculateMinimumHP = function (dungeonMatrix) {
  const totalRows = dungeonMatrix.length;
  const totalColumns = dungeonMatrix[0].length;

  const minimumHealthTable = Array(totalRows)
    .fill(0)
    .map(() => Array(totalColumns).fill(0));

  for (
    let currentRowIdentifier = totalRows - 1;
    currentRowIdentifier >= 0;
    currentRowIdentifier--
  ) {
    for (
      let currentColumnIdentifier = totalColumns - 1;
      currentColumnIdentifier >= 0;
      currentColumnIdentifier--
    ) {
      if (
        currentRowIdentifier === totalRows - 1 &&
        currentColumnIdentifier === totalColumns - 1
      ) {
        minimumHealthTable[currentRowIdentifier][currentColumnIdentifier] =
          Math.max(
            1,
            1 - dungeonMatrix[currentRowIdentifier][currentColumnIdentifier]
          );
      } else {
        let healthNeededMovingRight = Infinity;
        if (currentColumnIdentifier + 1 < totalColumns) {
          healthNeededMovingRight =
            minimumHealthTable[currentRowIdentifier][
              currentColumnIdentifier + 1
            ];
        }

        let healthNeededMovingDown = Infinity;
        if (currentRowIdentifier + 1 < totalRows) {
          healthNeededMovingDown =
            minimumHealthTable[currentRowIdentifier + 1][
              currentColumnIdentifier
            ];
        }

        let nextPathMinimumHealth = Math.min(
          healthNeededMovingRight,
          healthNeededMovingDown
        );
        minimumHealthTable[currentRowIdentifier][currentColumnIdentifier] =
          Math.max(
            1,
            nextPathMinimumHealth -
              dungeonMatrix[currentRowIdentifier][currentColumnIdentifier]
          );
      }
    }
  }

  return minimumHealthTable[0][0];
};
