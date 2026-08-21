/**
 * Minimum Edge Weight Equilibrium Queries In A Tree
 * Intuition: The path between any two nodes `A` and `B` in a tree can be decomposed into the path from `A` to `LCA(A, B)` and the path from `LCA(A, B)` to `B`. By precomputing path statistics (like depth and counts of each edge weight) from every node up to the root, we can efficiently query these statistics for any arbitrary path using the Lowest Common Ancestor (LCA) and the principle of inclusion-exclusion. The minimum operations to make all edges on a path equal is the total number of edges minus the count of the most frequent edge weight on that path.
 * Approach: 1. Represent the tree using an adjacency list. 2. Perform a Depth First Search (DFS) to precompute the depth of each node, its direct parent, and the cumulative count of each edge weight on the path from that node to the tree's root. 3. Implement an LCA function using the precomputed parent and depth arrays. 4. For each query, use the LCA function to find the common ancestor. Then, calculate the total path length and the frequency of each edge weight on the path from `queryStartNode` to `queryEndNode` by combining precomputed counts and subtracting the double-counted path to the LCA. 5. Determine the maximum frequency among all edge weights on the path and subtract it from the total path length to get the minimum operations.
 * Dry Run:
 * n = 3, edges = [[0,1,10], [1,2,20]], queries = [[0,2]]
 *
 * 1. Tree Representation:
 *    treeAdjacencyList[0] = [[1, 10]]
 *    treeAdjacencyList[1] = [[0, 10], [2, 20]]
 *    treeAdjacencyList[2] = [[1, 20]]
 *
 * 2. DFS Preprocessing (buildTreeMetadata(0, -1, 0)):
 *    Initialize: nodeParentArray = [-1, -1, -1], nodeDepthLevel = [0, 0, 0], pathWeightFrequencyAccumulator = [[0...26], [0...26], [0...26]]
 *
 *    - buildTreeMetadata(0, -1, 0):
 *      - nodeParentArray[0] = -1
 *      - nodeDepthLevel[0] = 0
 *      - pathWeightFrequencyAccumulator[0] remains all zeros.
 *      - Calls buildTreeMetadata(1, 0, 1) for neighbor [1, 10].
 *
 *    - buildTreeMetadata(1, 0, 1):
 *      - nodeParentArray[1] = 0
 *      - nodeDepthLevel[1] = 1
 *      - pathWeightFrequencyAccumulator[1] = [...pathWeightFrequencyAccumulator[0]] (all zeros)
 *      - pathWeightFrequencyAccumulator[1][10] becomes 1.
 *      - Calls buildTreeMetadata(2, 1, 2) for neighbor [2, 20].
 *
 *    - buildTreeMetadata(2, 1, 2):
 *      - nodeParentArray[2] = 1
 *      - nodeDepthLevel[2] = 2
 *      - pathWeightFrequencyAccumulator[2] = [...pathWeightFrequencyAccumulator[1]] (so pathWeightFrequencyAccumulator[2][10] is 1)
 *      - pathWeightFrequencyAccumulator[2][20] becomes 1.
 *
 *    After DFS:
 *    nodeParentArray = [-1, 0, 1]
 *    nodeDepthLevel = [0, 1, 2]
 *    pathWeightFrequencyAccumulator:
 *      [0]: [0,0,0, ..., 0]
 *      [1]: [0,0,..., 10:1, ..., 0]
 *      [2]: [0,0,..., 10:1, ..., 20:1, ..., 0]
 *
 * 3. Query Processing (for currentQueryRequest = [0, 2]):
 *    - querySourceNode = 0, queryDestinationNode = 2
 *    - commonAncestorIdentifier = findLowestCommonAncestor(0, 2):
 *      - (Initial) moverNodeA = 0, moverNodeB = 2.
 *      - Swap to make moverNodeA deeper: moverNodeA = 2, moverNodeB = 0.
 *      - while (nodeDepthLevel[2] > nodeDepthLevel[0]): (2 > 0) true
 *        - moverNodeA = nodeParentArray[2] = 1.
 *      - while (nodeDepthLevel[1] > nodeDepthLevel[0]): (1 > 0) true
 *        - moverNodeA = nodeParentArray[1] = 0.
 *      - while (nodeDepthLevel[0] > nodeDepthLevel[0]): (0 > 0) false.
 *      - while (moverNodeA !== moverNodeB): (0 !== 0) false.
 *      - Returns 0. So, commonAncestorIdentifier = 0.
 *
 *    - totalEdgesInPath = nodeDepthLevel[0] + nodeDepthLevel[2] - 2 * nodeDepthLevel[0] = 0 + 2 - 2*0 = 2.
 *
 *    - Calculate pathEdgeWeightTallies:
 *      - weightIterator = 10:
 *        pathEdgeWeightTallies[10] = pathWeightFrequencyAccumulator[0][10] + pathWeightFrequencyAccumulator[2][10] - 2 * pathWeightFrequencyAccumulator[0][10]
 *                                  = 0 + 1 - 2*0 = 1.
 *      - weightIterator = 20:
 *        pathEdgeWeightTallies[20] = pathWeightFrequencyAccumulator[0][20] + pathWeightFrequencyAccumulator[2][20] - 2 * pathWeightFrequencyAccumulator[0][20]
 *                                  = 0 + 1 - 2*0 = 1.
 *      - Other weights are 0.
 *
 *    - mostFrequentWeightCount = Math.max(...pathEdgeWeightTallies) = 1.
 *
 *    - Operations = totalEdgesInPath - mostFrequentWeightCount = 2 - 1 = 1.
 *    - finalResultsArray.push(1).
 *
 * Return finalResultsArray = [1].
 *
 * Time Complexity: O(N * W_max + M * (N + W_max))
 * Space Complexity: O(N * W_max + M)
 */
var minOperationsQueries = function (numberOfNodes, allEdges, allQueries) {
  const treeAdjacencyList = Array.from({ length: numberOfNodes }, () => []);
  for (const currentEdgeEntry of allEdges) {
    const [firstEndpoint, secondEndpoint, edgeIdentifierWeight] =
      currentEdgeEntry;
    treeAdjacencyList[firstEndpoint].push([
      secondEndpoint,
      edgeIdentifierWeight,
    ]);
    treeAdjacencyList[secondEndpoint].push([
      firstEndpoint,
      edgeIdentifierWeight,
    ]);
  }

  const nodeParentArray = new Array(numberOfNodes).fill(-1);
  const nodeDepthLevel = new Array(numberOfNodes).fill(0);
  const pathWeightFrequencyAccumulator = Array.from(
    { length: numberOfNodes },
    () => new Array(27).fill(0)
  );

  function buildTreeMetadata(
    currentVisitedNode,
    previousVisitedNode,
    currentDepthValue
  ) {
    nodeParentArray[currentVisitedNode] = previousVisitedNode;
    nodeDepthLevel[currentVisitedNode] = currentDepthValue;

    if (previousVisitedNode !== -1) {
      for (
        let weightCopyIterator = 1;
        weightCopyIterator <= 26;
        weightCopyIterator++
      ) {
        pathWeightFrequencyAccumulator[currentVisitedNode][weightCopyIterator] =
          pathWeightFrequencyAccumulator[previousVisitedNode][
            weightCopyIterator
          ];
      }
      // Find edge weight from previousVisitedNode to currentVisitedNode
      for (const [neighborCheck, weightCheck] of treeAdjacencyList[
        previousVisitedNode
      ]) {
        if (neighborCheck === currentVisitedNode) {
          pathWeightFrequencyAccumulator[currentVisitedNode][weightCheck]++;
          break;
        }
      }
    }

    for (const [neighborNode, edgeWeightToNeighbor] of treeAdjacencyList[
      currentVisitedNode
    ]) {
      if (neighborNode !== previousVisitedNode) {
        // Ensure the base copy happens here for the child node path, then increment specific weight
        // The previous check to copy from parent and then find edge weight is more explicit
        // to avoid issues if the adjacency list structure is not guaranteed.
        // The current pathWeightFrequencyAccumulator[currentVisitedNode] already has the sum
        // of all weights from previousVisitedNode. We just increment the edge specific to currentVisitedNode.
        // For direct child path to root, it should copy from currentVisitedNode, then add edge.
        // Re-think `pathWeightFrequencyAccumulator` update to match reference solution structure.
        // Reference solution sets `weightCount[next] = [...weightCount[node]]` THEN `weightCount[next][w]++`
        // This means the array is prepared for the child BEFORE the recursive call.
        // My current structure for `pathWeightFrequencyAccumulator[currentVisitedNode]` is for `currentVisitedNode` itself,
        // and the recursion for `neighborNode` should initialize its own from `currentVisitedNode`.
        // The previous `if (previousVisitedNode !== -1)` logic correctly prepares `pathWeightFrequencyAccumulator[currentVisitedNode]`.
        // Then the recursive call should correctly get it prepared.
        // Let's ensure the copy happens *before* the recursive call for the child.

        // The current structure where pathWeightFrequencyAccumulator[currentVisitedNode] is filled
        // from previousVisitedNode, then incremented for the current node's incoming edge, is correct.
        // The recursion then passes currentVisitedNode as previousVisitedNode for the next call.
        buildTreeMetadata(
          neighborNode,
          currentVisitedNode,
          currentDepthValue + 1
        );
      }
    }
  }

  buildTreeMetadata(0, -1, 0);

  function findLowestCommonAncestor(queryNodeOne, queryNodeTwo) {
    let moverNodeA = queryNodeOne;
    let moverNodeB = queryNodeTwo;

    if (nodeDepthLevel[moverNodeA] < nodeDepthLevel[moverNodeB]) {
      [moverNodeA, moverNodeB] = [moverNodeB, moverNodeA];
    }

    while (nodeDepthLevel[moverNodeA] > nodeDepthLevel[moverNodeB]) {
      moverNodeA = nodeParentArray[moverNodeA];
    }

    while (moverNodeA !== moverNodeB) {
      moverNodeA = nodeParentArray[moverNodeA];
      moverNodeB = nodeParentArray[moverNodeB];
    }
    return moverNodeA;
  }

  const finalResultsArray = [];
  for (const currentQueryRequest of allQueries) {
    const [startNodeQuery, endNodeQuery] = currentQueryRequest;
    const commonAncestorIdentifier = findLowestCommonAncestor(
      startNodeQuery,
      endNodeQuery
    );

    const pathEdgeWeightTallies = new Array(27).fill(0);
    for (let weightIterator = 1; weightIterator <= 26; weightIterator++) {
      pathEdgeWeightTallies[weightIterator] =
        pathWeightFrequencyAccumulator[startNodeQuery][weightIterator] +
        pathWeightFrequencyAccumulator[endNodeQuery][weightIterator] -
        2 *
          pathWeightFrequencyAccumulator[commonAncestorIdentifier][
            weightIterator
          ];
    }

    const totalEdgesInPath =
      nodeDepthLevel[startNodeQuery] +
      nodeDepthLevel[endNodeQuery] -
      2 * nodeDepthLevel[commonAncestorIdentifier];
    const mostFrequentWeightCount = Math.max(...pathEdgeWeightTallies);

    finalResultsArray.push(totalEdgesInPath - mostFrequentWeightCount);
  }

  return finalResultsArray;
};
