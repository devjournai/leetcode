/**
 * Battleships In A Board
 * Intuition: Ships are straight and non-adjacent, so each ship has a unique “head”: an `'X'` whose left and top cells are not `'X'`. Counting heads counts ships in one pass.
 * Approach: 1. Empty board → 0. 2. For each cell `'X'`, if left is missing/not X and top is missing/not X, increment `battleshipCount`. 3. Return the count.
 * Dry Run: X..X / ...X / ...X.
 *   - (0,0) is a head; (0,3) is a head; (1,3) and (2,3) have X above. Count 2.
 * Time Complexity: O(m * n)
 * Space Complexity: O(1)
 */
var countBattleships = function (inputBoard) {
  let battleshipCount = 0;

  const boardRows = inputBoard.length;
  if (boardRows === 0) {
    return 0;
  }
  const boardColumns = inputBoard[0].length;
  if (boardColumns === 0) {
    return 0;
  }

  for (let currentColumn = 0; currentColumn < boardRows; currentColumn++) {
    for (let currentRow = 0; currentRow < boardColumns; currentRow++) {
      if (inputBoard[currentColumn][currentRow] === "X") {
        const checkLeftBoundary =
          currentRow === 0 || inputBoard[currentColumn][currentRow - 1] !== "X";
        const checkTopBoundary =
          currentColumn === 0 ||
          inputBoard[currentColumn - 1][currentRow] !== "X";

        if (checkLeftBoundary && checkTopBoundary) {
          battleshipCount++;
        }
      }
    }
  }

  return battleshipCount;
};
