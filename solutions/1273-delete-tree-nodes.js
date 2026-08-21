/**
 * Delete Tree Nodes
 * Intuition: Deleting a subtree whose values sum to 0 also drops all descendants. Post-order DFS returns (sum, count); if sum is 0, report count 0 so ancestors forget those nodes.
 * Approach: 1. Build childrenAdjacency from parent[]. 2. dfsTraversal sums value plus children; if the sum is 0 return [0,0], else [sum, nodeCount]. 3. Return the count from the root.
 * Dry Run: nodes=7, parent=[-1,0,0,1,2,2,2], value=[1,-2,4,0,-2,-1,-1]
 *   Some child subtrees sum to 0 and contribute 0 nodes. Root remaining count is 2.
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
