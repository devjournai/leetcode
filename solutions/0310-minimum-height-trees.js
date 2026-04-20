/**
    * Minimum Height Trees
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
      const neighborOfLeaf = adjacencyLists[processingLeaf].values().next().value;
      adjacencyLists[neighborOfLeaf].delete(processingLeaf);
      if (adjacencyLists[neighborOfLeaf].size === 1) {
        nextIterationLeaves.push(neighborOfLeaf);
      }
    }
    currentLeaves = nextIterationLeaves;
  }

  return currentLeaves;
};