/**
 * Minimum Cost To Make At Least One Valid Path In A Grid
 * Intuition: Following the arrow costs 0 and changing it costs 1, so 0-1 BFS (deque) finds the cheapest path: 0-cost moves go to the front, 1-cost moves to the back.
 * Approach: 1. Dist[0][0] = 0. 2. From each cell, try the four directions; cost is 0 if the cell's sign already points that way, else 1. 3. Relax neighbors and push front/back accordingly. 4. Answer is dist at the bottom-right.
 * Dry Run: grid = [[1,1,3],[3,2,2],[1,1,4]].
 *   - (0,0) cost 0, sign 1 → follow right to (0,1) cost 0, then right to (0,2) cost 0, then down to (1,2) and (2,2) along 0-cost arrows.
 *   - Return 0.
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var minCost = function (grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  const minimumCosts = Array(gridHeight)
    .fill(null)
    .map(() => Array(gridWidth).fill(Infinity));

  const moveOptions = [
    [0, 1, 1],
    [0, -1, 2],
    [1, 0, 3],
    [-1, 0, 4],
  ];

  const pathTraversalQueue = [];

  minimumCosts[0][0] = 0;
  pathTraversalQueue.unshift([0, 0]);

  while (pathTraversalQueue.length > 0) {
    const currentCoordinates = pathTraversalQueue.shift();
    const processingRow = currentCoordinates[0];
    const processingColumn = currentCoordinates[1];
    const currentAccumulatedCost =
      minimumCosts[processingRow][processingColumn];

    for (const directionMetadata of moveOptions) {
      const rowChange = directionMetadata[0];
      const columnChange = directionMetadata[1];
      const expectedSign = directionMetadata[2];

      const nextGridRow = processingRow + rowChange;
      const nextGridColumn = processingColumn + columnChange;

      if (
        nextGridRow >= 0 &&
        nextGridRow < gridHeight &&
        nextGridColumn >= 0 &&
        nextGridColumn < gridWidth
      ) {
        const alterationCost =
          grid[processingRow][processingColumn] === expectedSign ? 0 : 1;
        const potentialPathCost = currentAccumulatedCost + alterationCost;

        if (potentialPathCost < minimumCosts[nextGridRow][nextGridColumn]) {
          minimumCosts[nextGridRow][nextGridColumn] = potentialPathCost;
          if (alterationCost === 0) {
            pathTraversalQueue.unshift([nextGridRow, nextGridColumn]);
          } else {
            pathTraversalQueue.push([nextGridRow, nextGridColumn]);
          }
        }
      }
    }
  }

  return minimumCosts[gridHeight - 1][gridWidth - 1];
};
