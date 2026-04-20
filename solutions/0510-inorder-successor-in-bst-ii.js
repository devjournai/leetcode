/**
 * Inorder Successor In Bst II
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
