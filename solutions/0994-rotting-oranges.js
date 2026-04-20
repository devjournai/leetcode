/**
 * Rotting Oranges
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var orangesRotting = function (grid) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;
  const rottenOrangesQueue = [];
  let totalFreshOranges = 0;
  let elapsedMinutes = 0;

  for (let rowIndex = 0; rowIndex < gridRows; rowIndex++) {
    for (let colIndex = 0; colIndex < gridCols; colIndex++) {
      if (grid[rowIndex][colIndex] === 2) {
        rottenOrangesQueue.push([rowIndex, colIndex, 0]);
      } else if (grid[rowIndex][colIndex] === 1) {
        totalFreshOranges++;
      }
    }
  }

  const adjacentDirections = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (rottenOrangesQueue.length > 0) {
    const [currentOrangeRow, currentOrangeCol, currentTimePoint] =
      rottenOrangesQueue.shift();
    elapsedMinutes = Math.max(elapsedMinutes, currentTimePoint);

    for (const [rowChange, colChange] of adjacentDirections) {
      const nextOrangeRow = currentOrangeRow + rowChange;
      const nextOrangeCol = currentOrangeCol + colChange;
      const minuteIncrement = currentTimePoint + 1;

      if (
        nextOrangeRow >= 0 &&
        nextOrangeRow < gridRows &&
        nextOrangeCol >= 0 &&
        nextOrangeCol < gridCols &&
        grid[nextOrangeRow][nextOrangeCol] === 1
      ) {
        grid[nextOrangeRow][nextOrangeCol] = 2;
        totalFreshOranges--;
        rottenOrangesQueue.push([
          nextOrangeRow,
          nextOrangeCol,
          minuteIncrement,
        ]);
      }
    }
  }

  if (totalFreshOranges > 0) {
    return -1;
  } else {
    return elapsedMinutes;
  }
};
