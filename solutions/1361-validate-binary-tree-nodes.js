/**
 * Validate Binary Tree Nodes
 * Intuition: A valid binary tree has exactly one root (in-degree 0), every other node has in-degree 1, and DFS from the root must reach all n nodes without hitting a cycle.
 * Approach: 1. Count parents for each node from leftChild and rightChild. 2. Reject any node with more than one parent. 3. Identify the unique node with zero parents as the root; reject zero or multiple roots. 4. DFS from the root, marking visits and aborting on a cycle. 5. Accept only if the DFS visits exactly n nodes.
 * Dry Run: n = 4, leftChild = [1, -1, 3, -1], rightChild = [2, -1, -1, -1].
 *   - Parent counts: [0, 1, 1, 1] so root = 0.
 *   - DFS(0) visits 0, 1, 2, 3 (4 nodes). Return true.
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
    traversalVisitedSet
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
      traversalVisitedSet
    );
    const rightSubtreeNodeCount = depthFirstSearchCount(
      rightChild[currentNodeForTraversal],
      traversalVisitedSet
    );

    if (leftSubtreeNodeCount === -1 || rightSubtreeNodeCount === -1) {
      return -1;
    }

    return 1 + leftSubtreeNodeCount + rightSubtreeNodeCount;
  };

  const totalNodesReached = depthFirstSearchCount(
    designatedRoot,
    visitedNodesRecord
  );

  return totalNodesReached === n;
};
