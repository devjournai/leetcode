/**
 * Delete Tree Nodes
 * Time Complexity: O(nodes)
 * Space Complexity: O(nodes)
 */
var deleteTreeNodes = function (nodes, parent, value) {
  const childrenAdjacency = new Array(nodes).fill().map(() => []);

  for (let indexIterator = 1; indexIterator < nodes; indexIterator++) {
    const childNodeIdentifier = indexIterator;
    const parentNodeIdentifier = parent[childNodeIdentifier];
    childrenAdjacency[parentNodeIdentifier].push(childNodeIdentifier);
  }

  const dfsTraversal = (currentNodeId) => {
    let currentSubtreeValueSum = value[currentNodeId];
    let currentSubtreeNodeCount = 1;

    for (const childIdentifier of childrenAdjacency[currentNodeId]) {
      const childResultPair = dfsTraversal(childIdentifier);
      const childSubtreeTotalValue = childResultPair[0];
      const childSubtreeTotalNodes = childResultPair[1];

      currentSubtreeValueSum += childSubtreeTotalValue;
      currentSubtreeNodeCount += childSubtreeTotalNodes;
    }

    if (currentSubtreeValueSum === 0) {
      return [0, 0];
    }

    return [currentSubtreeValueSum, currentSubtreeNodeCount];
  };

  const rootResultPair = dfsTraversal(0);
  const finalNodeCount = rootResultPair[1];
  return finalNodeCount;
};
