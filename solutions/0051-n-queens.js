/**
 * N Queens
 * Intuition: Place one queen per row. A column, a (row-col) diagonal, and a (row+col) diagonal can each hold only one queen. Sets track occupied lines so invalid columns are skipped.
 * Approach: 1. Recurse by row. 2. When row == n, build strings with 'Q' at the recorded column and '.' elsewhere and push the board. 3. For each column, skip if the column or either diagonal is used; otherwise place, recurse, then unplace.
 * Dry Run: n = 4.
 *   - Row 0 col 0 blocks col 0 and diagonals; later rows fail to place 4 queens on that branch.
 *   - A valid placement is queens at (0,1), (1,3), (2,0), (3,2) producing [".Q..","...Q","Q...","..Q."], plus the symmetric solution.
 * Time Complexity: O(N! * N^2)
 * Space Complexity: O(N_solutions * N^2 + N)
 */
var solveNQueens = function (n) {
  const finalSolutions = [];
  const queenColumnPlacements = new Array(n);
  const usedColumns = new Set();
  const usedDiagOne = new Set();
  const usedDiagTwo = new Set();

  const solvePuzzleRecursively = (
    currentRowIndex,
    boardSize,
    solutionVault,
    placementRegister,
    colAvailability,
    diag1Availability,
    diag2Availability
  ) => {
    if (currentRowIndex === boardSize) {
      const boardRepresentation = [];
      for (let rowIter = 0; rowIter < boardSize; rowIter++) {
        const currentQueenColumn = placementRegister[rowIter];
        const emptyCellsLeft = ".".repeat(currentQueenColumn);
        const emptyCellsRight = ".".repeat(boardSize - 1 - currentQueenColumn);
        const rowString = emptyCellsLeft + "Q" + emptyCellsRight;
        boardRepresentation.push(rowString);
      }
      solutionVault.push(boardRepresentation);
      return;
    }

    for (
      let currentColumnTry = 0;
      currentColumnTry < boardSize;
      currentColumnTry++
    ) {
      const diagonalOneKey = currentRowIndex - currentColumnTry;
      const diagonalTwoKey = currentRowIndex + currentColumnTry;

      if (
        colAvailability.has(currentColumnTry) ||
        diag1Availability.has(diagonalOneKey) ||
        diag2Availability.has(diagonalTwoKey)
      ) {
        continue;
      } else {
        placementRegister[currentRowIndex] = currentColumnTry;
        colAvailability.add(currentColumnTry);
        diag1Availability.add(diagonalOneKey);
        diag2Availability.add(diagonalTwoKey);

        solvePuzzleRecursively(
          currentRowIndex + 1,
          boardSize,
          solutionVault,
          placementRegister,
          colAvailability,
          diag1Availability,
          diag2Availability
        );

        colAvailability.delete(currentColumnTry);
        diag1Availability.delete(diagonalOneKey);
        diag2Availability.delete(diagonalTwoKey);
        delete placementRegister[currentRowIndex];
      }
    }
  };

  solvePuzzleRecursively(
    0,
    n,
    finalSolutions,
    queenColumnPlacements,
    usedColumns,
    usedDiagOne,
    usedDiagTwo
  );
  return finalSolutions;
};
