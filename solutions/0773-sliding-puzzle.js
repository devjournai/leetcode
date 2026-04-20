/**
 * Sliding Puzzle
 * Time Complexity: O(N! * L)
 * Space Complexity: O(N! * L)
 */
var slidingPuzzle = function (board) {
  const targetPuzzleState = "123450";

  const validZeroMoves = [
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4],
    [1, 3, 5],
    [2, 4],
  ];

  const startingBoardLayout = board.flat().join("");

  if (startingBoardLayout === targetPuzzleState) {
    return 0;
  }

  const bfsTraversalQueue = [[startingBoardLayout, 0]];
  const exploredStates = new Set([startingBoardLayout]);

  while (bfsTraversalQueue.length > 0) {
    const [currentBoardConfiguration, totalMovesMade] =
      bfsTraversalQueue.shift();
    const zeroTileIndex = currentBoardConfiguration.indexOf("0");

    for (const adjacentTileIndex of validZeroMoves[zeroTileIndex]) {
      const boardCharacterArray = currentBoardConfiguration.split("");
      [
        boardCharacterArray[zeroTileIndex],
        boardCharacterArray[adjacentTileIndex],
      ] = [
        boardCharacterArray[adjacentTileIndex],
        boardCharacterArray[zeroTileIndex],
      ];
      const nextBoardStateString = boardCharacterArray.join("");

      if (nextBoardStateString === targetPuzzleState) {
        return totalMovesMade + 1;
      }

      if (!exploredStates.has(nextBoardStateString)) {
        exploredStates.add(nextBoardStateString);
        bfsTraversalQueue.push([nextBoardStateString, totalMovesMade + 1]);
      }
    }
  }

  return -1;
};
