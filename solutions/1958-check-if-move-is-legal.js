/**
 * Check If Move Is Legal
 * Intuition: A move is legal if placing a piece at (rMove, cMove) creates a "good line". A good line requires the newly placed piece at (rMove, cMove) to be one endpoint, an existing piece of the same color to be the other endpoint, and all cells strictly between them to be the opposite color. This needs to be checked in all eight straight (horizontal, vertical, and diagonal) directions emanating from (rMove, cMove).
 * Approach: 1. Determine the opponent's color based on the player's color. 2. Define an array of all 8 possible direction vectors (deltaRow, deltaCol). 3. Iterate through each of these 8 directions. 4. For each direction, start checking the cell immediately adjacent to (rMove, cMove). 5. Traverse in that direction, counting consecutive cells that hold the opponent's color. 6. If at least one such opponent cell is found, and the next cell encountered in that same line (after the sequence of opponent cells) contains the player's color, then a valid "good line" is formed, and the function can immediately return true. 7. If no such line is found after checking all 8 directions, the move is not legal, and the function returns false.
 * Dry Run: Input: boardGrid from problem example, rMove = 3, cMove = 4, playerPieceColor = 'B'.
 *   Initial state: boardGrid[3][4] is '.', playerPieceColor is 'B'.
 *   1. opponentPieceColor becomes 'W'.
 *   2. allMoveDirections initialized with 8 directional vectors.
 *   3. Begin iterating through allMoveDirections. Consider the direction [0, -1] (leftwards).
 *      - deltaRowMovement = 0, deltaColMovement = -1.
 *      - exploreRow = 3 + 0 = 3, exploreCol = 4 + (-1) = 3.
 *      - currentSequenceCount = 1 (This implicitly counts the (rMove, cMove) cell plus found opponent pieces).
 *      - Enter while loop:
 *        - Check (exploreRow, exploreCol) = (3,3): Is it within bounds? Yes. Is boardGameCells[3][3] ('W') equal to opponentPieceColor ('W')? Yes.
 *        - Update: exploreRow = 3 + 0 = 3, exploreCol = 3 + (-1) = 2. currentSequenceCount becomes 2.
 *      - Re-evaluate while loop:
 *        - Check (exploreRow, exploreCol) = (3,2): Is it within bounds? Yes. Is boardGameCells[3][2] ('.') equal to opponentPieceColor ('W')? No.
 *        - While loop terminates.
 *      - After loop, check if condition for good line is met:
 *        - currentSequenceCount >= 2: (2 >= 2) is true.
 *        - Is (exploreRow, exploreCol) = (3,2) within bounds? Yes.
 *        - Is boardGameCells[3][2] ('.') equal to playerPieceColor ('B')? No, ('.') is not 'B'.
 *        - The condition for this direction is false. Continue to the next direction.
 *   4. (Other directions similarly fail based on the problem's provided example board, as it does not contain a straight good line with (3,4) as an endpoint following standard Othello rules and the reference solution's logic.)
 *   5. If all directions are checked and no legal move is found, the function returns false.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
const checkMove = function (
  boardGameCells,
  moveRow,
  moveCol,
  playerPieceColor,
) {
  const opponentPieceColor = playerPieceColor === "B" ? "W" : "B";
  const allMoveDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const boardDimension = 8;

  for (
    let directionIterator = 0;
    directionIterator < allMoveDirections.length;
    ++directionIterator
  ) {
    const deltaRowMovement = allMoveDirections[directionIterator][0];
    const deltaColMovement = allMoveDirections[directionIterator][1];

    let exploreRow = moveRow + deltaRowMovement;
    let exploreCol = moveCol + deltaColMovement;
    let currentSequenceCount = 1;

    while (
      exploreRow >= 0 &&
      exploreRow < boardDimension &&
      exploreCol >= 0 &&
      exploreCol < boardDimension &&
      boardGameCells[exploreRow][exploreCol] === opponentPieceColor
    ) {
      exploreRow += deltaRowMovement;
      exploreCol += deltaColMovement;
      currentSequenceCount++;
    }

    if (
      currentSequenceCount >= 2 &&
      exploreRow >= 0 &&
      exploreRow < boardDimension &&
      exploreCol >= 0 &&
      exploreCol < boardDimension &&
      boardGameCells[exploreRow][exploreCol] === playerPieceColor
    ) {
      return true;
    }
  }

  return false;
};
