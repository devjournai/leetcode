/**
 * Minesweeper
 * Time Complexity: O(M*N)
 * Space Complexity: O(M*N)
 */
var updateBoard = function (board, click) {
  const clickedRow = click[0];
  const clickedCol = click[1];

  const boardRows = board.length;
  const boardCols = board[0].length;

  const adjacentDirections = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  if (board[clickedRow][clickedCol] === "M") {
    board[clickedRow][clickedCol] = "X";
    return board;
  }

  function dfsReveal(currentRow, currentCol) {
    if (
      currentRow < 0 ||
      currentRow >= boardRows ||
      currentCol < 0 ||
      currentCol >= boardCols ||
      board[currentRow][currentCol] !== "E"
    ) {
      return;
    }

    let mineCounter = 0;
    for (const directionPair of adjacentDirections) {
      const rowDelta = directionPair[0];
      const colDelta = directionPair[1];
      const nextCellRow = currentRow + rowDelta;
      const nextCellCol = currentCol + colDelta;

      if (
        nextCellRow >= 0 &&
        nextCellRow < boardRows &&
        nextCellCol >= 0 &&
        nextCellCol < boardCols &&
        board[nextCellRow][nextCellCol] === "M"
      ) {
        mineCounter++;
      }
    }

    if (mineCounter > 0) {
      board[currentRow][currentCol] = mineCounter.toString();
    } else {
      board[currentRow][currentCol] = "B";
      for (const otherDirectionPair of adjacentDirections) {
        const otherRowDelta = otherDirectionPair[0];
        const otherColDelta = otherDirectionPair[1];
        const nextExploreRow = currentRow + otherRowDelta;
        const nextExploreCol = currentCol + otherColDelta;
        dfsReveal(nextExploreRow, nextExploreCol);
      }
    }
  }

  dfsReveal(clickedRow, clickedCol);
  return board;
};
