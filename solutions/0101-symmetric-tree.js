/**
 * Symmetric Tree
 * Intuition: A tree is symmetric if every pair of mirrored nodes is equal; BFS can compare those pairs by enqueueing (left.left, right.right) and (left.right, right.left).
 * Approach: 1. Empty root is true. 2. Queue the root’s left and right. 3. Dequeue a pair: both null continue; one null or values differ → false. 4. Enqueue outer children then inner children. 5. Empty queue → true.
 * Dry Run: [1,2,2,3,4,4,3] pairs (2,2),(3,3),(4,4) all match → true
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isSymmetric = function (root) {
  if (!root) {
    return true;
  }

  const nodeComparisonQueue = [];
  nodeComparisonQueue.push(root.left);
  nodeComparisonQueue.push(root.right);

  while (nodeComparisonQueue.length > 0) {
    let firstNodeInPair = nodeComparisonQueue.shift();
    let secondNodeInPair = nodeComparisonQueue.shift();

    if (!firstNodeInPair && !secondNodeInPair) {
      continue;
    }

    if (
      !firstNodeInPair ||
      !secondNodeInPair ||
      firstNodeInPair.val !== secondNodeInPair.val
    ) {
      return false;
    }

    nodeComparisonQueue.push(firstNodeInPair.left);
    nodeComparisonQueue.push(secondNodeInPair.right);

    nodeComparisonQueue.push(firstNodeInPair.right);
    nodeComparisonQueue.push(secondNodeInPair.left);
  }

  return true;
};
