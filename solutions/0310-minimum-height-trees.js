/**
 * Minimum Height Trees
 * Intuition: MHTs are the centroids of the tree. Repeatedly peel leaves (degree 1) until at most two nodes remain.
 * Approach: 1. n=1 → [0]. 2. Build adjacency Sets from edges. 3. Collect current leaves (size===1). 4. While remaining > 2, drop that layer, delete each leaf from its neighbor, and enqueue neighbors that now have degree 1. 5. Return the leftover leaves.
 * Dry Run: n=4, edges=[[1,0],[1,2],[1,3]].
 *   - Leaves 0,2,3; remaining becomes 1. Loop ends with [1].
 *   - Return [1].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findMinHeightTrees = function (n, edges) {
  if (n === 1) return [0];

  const adjacencyLists = new Array(n).fill().map(() => new Set());
  for (const [nodeOne, nodeTwo] of edges) {
    adjacencyLists[nodeOne].add(nodeTwo);
    adjacencyLists[nodeTwo].add(nodeOne);
  }

  let currentLeaves = [];
  for (let indexCounter = 0; indexCounter < n; indexCounter++) {
    if (adjacencyLists[indexCounter].size === 1) {
      currentLeaves.push(indexCounter);
    }
  }

  let totalNodesRemaining = n;
  while (totalNodesRemaining > 2) {
    totalNodesRemaining -= currentLeaves.length;
    const nextIterationLeaves = [];
    for (const processingLeaf of currentLeaves) {
      const neighborOfLeaf = adjacencyLists[processingLeaf]
        .values()
        .next().value;
      adjacencyLists[neighborOfLeaf].delete(processingLeaf);
      if (adjacencyLists[neighborOfLeaf].size === 1) {
        nextIterationLeaves.push(neighborOfLeaf);
      }
    }
    currentLeaves = nextIterationLeaves;
  }

  return currentLeaves;
};
