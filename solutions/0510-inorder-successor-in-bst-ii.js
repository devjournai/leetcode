/**
 * Inorder Successor In Bst II
 * Intuition: If the node has a right child, the successor is the leftmost node of that subtree. Otherwise walk parents until the node is a left child; that parent is the successor (or null).
 * Approach: 1. If `node.right` exists, walk `left` from that child until null and return it. 2. Else climb via `parent` while the node is its parent's right child. 3. Return `upwardNavigator.parent`.
 * Dry Run: BST 2 with left 1 and right 3; query node 1 (no right).
 *   - Climb: 1 is left of 2. Return parent 2.
 * Time Complexity: O(H)
 * Space Complexity: O(1)
 */
var inorderSuccessor = function (node) {
  if (node.right) {
    let rightSubtreeRoot = node.right;
    let deepestLeftNode = rightSubtreeRoot;
    while (deepestLeftNode.left) {
      deepestLeftNode = deepestLeftNode.left;
    }
    return deepestLeftNode;
  }

  let upwardNavigator = node;
  while (
    upwardNavigator.parent &&
    upwardNavigator.parent.right === upwardNavigator
  ) {
    upwardNavigator = upwardNavigator.parent;
  }
  return upwardNavigator.parent;
};
