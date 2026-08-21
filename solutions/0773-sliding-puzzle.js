/**
 * Sliding Puzzle
 * Intuition: Flatten the 2×3 board to a 6-char string. BFS from that layout, swapping `'0'` with its neighbors from `validZeroMoves` until `"123450"` or no new states.
 * Approach: 1. If `board.flat().join("")` is already the target, return 0. 2. Queue `[layout, moves]` with `exploredStates`. 3. Dequeue, find `zeroTileIndex`, try each `adjacentTileIndex`, swap via a char array. 4. If the new string is the target, return `totalMovesMade + 1`; else enqueue if unseen. 5. Exhausted queue → -1.
 * Dry Run: board = [[1,2,3],[4,0,5]].
 *   - Start "123405", zero at index 4. Neighbors [1,3,5].
 *   - Swap with 5 → "123450" in 1 move. Return 1.
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
