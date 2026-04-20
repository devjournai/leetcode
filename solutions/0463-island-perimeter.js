/**
 * Island Perimeter
 * Time Complexity: O(R * C)
 * Space Complexity: O(1)
 */
var islandPerimeter = function (grid) {
  let perimeterSum = 0;
  const gridRows = grid.length;
  const gridColumns = grid[0].length;

  const rowOffsets = [-1, 1, 0, 0];
  const columnOffsets = [0, 0, -1, 1];

  for (let currentRow = 0; currentRow < gridRows; currentRow++) {
    for (let currentColumn = 0; currentColumn < gridColumns; currentColumn++) {
      if (grid[currentRow][currentColumn] === 1) {
        perimeterSum += 4;

        for (
          let directionIterator = 0;
          directionIterator < 4;
          directionIterator++
        ) {
          const adjacentRow = currentRow + rowOffsets[directionIterator];
          const adjacentColumn =
            currentColumn + columnOffsets[directionIterator];

          if (
            adjacentRow >= 0 &&
            adjacentRow < gridRows &&
            adjacentColumn >= 0 &&
            adjacentColumn < gridColumns &&
            grid[adjacentRow][adjacentColumn] === 1
          ) {
            perimeterSum--;
          }
        }
      }
    }
  }

  return perimeterSum;
};
