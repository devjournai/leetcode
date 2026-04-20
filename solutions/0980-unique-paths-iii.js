/**
 * Unique Paths III
 * Time Complexity: O(rows * cols * 4^W)
 * Space Complexity: O(rows * cols)
 */
var uniquePathsIII = function (grid) {
  const gridLengthR = grid.length;
  const gridLengthC = grid[0].length;

  let allWalkableSquaresCount = 0;
  let startPointRow;
  let startPointCol;

  for (let rowIndexer = 0; rowIndexer < gridLengthR; rowIndexer++) {
    for (let colIndexer = 0; colIndexer < gridLengthC; colIndexer++) {
      const currentCellContent = grid[rowIndexer][colIndexer];
      if (
        currentCellContent === 0 ||
        currentCellContent === 1 ||
        currentCellContent === 2
      ) {
        allWalkableSquaresCount++;
      }
      if (currentCellContent === 1) {
        startPointRow = rowIndexer;
        startPointCol = colIndexer;
      }
    }
  }

  function pathFinder(currR, currC, stepsTaken) {
    if (
      currR < 0 ||
      currR >= gridLengthR ||
      currC < 0 ||
      currC >= gridLengthC ||
      grid[currR][currC] === -1
    ) {
      return 0;
    }

    if (grid[currR][currC] === 2) {
      return stepsTaken === allWalkableSquaresCount ? 1 : 0;
    }

    const currentCellVal = grid[currR][currC];
    grid[currR][currC] = -1;

    let totalPathsFromHere = 0;
    const moveOptions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (
      let idxDirection = 0;
      idxDirection < moveOptions.length;
      idxDirection++
    ) {
      const deltaR = moveOptions[idxDirection][0];
      const deltaC = moveOptions[idxDirection][1];
      const nextVisitRow = currR + deltaR;
      const nextVisitCol = currC + deltaC;

      const recursiveResult = pathFinder(
        nextVisitRow,
        nextVisitCol,
        stepsTaken + 1,
      );
      totalPathsFromHere += recursiveResult;
    }

    grid[currR][currC] = currentCellVal;
    return totalPathsFromHere;
  }

  return pathFinder(startPointRow, startPointCol, 1);
};
