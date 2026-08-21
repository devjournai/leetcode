/**
 * Trim A Binary Search Tree
 * Intuition: BST order means a node below `low` can only keep its right subtree, and a node above `high` only its left. In-range nodes keep both children after trimming them.
 * Approach: 1. Null → null. 2. If val < low, return `trimBST(right)`. 3. If val > high, return `trimBST(left)`. 4. Else assign trimmed left/right and return the node.
 * Dry Run: root=[1,0,2], low=1, high=2.
 *   - Root 1 in range. Left 0 < 1 → drop (null). Right 2 kept. Return [1,null,2].
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var trimBST = function (root, low, high) {
  if (!root) {
    return null;
  }

  let nodeToProcess = root;

  if (nodeToProcess.val < low) {
    return trimBST(nodeToProcess.right, low, high);
  } else if (nodeToProcess.val > high) {
    return trimBST(nodeToProcess.left, low, high);
  } else {
    nodeToProcess.left = trimBST(nodeToProcess.left, low, high);
    nodeToProcess.right = trimBST(nodeToProcess.right, low, high);
    return nodeToProcess;
  }
};
