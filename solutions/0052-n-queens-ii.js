/**
 * N Queens II
 * Intuition: Same placement rules as N-Queens, but we only count complete boards instead of building string grids. Sets mark used columns and both diagonal families.
 * Approach: 1. Recurse by row; when row == n, increment the count. 2. For each column, if column and both diagonals are free, mark them, recurse to the next row, then unmark.
 * Dry Run: n = 4.
 *   - Exhaustive search finds two valid placements (the two classic 4-queens solutions). Return 2.
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
