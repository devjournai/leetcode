/**
 * Walls And Gates
 * Intuition: Distance to the nearest gate is a multi-source BFS from every 0. Empty rooms (2147483647) get filled the first time they are reached.
 * Approach: 1. Enqueue all gates. 2. BFS 4-neighbors. 3. If a neighbor is INF, set it to current+1 and enqueue. 4. Empty grid returns immediately.
 * Dry Run: rooms = [[INF,-1,0],[INF,INF,INF]].
 *   - Queue (0,2). Fill (1,2)=1, then (1,1)=2, then (1,0)=3 and (0,0)=4. Wall at (0,1) skipped.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var wallsAndGates = function (rooms) {
  const gridRowCount = rooms.length;
  if (gridRowCount === 0) {
    return;
  }
  const gridColCount = rooms[0].length;
  const bfsQueue = [];
  const infinityValue = 2147483647;

  for (let rowIndex = 0; rowIndex < gridRowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < gridColCount; colIndex++) {
      if (rooms[rowIndex][colIndex] === 0) {
        bfsQueue.push([rowIndex, colIndex]);
      }
    }
  }

  const movementVectors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  while (bfsQueue.length > 0) {
    const [currentRoomRow, currentRoomCol] = bfsQueue.shift();

    for (const [deltaRow, deltaCol] of movementVectors) {
      const nextRoomRow = currentRoomRow + deltaRow;
      const nextRoomCol = currentRoomCol + deltaCol;

      if (
        nextRoomRow >= 0 &&
        nextRoomRow < gridRowCount &&
        nextRoomCol >= 0 &&
        nextRoomCol < gridColCount &&
        rooms[nextRoomRow][nextRoomCol] === infinityValue
      ) {
        rooms[nextRoomRow][nextRoomCol] =
          rooms[currentRoomRow][currentRoomCol] + 1;
        bfsQueue.push([nextRoomRow, nextRoomCol]);
      }
    }
  }
};
