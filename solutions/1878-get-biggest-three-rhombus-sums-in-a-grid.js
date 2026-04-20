/**
 * Get Biggest Three Rhombus Sums in a Grid
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
        gridColumnsCount - 1 - currentGridColumn,
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
