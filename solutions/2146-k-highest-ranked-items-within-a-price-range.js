/**
 * K Highest Ranked Items Within A Price Range
 * Intuition: The problem requires finding items based on multiple ranking criteria, including shortest path distance. This naturally suggests a Breadth-First Search (BFS) to discover reachable items and their minimum distances from the starting point. Once all reachable items within the price range are found, they must be sorted according to the specified ranking rules.
 * Approach: 1. Initialize a BFS queue with the starting position and a distance of 0. Also, maintain a set to track visited cells to avoid cycles and redundant processing. 2. During the BFS, for each cell visited, check if the item's price falls within the given `pricing` range. If it does, store its `[distance, price, row, col]` in a list of qualified items. 3. Continue the BFS by exploring valid (within bounds, not a wall, not visited) adjacent cells, incrementing the distance for each step. 4. After the BFS completes, sort the `qualifiedItemsList` using a custom comparison function that prioritizes distance, then price, then row, and finally column, all in ascending order. 5. Return the first `k` items from the sorted list, mapped to their `[row, col]` coordinates.
 * Dry Run:
 * grid = [[1,2,3],[0,0,4],[7,6,5]], pricing = [2,5], start = [0,0], k = 3
 * gridRowCount = 3, gridColCount = 3, priceLowerBound = 2, priceUpperBound = 5, initialRow = 0, initialCol = 0
 * movementVectors = [[0,1],[0,-1],[1,0],[-1,0]]
 *
 * bfsTraversalQueue = [[0,0,0]] // (row, col, distance)
 * visitedCellsSet = {"0,0"}
 * qualifiedItemsList = []
 *
 * Loop 1 (advancePointer = 0): Dequeue effectively [0,0,0]
 *   currentRow = 0, currentCol = 0, currentDistance = 0
 *   cellPrice = grid[0][0] = 1. Not in [2,5].
 *   Neighbors of (0,0):
 *     (0,1): nextRow=0, nextCol=1. cellCoordinatesKey="0,1". grid[0][1]=2 > 0. Not visited. Add to visited. Enqueue [0,1,1].
 *     (1,0): nextRow=1, nextCol=0. cellCoordinatesKey="1,0". grid[1][0]=0. Invalid (wall).
 *   bfsTraversalQueue = [[0,0,0], [0,1,1]]
 *   advancePointer = 1
 *
 * Loop 2 (advancePointer = 1): Dequeue effectively [0,1,1]
 *   currentRow = 0, currentCol = 1, currentDistance = 1
 *   cellPrice = grid[0][1] = 2. In [2,5]. Add [1,2,0,1] to qualifiedItemsList.
 *   qualifiedItemsList = [[1,2,0,1]]
 *   Neighbors of (0,1):
 *     (0,0): visited.
 *     (0,2): nextRow=0, nextCol=2. cellCoordinatesKey="0,2". grid[0][2]=3 > 0. Not visited. Add to visited. Enqueue [0,2,2].
 *     (1,1): nextRow=1, nextCol=1. cellCoordinatesKey="1,1". grid[1][1]=0. Invalid (wall).
 *   bfsTraversalQueue = [[0,0,0], [0,1,1], [0,2,2]]
 *   advancePointer = 2
 *
 * Loop 3 (advancePointer = 2): Dequeue effectively [0,2,2]
 *   currentRow = 0, currentCol = 2, currentDistance = 2
 *   cellPrice = grid[0][2] = 3. In [2,5]. Add [2,3,0,2] to qualifiedItemsList.
 *   qualifiedItemsList = [[1,2,0,1], [2,3,0,2]]
 *   Neighbors of (0,2):
 *     (0,1): visited.
 *     (1,2): nextRow=1, nextCol=2. cellCoordinatesKey="1,2". grid[1][2]=4 > 0. Not visited. Add to visited. Enqueue [1,2,3].
 *   bfsTraversalQueue = [[0,0,0], [0,1,1], [0,2,2], [1,2,3]]
 *   advancePointer = 3
 *
 * Loop 4 (advancePointer = 3): Dequeue effectively [1,2,3]
 *   currentRow = 1, currentCol = 2, currentDistance = 3
 *   cellPrice = grid[1][2] = 4. In [2,5]. Add [3,4,1,2] to qualifiedItemsList.
 *   qualifiedItemsList = [[1,2,0,1], [2,3,0,2], [3,4,1,2]]
 *   Neighbors of (1,2):
 *     (0,2): visited.
 *     (2,2): nextRow=2, nextCol=2. cellCoordinatesKey="2,2". grid[2][2]=5 > 0. Not visited. Add to visited. Enqueue [2,2,4].
 *     (1,1): grid[1][1]=0. Invalid (wall).
 *   bfsTraversalQueue = [[0,0,0], [0,1,1], [0,2,2], [1,2,3], [2,2,4]]
 *   advancePointer = 4
 *
 * Loop 5 (advancePointer = 4): Dequeue effectively [2,2,4]
 *   currentRow = 2, currentCol = 2, currentDistance = 4
 *   cellPrice = grid[2][2] = 5. In [2,5]. Add [4,5,2,2] to qualifiedItemsList.
 *   qualifiedItemsList = [[1,2,0,1], [2,3,0,2], [3,4,1,2], [4,5,2,2]]
 *   Neighbors of (2,2):
 *     (1,2): visited.
 *     (2,1): nextRow=2, nextCol=1. cellCoordinatesKey="2,1". grid[2][1]=6 > 0. Not visited. Add to visited. Enqueue [2,1,5].
 *   bfsTraversalQueue = [[0,0,0], [0,1,1], [0,2,2], [1,2,3], [2,2,4], [2,1,5]]
 *   advancePointer = 5
 *
 * Loop 6 (advancePointer = 5): Dequeue effectively [2,1,5]
 *   currentRow = 2, currentCol = 1, currentDistance = 5
 *   cellPrice = grid[2][1] = 6. Not in [2,5].
 *   Neighbors of (2,1):
 *     (2,0): nextRow=2, nextCol=0. cellCoordinatesKey="2,0". grid[2][0]=7 > 0. Not visited. Add to visited. Enqueue [2,0,6].
 *     (1,1): (wall).
 *     (2,2): visited.
 *   bfsTraversalQueue = [[0,0,0], [0,1,1], [0,2,2], [1,2,3], [2,2,4], [2,1,5], [2,0,6]]
 *   advancePointer = 6
 *
 * Loop 7 (advancePointer = 6): Dequeue effectively [2,0,6]
 *   currentRow = 2, currentCol = 0, currentDistance = 6
 *   cellPrice = grid[2][0] = 7. Not in [2,5].
 *   Neighbors of (2,0):
 *     (1,0): (wall).
 *     (2,1): visited.
 *   bfsTraversalQueue length is 7. advancePointer is 7. Loop terminates.
 *
 * BFS ends.
 *
 * Sort qualifiedItemsList:
 * Original: [[1,2,0,1], [2,3,0,2], [3,4,1,2], [4,5,2,2]]
 * This list is already sorted according to the ranking rules.
 *
 * Extract final result:
 * finalResultList = []
 * resultCounter = 0
 * Loop 1 (resultCounter = 0 < k=3):
 *   rankedItem = [1,2,0,1]. Push [0,1].
 *   finalResultList = [[0,1]]
 *   resultCounter = 1
 * Loop 2 (resultCounter = 1 < k=3):
 *   rankedItem = [2,3,0,2]. Push [0,2].
 *   finalResultList = [[0,1], [0,2]]
 *   resultCounter = 2
 * Loop 3 (resultCounter = 2 < k=3):
 *   rankedItem = [3,4,1,2]. Push [1,2].
 *   finalResultList = [[0,1], [0,2], [1,2]]
 *   resultCounter = 3
 * Loop 4 (resultCounter = 3, not < k=3). Loop terminates.
 *
 * Final Result: [[0,1], [0,2], [1,2]]
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var highestRankedKItems = function (grid, pricing, start, k) {
  const gridRowCount = grid.length;
  const gridColCount = grid[0].length;
  const priceLowerBound = pricing[0];
  const priceUpperBound = pricing[1];
  const initialRow = start[0];
  const initialCol = start[1];

  const movementVectors = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const bfsTraversalQueue = [[initialRow, initialCol, 0]];
  const visitedCellsSet = new Set();
  visitedCellsSet.add(`${initialRow},${initialCol}`);

  const qualifiedItemsList = [];

  let advancePointer = 0;
  while (advancePointer < bfsTraversalQueue.length) {
    const currentPathNode = bfsTraversalQueue[advancePointer];
    advancePointer++;

    const currentRow = currentPathNode[0];
    const currentCol = currentPathNode[1];
    const currentDistance = currentPathNode[2];

    const cellPrice = grid[currentRow][currentCol];

    if (cellPrice >= priceLowerBound && cellPrice <= priceUpperBound) {
      qualifiedItemsList.push([
        currentDistance,
        cellPrice,
        currentRow,
        currentCol,
      ]);
    }

    for (
      let directionIndex = 0;
      directionIndex < movementVectors.length;
      directionIndex++
    ) {
      const deltaRow = movementVectors[directionIndex][0];
      const deltaCol = movementVectors[directionIndex][1];

      const nextRow = currentRow + deltaRow;
      const nextCol = currentCol + deltaCol;
      const cellCoordinatesKey = `${nextRow},${nextCol}`;

      const isValidRow = nextRow >= 0 && nextRow < gridRowCount;
      const isValidCol = nextCol >= 0 && nextCol < gridColCount;
      const isWalkable = isValidRow && isValidCol && grid[nextRow][nextCol] > 0;
      const isNotVisited = !visitedCellsSet.has(cellCoordinatesKey);

      if (isWalkable && isNotVisited) {
        visitedCellsSet.add(cellCoordinatesKey);
        bfsTraversalQueue.push([nextRow, nextCol, currentDistance + 1]);
      }
    }
  }

  qualifiedItemsList.sort((itemA, itemB) => {
    if (itemA[0] !== itemB[0]) {
      return itemA[0] - itemB[0];
    } else if (itemA[1] !== itemB[1]) {
      return itemA[1] - itemB[1];
    } else if (itemA[2] !== itemB[2]) {
      return itemA[2] - itemB[2];
    } else {
      return itemA[3] - itemB[3];
    }
  });

  const finalResultList = [];
  let resultCounter = 0;
  while (resultCounter < k && resultCounter < qualifiedItemsList.length) {
    const rankedItem = qualifiedItemsList[resultCounter];
    finalResultList.push([rankedItem[2], rankedItem[3]]);
    resultCounter++;
  }

  return finalResultList;
};
