/**
 * N Queens II
 * Time Complexity: O(N!)
 * Space Complexity: O(N)
 */
var totalNQueens = function (n) {
  let finalSolutionCount = 0;

  const colsInUse = new Set();
  const mainDiagonalsInUse = new Set();
  const antiDiagonalsInUse = new Set();

  const solveNQueensBacktrack = (queenRow) => {
    if (queenRow === n) {
      finalSolutionCount++;
      return;
    }

    for (let candidateCol = 0; candidateCol < n; candidateCol++) {
      const majorDiagonalValue = queenRow - candidateCol;
      const minorDiagonalValue = queenRow + candidateCol;

      if (
        !colsInUse.has(candidateCol) &&
        !mainDiagonalsInUse.has(majorDiagonalValue) &&
        !antiDiagonalsInUse.has(minorDiagonalValue)
      ) {
        colsInUse.add(candidateCol);
        mainDiagonalsInUse.add(majorDiagonalValue);
        antiDiagonalsInUse.add(minorDiagonalValue);

        solveNQueensBacktrack(queenRow + 1);

        antiDiagonalsInUse.delete(minorDiagonalValue);
        mainDiagonalsInUse.delete(majorDiagonalValue);
        colsInUse.delete(candidateCol);
      }
    }
  };

  solveNQueensBacktrack(0);

  return finalSolutionCount;
};
