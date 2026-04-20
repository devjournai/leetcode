/**
 * Validate Binary Tree Nodes
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  const parentTracker = new Array(n).fill(0);

  for (let currentParentNode = 0; currentParentNode < n; currentParentNode++) {
    const leftChildIdentifier = leftChild[currentParentNode];
    const rightChildIdentifier = rightChild[currentParentNode];

    if (leftChildIdentifier !== -1) {
      parentTracker[leftChildIdentifier]++;
    }
    if (rightChildIdentifier !== -1) {
      parentTracker[rightChildIdentifier]++;
    }
  }

  let designatedRoot = -1;

  for (
    let nodeIdentifierForParentCheck = 0;
    nodeIdentifierForParentCheck < n;
    nodeIdentifierForParentCheck++
  ) {
    const currentParentCount = parentTracker[nodeIdentifierForParentCheck];

    if (currentParentCount > 1) {
      return false;
    }

    if (currentParentCount === 0) {
      if (designatedRoot !== -1) {
        return false;
      }
      designatedRoot = nodeIdentifierForParentCheck;
    }
  }

  if (designatedRoot === -1) {
    return false;
  }

  const visitedNodesRecord = new Set();

  const depthFirstSearchCount = (
    currentNodeForTraversal,
    traversalVisitedSet,
  ) => {
    if (currentNodeForTraversal === -1) {
      return 0;
    }

    if (traversalVisitedSet.has(currentNodeForTraversal)) {
      return -1;
    }

    traversalVisitedSet.add(currentNodeForTraversal);

    const leftSubtreeNodeCount = depthFirstSearchCount(
      leftChild[currentNodeForTraversal],
      traversalVisitedSet,
    );
    const rightSubtreeNodeCount = depthFirstSearchCount(
      rightChild[currentNodeForTraversal],
      traversalVisitedSet,
    );

    if (leftSubtreeNodeCount === -1 || rightSubtreeNodeCount === -1) {
      return -1;
    }

    return 1 + leftSubtreeNodeCount + rightSubtreeNodeCount;
  };

  const totalNodesReached = depthFirstSearchCount(
    designatedRoot,
    visitedNodesRecord,
  );

  return totalNodesReached === n;
};
