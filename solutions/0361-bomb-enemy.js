/**
 * Bomb Enemy
 * Intuition: A bomb at an empty cell kills every enemy in its row and column until a wall. Recompute the row kill count only after a wall (or at column 0), and recompute each column’s kill count only after a wall above (or at row 0).
 * Approach: 1. Track `currentRowEnemyCount` and a `columnEnemyCounts` array. 2. At col 0 or after a left wall, scan right until a wall counting 'E'. 3. At row 0 or after an above wall, scan down until a wall counting 'E' into that column. 4. On a '0' cell, update max with row count + column count.
 * Dry Run: grid [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]. Cell (1,1) is '0' after a wall-reset column scan of 1 and a row scan of 1 → 2; later (0,3) and (2,1) reach 3.
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(cols)
 */
var maxKilledEnemies = function (grid) {
  const totalRows = grid.length;
  const totalColumns = grid[0].length;
  const columnEnemyCounts = new Array(totalColumns).fill(0);
  let currentRowEnemyCount = 0;
  let maximumKills = 0;

  for (let currentGridRow = 0; currentGridRow < totalRows; currentGridRow++) {
    for (
      let currentGridColumn = 0;
      currentGridColumn < totalColumns;
      currentGridColumn++
    ) {
      if (
        currentGridColumn === 0 ||
        grid[currentGridRow][currentGridColumn - 1] === "W"
      ) {
        currentRowEnemyCount = 0;
        for (
          let columnTraversal = currentGridColumn;
          columnTraversal < totalColumns &&
          grid[currentGridRow][columnTraversal] !== "W";
          columnTraversal++
        ) {
          if (grid[currentGridRow][columnTraversal] === "E") {
            currentRowEnemyCount++;
          }
        }
      }
      if (
        currentGridRow === 0 ||
        grid[currentGridRow - 1][currentGridColumn] === "W"
      ) {
        columnEnemyCounts[currentGridColumn] = 0;
        for (
          let rowTraversal = currentGridRow;
          rowTraversal < totalRows &&
          grid[rowTraversal][currentGridColumn] !== "W";
          rowTraversal++
        ) {
          if (grid[rowTraversal][currentGridColumn] === "E") {
            columnEnemyCounts[currentGridColumn]++;
          }
        }
      }
      if (grid[currentGridRow][currentGridColumn] === "0") {
        maximumKills = Math.max(
          maximumKills,
          currentRowEnemyCount + columnEnemyCounts[currentGridColumn]
        );
      }
    }
  }

  return maximumKills;
};
