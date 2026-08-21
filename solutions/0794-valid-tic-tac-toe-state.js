/**
 * Valid Tic Tac Toe State
 * Intuition: X starts, so counts must be equal or X one ahead. Both cannot win; X-win needs one extra X; O-win needs equal counts.
 * Approach: 1. Count X and O; reject unless `x === o` or `x === o+1`. 2. `checkPlayerWinStatus` tests 3 rows, 3 cols, 2 diagonals. 3. Reject both winners, X win without `x === o+1`, O win without `x === o`.
 * Dry Run: ["XOX"," X ","   "]. x=2 o=1, neither wins → true. ["XXX","   ","OOO"] both win → false.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var validTicTacToe = function (boardInput) {
  let xCounter = 0;
  let oCounter = 0;

  for (const rowString of boardInput) {
    for (const boardCharacter of rowString) {
      if (boardCharacter === "X") {
        xCounter++;
      } else if (boardCharacter === "O") {
        oCounter++;
      }
    }
  }

  if (xCounter !== oCounter && xCounter !== oCounter + 1) {
    return false;
  }

  const checkPlayerWinStatus = (playerMark, currentBoardState) => {
    if (
      currentBoardState[0][0] === playerMark &&
      currentBoardState[0][1] === playerMark &&
      currentBoardState[0][2] === playerMark
    )
      return true;
    if (
      currentBoardState[1][0] === playerMark &&
      currentBoardState[1][1] === playerMark &&
      currentBoardState[1][2] === playerMark
    )
      return true;
    if (
      currentBoardState[2][0] === playerMark &&
      currentBoardState[2][1] === playerMark &&
      currentBoardState[2][2] === playerMark
    )
      return true;

    if (
      currentBoardState[0][0] === playerMark &&
      currentBoardState[1][0] === playerMark &&
      currentBoardState[2][0] === playerMark
    )
      return true;
    if (
      currentBoardState[0][1] === playerMark &&
      currentBoardState[1][1] === playerMark &&
      currentBoardState[2][1] === playerMark
    )
      return true;
    if (
      currentBoardState[0][2] === playerMark &&
      currentBoardState[1][2] === playerMark &&
      currentBoardState[2][2] === playerMark
    )
      return true;

    if (
      currentBoardState[0][0] === playerMark &&
      currentBoardState[1][1] === playerMark &&
      currentBoardState[2][2] === playerMark
    )
      return true;
    if (
      currentBoardState[0][2] === playerMark &&
      currentBoardState[1][1] === playerMark &&
      currentBoardState[2][0] === playerMark
    )
      return true;

    return false;
  };

  const didXPlayerWin = checkPlayerWinStatus("X", boardInput);
  const didOPlayerWin = checkPlayerWinStatus("O", boardInput);

  if (didXPlayerWin && didOPlayerWin) {
    return false;
  }

  if (didXPlayerWin && xCounter !== oCounter + 1) {
    return false;
  }

  if (didOPlayerWin && xCounter !== oCounter) {
    return false;
  }

  return true;
};
