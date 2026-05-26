/**
 * Minimum Operations To Remove Adjacent Ones In Matrix
 * Intuition: The problem asks for the minimum operations (flipping 1s to 0s) to eliminate all 4-directional adjacencies between 1s. This is equivalent to finding the Minimum Vertex Cover in the graph formed by the 1s and their adjacencies. Since the grid can be colored like a chessboard, any two adjacent 1s will have different colors (parities of row+col sum), meaning the graph is bipartite. By Konig's Theorem, for a bipartite graph, the Minimum Vertex Cover is equal to the Maximum Matching. Thus, the problem reduces to finding the maximum bipartite matching in the graph of 1s.
 * Approach: 1. Represent the grid as a bipartite graph where 1s are nodes, and an edge exists between adjacent 1s. The two sets of the bipartite graph are formed by cells with (row+col) sum being even vs. odd. 2. Implement a standard DFS-based algorithm to find the maximum bipartite matching. 3. Iterate through each cell in the grid. If a cell contains a '1' and is currently unmatched, initiate a DFS traversal from that cell to find an augmenting path. 4. The DFS function attempts to find an alternating path from an unmatched '1' to another unmatched '1'. If such a path is found, it updates the matching, effectively increasing the size of the maximum matching by one. 5. The total count of successful augmenting paths found will be the maximum bipartite matching size, which is the minimum number of operations.
 * Dry Run: For grid = [[1,1], [1,1]]:
 *   - m=2, n=2. Initialize maxBipartiteMatching = 0.
 *   - matchingPartner (2x2) and visitedMarker (2x2) are all -1.
 *   - Iterate through (currentRow, currentCol):
 *     - (0,0): grid[0][0]=1, matchingPartner[0][0]=-1.
 *       - visitIdentifier = 0*2+0 = 0.
 *       - visitedMarker[0][0] = 0.
 *       - Call findAugmentingPath(0,0,0):
 *         - Neighbor (0,1): grid[0][1]=1, visitedMarker[0][1]=-1 != 0.
 *           - visitedMarker[0][1] = 0.
 *           - matchingPartner[0][1]=-1. Found unmatched neighbor.
 *           - matchingPartner[0][1] = 0*2+0 = 0. (0,1) matched with (0,0).
 *           - matchingPartner[0][0] = 0*2+1 = 1. (0,0) matched with (0,1).
 *           - Return 1.
 *       - maxBipartiteMatching becomes 1.
 *     - (0,1): grid[0][1]=1, matchingPartner[0][1]=0 != -1. Skip (already matched).
 *     - (1,0): grid[1][0]=1, matchingPartner[1][0]=-1.
 *       - visitIdentifier = 1*2+0 = 2.
 *       - visitedMarker[1][0] = 2.
 *       - Call findAugmentingPath(1,0,2):
 *         - Neighbor (0,0): grid[0][0]=1, visitedMarker[0][0]=0 != 2.
 *           - visitedMarker[0][0] = 2.
 *           - matchingPartner[0][0]=1 != -1. (0,0) is matched with (0,1). Try to free (0,0)'s partner.
 *           - matchedPrevRow = floor(1/2) = 0, matchedPrevCol = 1%2 = 1.
 *           - Call findAugmentingPath(0,1,2):
 *             - Neighbor (0,0): grid[0][0]=1, visitedMarker[0][0]=2 == 2. Skip (already in current path).
 *             - Neighbor (1,1): grid[1][1]=1, visitedMarker[1][1]=-1 != 2.
 *               - visitedMarker[1][1] = 2.
 *               - matchingPartner[1][1]=-1. Found unmatched neighbor.
 *               - matchingPartner[1][1] = 0*2+1 = 1. (1,1) matched with (0,1).
 *               - matchingPartner[0][1] = 1*2+1 = 3. (0,1) matched with (1,1). (Effectively, (0,1) 'stole' (1,1) as its new partner, freeing up (0,0)).
 *               - Return 1.
 *           - Since findAugmentingPath(0,1,2) returned 1, (0,0) is now free (its old partner (0,1) found a new one). So (1,0) can match with (0,0).
 *           - matchingPartner[0][0] = 1*2+0 = 2. (0,0) matched with (1,0).
 *           - matchingPartner[1][0] = 0*2+0 = 0. (1,0) matched with (0,0).
 *           - Return 1.
 *       - maxBipartiteMatching becomes 1 + 1 = 2.
 *     - (1,1): grid[1][1]=1, matchingPartner[1][1]=1 != -1. Skip.
 *   - Final maxBipartiteMatching = 2.
 * Time Complexity: O((M*N)^2)
 * Space Complexity: O(M*N)
 */
var minimumOperations = function (grid) {
  const rowCount = grid.length;
  const colCount = grid[0].length;
  let maxBipartiteMatching = 0;
  const movementVectors = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const matchingPartner = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(-1),
  );
  const visitedMarker = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(-1),
  );

  for (let currentRow = 0; currentRow < rowCount; currentRow++) {
    for (let currentCol = 0; currentCol < colCount; currentCol++) {
      if (
        grid[currentRow][currentCol] === 1 &&
        matchingPartner[currentRow][currentCol] === -1
      ) {
        const visitIdentifier = currentRow * colCount + currentCol;
        visitedMarker[currentRow][currentCol] = visitIdentifier;
        maxBipartiteMatching += findAugmentingPath(
          currentRow,
          currentCol,
          visitIdentifier,
        );
      }
    }
  }

  return maxBipartiteMatching;

  function findAugmentingPath(currentRow, currentCol, visitIdentifier) {
    for (const [deltaRow, deltaCol] of movementVectors) {
      const nextRow = currentRow + deltaRow;
      const nextCol = currentCol + deltaCol;
      if (
        nextRow >= 0 &&
        nextRow < rowCount &&
        nextCol >= 0 &&
        nextCol < colCount &&
        grid[nextRow][nextCol] === 1 &&
        visitedMarker[nextRow][nextCol] !== visitIdentifier
      ) {
        visitedMarker[nextRow][nextCol] = visitIdentifier;
        if (
          matchingPartner[nextRow][nextCol] === -1 ||
          findAugmentingPath(
            Math.floor(matchingPartner[nextRow][nextCol] / colCount),
            matchingPartner[nextRow][nextCol] % colCount,
            visitIdentifier,
          )
        ) {
          matchingPartner[nextRow][nextCol] =
            currentRow * colCount + currentCol;
          matchingPartner[currentRow][currentCol] =
            nextRow * colCount + nextCol;
          return 1;
        }
      }
    }
    return 0;
  }
};
