/**
 * Island Perimeter
 * Intuition: Each land cell starts with 4 sides; every 4-direction neighbor that is also land removes one side.
 * Approach: 1. For each cell === 1, add 4. 2. Check offsets (-1,0),(1,0),(0,-1),(0,1). 3. If the neighbor is in bounds and land, decrement. 4. Return `perimeterSum`.
 * Dry Run: [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]. Each land-land edge subtracts; total 16.
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
