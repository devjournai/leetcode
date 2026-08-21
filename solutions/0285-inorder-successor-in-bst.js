/**
 * Inorder Successor In Bst
 * Intuition: In a BST the successor of p is the smallest node greater than p. Walking left whenever p is smaller records that ancestor as a candidate.
 * Approach: 1. Start at root. 2. If p.val < node.val, set candidate=node and go left; else go right. 3. Return the last candidate (or null).
 * Dry Run: tree 2 with left 1 and right 3; p=1.
 *   - 1<2 → candidate=2, go left to 1. 1 not < 1 → go right (null).
 *   - Return 2.
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
