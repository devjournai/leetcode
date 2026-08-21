/**
 * Detonate The Maximum Bombs
 * Intuition: The problem describes a chain reaction where one bomb can trigger others, and these triggered bombs can further trigger more. This forms a directed relationship: if bomb A can detonate bomb B, there's a directed path from A to B. We are looking for the maximum number of reachable nodes (bombs) from any single starting node (bomb) in this directed graph.
 * Approach: 1. Construct a directed graph where each bomb is a node. An edge exists from bomb `i` to bomb `j` if bomb `j` falls within the detonation range of bomb `i`. To determine this, calculate the squared Euclidean distance between the centers of bomb `i` and bomb `j`, and check if it's less than or equal to the squared radius of bomb `i`. Squaring avoids floating-point square root calculations and maintains precision. 2. Iterate through each bomb in the list, treating it as the initial bomb to detonate. 3. For each initial bomb, perform a Depth First Search (DFS) traversal starting from that bomb. The DFS will identify all bombs that can be detonated directly or indirectly. A `Set` is used to keep track of visited bombs during each traversal to avoid cycles and redundant counting. 4. After each DFS, the size of the visited set represents the total number of bombs detonated for that particular starting bomb. 5. Keep track of the maximum size found across all DFS traversals. This maximum is the final answer.
 * Dry Run:
 * Input: bombs = [[0,0,1],[1,0,1]]
 * bombListLength = 2
 * adjacencyGraph = [[], []]
 *
 * Graph Construction:
 * firstBombIndex = 0 (bomb [0,0,1]), firstBombX=0, firstBombY=0, firstBombRadius=1, firstRadiusSquared=1
 *   secondBombIndex = 1 (bomb [1,0,1]), secondBombX=1, secondBombY=0
 *     deltaX = 1-0 = 1, deltaY = 0-0 = 0
 *     distanceSquaredVal = 1*1 + 0*0 = 1
 *     Check 1 <= 1 (firstRadiusSquared). True.
 *     adjacencyGraph[0].push(1) -> adjacencyGraph = [[1], []]
 *
 * firstBombIndex = 1 (bomb [1,0,1]), firstBombX=1, firstBombY=0, firstBombRadius=1, firstRadiusSquared=1
 *   secondBombIndex = 0 (bomb [0,0,1]), secondBombX=0, secondBombY=0
 *     deltaX = 0-1 = -1, deltaY = 0-0 = 0
 *     distanceSquaredVal = (-1)*(-1) + 0*0 = 1
 *     Check 1 <= 1 (firstRadiusSquared). True.
 *     adjacencyGraph[1].push(0) -> adjacencyGraph = [[1], [0]]
 *
 * Graph fully constructed. adjacencyGraph = [[1], [0]].
 *
 * Find Maximum Detonation:
 * maxDetonatedCount = 0
 *
 * initialDetonationIndex = 0:
 *   currentVisitedBombsSet = Set {}
 *   performDfsTraversal(0, currentVisitedBombsSet, adjacencyGraph)
 *     dfsCurrentNode = 0. visitedNodesForDfs = currentVisitedBombsSet. graphAdj = adjacencyGraph.
 *     visitedNodesForDfs.add(0) -> Set {0}
 *     neighborNode = 1 (from graphAdj[0])
 *       !visitedNodesForDfs.has(1) is true
 *       performDfsTraversal(1, visitedNodesForDfs, graphAdj)
 *         dfsCurrentNode = 1.
 *         visitedNodesForDfs.add(1) -> Set {0, 1}
 *         neighborNode = 0 (from graphAdj[1])
 *           !visitedNodesForDfs.has(0) is false (0 is in Set {0,1})
 *         (end neighbors for node 1)
 *       (returns, back to call from node 0)
 *     (end neighbors for node 0)
 *   currentVisitedBombsSet.size = 2
 *   maxDetonatedCount = Math.max(0, 2) = 2
 *
 * initialDetonationIndex = 1:
 *   currentVisitedBombsSet = Set {}
 *   performDfsTraversal(1, currentVisitedBombsSet, adjacencyGraph)
 *     dfsCurrentNode = 1. visitedNodesForDfs = currentVisitedBombsSet. graphAdj = adjacencyGraph.
 *     visitedNodesForDfs.add(1) -> Set {1}
 *     neighborNode = 0 (from graphAdj[1])
 *       !visitedNodesForDfs.has(0) is true
 *       performDfsTraversal(0, visitedNodesForDfs, graphAdj)
 *         dfsCurrentNode = 0.
 *         visitedNodesForDfs.add(0) -> Set {1, 0}
 *         neighborNode = 1 (from graphAdj[0])
 *           !visitedNodesForDfs.has(1) is false (1 is in Set {1,0})
 *         (end neighbors for node 0)
 *       (returns, back to call from node 1)
 *     (end neighbors for node 1)
 *   currentVisitedBombsSet.size = 2
 *   maxDetonatedCount = Math.max(2, 2) = 2
 *
 * Loop ends.
 * Return maxDetonatedCount = 2.
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var maximumDetonation = function (bombs) {
  const bombListLength = bombs.length;
  const adjacencyGraph = Array.from({ length: bombListLength }, () => []);

  for (
    let firstBombIndex = 0;
    firstBombIndex < bombListLength;
    firstBombIndex++
  ) {
    const [firstBombX, firstBombY, firstBombRadius] = bombs[firstBombIndex];
    const firstRadiusSquared = firstBombRadius * firstBombRadius;

    for (
      let secondBombIndex = 0;
      secondBombIndex < bombListLength;
      secondBombIndex++
    ) {
      if (firstBombIndex === secondBombIndex) {
        continue;
      }
      const [secondBombX, secondBombY] = bombs[secondBombIndex];

      const deltaX = secondBombX - firstBombX;
      const deltaY = secondBombY - firstBombY;
      const distanceSquaredVal = deltaX * deltaX + deltaY * deltaY;

      if (distanceSquaredVal <= firstRadiusSquared) {
        adjacencyGraph[firstBombIndex].push(secondBombIndex);
      }
    }
  }

  let maxDetonatedCount = 0;
  if (bombListLength === 0) {
    return 0;
  }

  for (
    let initialDetonationIndex = 0;
    initialDetonationIndex < bombListLength;
    initialDetonationIndex++
  ) {
    const currentVisitedBombsSet = new Set();
    performDfsTraversal(
      initialDetonationIndex,
      currentVisitedBombsSet,
      adjacencyGraph
    );
    maxDetonatedCount = Math.max(
      maxDetonatedCount,
      currentVisitedBombsSet.size
    );
  }

  return maxDetonatedCount;

  function performDfsTraversal(dfsCurrentNode, visitedNodesForDfs, graphAdj) {
    visitedNodesForDfs.add(dfsCurrentNode);

    for (const neighborNode of graphAdj[dfsCurrentNode]) {
      if (!visitedNodesForDfs.has(neighborNode)) {
        performDfsTraversal(neighborNode, visitedNodesForDfs, graphAdj);
      }
    }
  }
};
