/**
 * Binary Tree Upside Down
 * Intuition: In a left-skewed tree, the original left child becomes the new parent, the original right becomes the new left, and the original node becomes the new right. Walking down the left spine while rewriting pointers in place avoids recursion.
 * Approach: 1. If `root` is null or has no left, return `root`. 2. Keep `currentTraversalNode`, `newRootCandidate`, and `newLeftPointerTarget` (initially null). 3. Each step: save `nextIterationNode = left` and `originalRightChild = right`, then set current.left to `newLeftPointerTarget` and current.right to `newRootCandidate`. 4. Advance: `newRootCandidate = current`, `newLeftPointerTarget = originalRightChild`, `current = nextIterationNode`. 5. Return `newRootCandidate`.
 * Dry Run: 1 with left 2 (right of 1 is 3), 2 has left 4 and right 5
 * After walk: new root 4, 4.left=5, 4.right=2, 2.left=3, 2.right=1
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
