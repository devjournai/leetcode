/**
 * Binary Tree Upside Down
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var upsideDownBinaryTree = function (root) {
  if (root === null || root.left === null) {
    return root;
  }

  let currentTraversalNode = root;
  let newRootCandidate = null;
  let newLeftPointerTarget = null;

  while (currentTraversalNode !== null) {
    let nextIterationNode = currentTraversalNode.left;
    let originalRightChild = currentTraversalNode.right;

    currentTraversalNode.left = newLeftPointerTarget;
    currentTraversalNode.right = newRootCandidate;

    newRootCandidate = currentTraversalNode;
    newLeftPointerTarget = originalRightChild;
    currentTraversalNode = nextIterationNode;
  }

  return newRootCandidate;
};
