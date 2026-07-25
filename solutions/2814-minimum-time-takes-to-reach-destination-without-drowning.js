/**
 * Minimum Time Takes To Reach Destination Without Drowning
 * Intuition: This is a shortest path problem in a dynamically changing grid. Since the "flood" spreads simultaneously with player movement, and the player cannot step on a cell that *will be* flooded at the same time, a layered Breadth-First Search (BFS) is suitable. We simulate time steps, first expanding the flood, then allowing the player to move into safe cells for that time step.
 * Approach: 1. Initialize two BFS queues: one for the spreading flood cells and one for the player's possible positions. Also, find the initial 'S' and '*' cells and populate these queues. 2. Use a `currentElapsedSeconds` counter, starting at 0. 3. Enter a main BFS loop that continues as long as the player's queue is not empty. 4. Inside the loop, increment `currentElapsedSeconds`. 5. **Flood Expansion Phase:** Process all cells currently in the `waterSpreadQueue`. For each, mark its adjacent empty cells ('.') as flooded ('*') and add them to the queue. This effectively spreads the flood for the current time step. 6. **Player Movement Phase:** Process all cells currently in the `playerMovementQueue`. For each, explore its neighbors. If a neighbor is the 'D' cell, return `currentElapsedSeconds`. If a neighbor is an empty cell ('.') (meaning it was not flooded in the current time step's flood phase and is not 'X'), mark it as visited by the player ('S') and add it to the `playerMovementQueue`. 7. If the player's queue becomes empty and 'D' has not been reached, return -1.
 * Dry Run:
 * Input: land = [["S",".","D"],[".","*","."]]
 * mapRows = 2, mapCols = 3
 * cardinalDirections = [[1,0], [-1,0], [0,1], [0,-1]]
 * waterSpreadQueue = [[1,1]] (from initial '*')
 * playerMovementQueue = [[0,0]] (from initial 'S')
 * currentElapsedSeconds = 0
 *
 * Initial land:
 * [ S . D ]
 * [ . * . ]
 *
 * LOOP START: playerMovementQueue is not empty.
 *   currentElapsedSeconds = 1
 *
 *   // Flood Expansion Phase (at t=1)
 *   spreadingWaterCount = 1 (waterSpreadQueue has [[1,1]])
 *   - Dequeue [1,1]. Neighbors:
 *     - [0,1]: land[0][1] is '.', mark as '*'. Enqueue [0,1].
 *     - [1,0]: land[1][0] is '.', mark as '*'. Enqueue [1,0].
 *     - [1,2]: land[1][2] is '.', mark as '*'. Enqueue [1,2].
 *   waterSpreadQueue = [[0,1], [1,0], [1,2]]
 *   Land state after flood:
 *   [ S * D ]
 *   [ * * * ]
 *
 *   // Player Movement Phase (at t=1)
 *   playerMovesCount = 1 (playerMovementQueue has [[0,0]])
 *   - Dequeue [0,0]. Neighbors:
 *     - [1,0]: land[1][0] is '*'. Cannot move.
 *     - [0,1]: land[0][1] is '*'. Cannot move.
 *   playerMovementQueue is now empty.
 *
 * LOOP END: playerMovementQueue is empty.
 * Return -1. (Correct, as player is blocked by flood at t=1)
 *
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var minimumSeconds = function (land) {
  const mapRows = land.length;
  const mapCols = land[0].length;
  const cardinalDirections = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const waterSpreadQueue = [];
  const playerMovementQueue = [];

  const checkBoundaryValidity = (rowCheck, colCheck) => {
    return (
      rowCheck >= 0 && rowCheck < mapRows && colCheck >= 0 && colCheck < mapCols
    );
  };

  for (let rowIdx = 0; rowIdx < mapRows; rowIdx++) {
    for (let colIdx = 0; colIdx < mapCols; colIdx++) {
      if (land[rowIdx][colIdx] === "S") {
        playerMovementQueue.push([rowIdx, colIdx]);
      } else if (land[rowIdx][colIdx] === "*") {
        waterSpreadQueue.push([rowIdx, colIdx]);
      }
    }
  }

  let currentElapsedSeconds = 0;

  while (playerMovementQueue.length > 0) {
    currentElapsedSeconds++;

    const spreadingWaterCount = waterSpreadQueue.length;
    for (let floodIter = 0; floodIter < spreadingWaterCount; floodIter++) {
      const [waterSourceRow, waterSourceCol] = waterSpreadQueue.shift();

      for (const [deltaFloodRow, deltaFloodCol] of cardinalDirections) {
        const nextWaterRowCoord = waterSourceRow + deltaFloodRow;
        const nextWaterColCoord = waterSourceCol + deltaFloodCol;

        if (
          checkBoundaryValidity(nextWaterRowCoord, nextWaterColCoord) &&
          land[nextWaterRowCoord][nextWaterColCoord] === "."
        ) {
          land[nextWaterRowCoord][nextWaterColCoord] = "*";
          waterSpreadQueue.push([nextWaterRowCoord, nextWaterColCoord]);
        }
      }
    }

    const playerMovesCount = playerMovementQueue.length;
    for (let playerIter = 0; playerIter < playerMovesCount; playerIter++) {
      const [playerSourceRow, playerSourceCol] = playerMovementQueue.shift();

      for (const [deltaPlayerRow, deltaPlayerCol] of cardinalDirections) {
        const nextPlayerRowCoord = playerSourceRow + deltaPlayerRow;
        const nextPlayerColCoord = playerSourceCol + deltaPlayerCol;

        if (checkBoundaryValidity(nextPlayerRowCoord, nextPlayerColCoord)) {
          if (land[nextPlayerRowCoord][nextPlayerColCoord] === "D") {
            return currentElapsedSeconds;
          } else if (land[nextPlayerRowCoord][nextPlayerColCoord] === ".") {
            land[nextPlayerRowCoord][nextPlayerColCoord] = "S";
            playerMovementQueue.push([nextPlayerRowCoord, nextPlayerColCoord]);
          }
        }
      }
    }
  }

  return -1;
};
