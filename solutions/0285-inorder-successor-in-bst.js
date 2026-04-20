/**
 * Inorder Successor In Bst
 * Time Complexity: O(H)
 * Space Complexity: O(1)
 */
var inorderSuccessor = function (root, p) {
  let candidateSuccessor = null;
  let currentTraversalNode = root;

  while (currentTraversalNode) {
    if (p.val < currentTraversalNode.val) {
      candidateSuccessor = currentTraversalNode;
      currentTraversalNode = currentTraversalNode.left;
    } else {
      currentTraversalNode = currentTraversalNode.right;
    }
  }
  return candidateSuccessor;
};
