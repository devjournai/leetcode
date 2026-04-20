/**
 * Bomb Enemy
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
    for (let currentGridColumn = 0; currentGridColumn < totalColumns; currentGridColumn++) {
      if (currentGridColumn === 0 || grid[currentGridRow][currentGridColumn - 1] === 'W') {
        currentRowEnemyCount = 0;
        for (let columnTraversal = currentGridColumn; columnTraversal < totalColumns && grid[currentGridRow][columnTraversal] !== 'W'; columnTraversal++) {
          if (grid[currentGridRow][columnTraversal] === 'E') {
            currentRowEnemyCount++;
          }
        }
      }
      if (currentGridRow === 0 || grid[currentGridRow - 1][currentGridColumn] === 'W') {
        columnEnemyCounts[currentGridColumn] = 0;
        for (let rowTraversal = currentGridRow; rowTraversal < totalRows && grid[rowTraversal][currentGridColumn] !== 'W'; rowTraversal++) {
          if (grid[rowTraversal][currentGridColumn] === 'E') {
            columnEnemyCounts[currentGridColumn]++;
          }
        }
      }
      if (grid[currentGridRow][currentGridColumn] === '0') {
        maximumKills = Math.max(maximumKills, currentRowEnemyCount + columnEnemyCounts[currentGridColumn]);
      }
    }
  }

  return maximumKills;
};