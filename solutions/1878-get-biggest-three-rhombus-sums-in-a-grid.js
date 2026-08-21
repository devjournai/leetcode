/**
 * Get Biggest Three Rhombus Sums in a Grid
 * Intuition: Every cell is a radius-0 rhombus. Larger rhombi are diamonds centered at a cell; sum the four sides and keep the top 3 distinct sums.
 * Approach: 1. For each center, add grid[r][c] to a Set. 2. For radius 1..max, add the four vertices plus the four edges. 3. Sort descending and return up to three values.
 * Dry Run: grid=[[3]]. Only sum 3. Return [3].
 * Time Complexity: O(rows * cols * min(rows, cols)^2)
 * Space Complexity: O(rows * cols * min(rows, cols))
 */
var getBiggestThree = function (grid) {
  const gridRowsCount = grid.length;
  const gridColumnsCount = grid[0].length;
  const distinctRhombusSums = new Set();

  for (
    let currentGridRow = 0;
    currentGridRow < gridRowsCount;
    currentGridRow++
  ) {
    for (
      let currentGridColumn = 0;
      currentGridColumn < gridColumnsCount;
      currentGridColumn++
    ) {
      distinctRhombusSums.add(grid[currentGridRow][currentGridColumn]);

      const maxRhombusRadius = Math.min(
        currentGridRow,
        gridRowsCount - 1 - currentGridRow,
        currentGridColumn,
        gridColumnsCount - 1 - currentGridColumn
      );

      for (
        let rhombusRadius = 1;
        rhombusRadius <= maxRhombusRadius;
        rhombusRadius++
      ) {
        let currentRhombusTotal = 0;

        currentRhombusTotal +=
          grid[currentGridRow - rhombusRadius][currentGridColumn];
        currentRhombusTotal +=
          grid[currentGridRow + rhombusRadius][currentGridColumn];
        currentRhombusTotal +=
          grid[currentGridRow][currentGridColumn - rhombusRadius];
        currentRhombusTotal +=
          grid[currentGridRow][currentGridColumn + rhombusRadius];

        for (let offsetStep = 1; offsetStep < rhombusRadius; offsetStep++) {
          currentRhombusTotal +=
            grid[currentGridRow - rhombusRadius + offsetStep][
              currentGridColumn + offsetStep
            ];
          currentRhombusTotal +=
            grid[currentGridRow + rhombusRadius - offsetStep][
              currentGridColumn + offsetStep
            ];
          currentRhombusTotal +=
            grid[currentGridRow - rhombusRadius + offsetStep][
              currentGridColumn - offsetStep
            ];
          currentRhombusTotal +=
            grid[currentGridRow + rhombusRadius - offsetStep][
              currentGridColumn - offsetStep
            ];
        }
        distinctRhombusSums.add(currentRhombusTotal);
      }
    }
  }

  const finalSumsArray = Array.from(distinctRhombusSums);
  finalSumsArray.sort((valueA, valueB) => valueB - valueA);

  const resultCount = Math.min(3, finalSumsArray.length);
  return finalSumsArray.slice(0, resultCount);
};
