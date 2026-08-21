/**
 * Tiling A Rectangle With The Fewest Squares
 * Intuition: Fill the first empty cell with the largest feasible square and backtrack, pruning when the square count already meets the best.
 * Approach: 1. Board of booleans. 2. Find the top-left empty cell. 3. Try placing size max..1 if it fits, recurse, undo. 4. When full, record min squares.
 * Dry Run: n=2, m=3. Place a 2×2 at (0,0), then two 1×1 squares for the remaining column → 3.
 * Time Complexity: O(min(N,M)^S * (N*M))
 * Space Complexity: O(N * M)
 */
var tilingRectangle = function (n, m) {
  let minSquaresFound = n * m;
  const boardState = Array.from({ length: n }, () => Array(m).fill(false));
  const lengthN = n;
  const widthM = m;

  function checkPlacement(
    startRowPosition,
    startColumnPosition,
    squareDimension
  ) {
    if (
      startRowPosition + squareDimension > lengthN ||
      startColumnPosition + squareDimension > widthM
    ) {
      return false;
    }
    for (
      let rowIndexCheck = startRowPosition;
      rowIndexCheck < startRowPosition + squareDimension;
      rowIndexCheck++
    ) {
      for (
        let colIndexCheck = startColumnPosition;
        colIndexCheck < startColumnPosition + squareDimension;
        colIndexCheck++
      ) {
        if (boardState[rowIndexCheck][colIndexCheck]) {
          return false;
        }
      }
    }
    return true;
  }

  function updateBoard(boardRow, boardCol, boardSquareSize, fillValue) {
    for (
      let rowIter = boardRow;
      rowIter < boardRow + boardSquareSize;
      rowIter++
    ) {
      for (
        let colIter = boardCol;
        colIter < boardCol + boardSquareSize;
        colIter++
      ) {
        boardState[rowIter][colIter] = fillValue;
      }
    }
  }

  function recursiveSolve(currentSquares) {
    if (currentSquares >= minSquaresFound) {
      return;
    }

    let foundEmptyRow = -1;
    let foundEmptyCol = -1;

    for (
      let searchRowIndex = 0;
      searchRowIndex < lengthN && foundEmptyRow === -1;
      searchRowIndex++
    ) {
      for (let searchColIndex = 0; searchColIndex < widthM; searchColIndex++) {
        if (!boardState[searchRowIndex][searchColIndex]) {
          foundEmptyRow = searchRowIndex;
          foundEmptyCol = searchColIndex;
          break;
        }
      }
    }

    if (foundEmptyRow === -1) {
      minSquaresFound = Math.min(minSquaresFound, currentSquares);
      return;
    }

    const maxSquareFit = Math.min(
      lengthN - foundEmptyRow,
      widthM - foundEmptyCol
    );
    for (
      let squareFitSize = maxSquareFit;
      squareFitSize >= 1;
      squareFitSize--
    ) {
      if (checkPlacement(foundEmptyRow, foundEmptyCol, squareFitSize)) {
        updateBoard(foundEmptyRow, foundEmptyCol, squareFitSize, true);
        recursiveSolve(currentSquares + 1);
        updateBoard(foundEmptyRow, foundEmptyCol, squareFitSize, false);
      }
    }
  }

  recursiveSolve(0);
  return minSquaresFound;
};
