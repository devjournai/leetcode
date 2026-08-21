/**
 * Linked List In Binary Tree
 * Intuition: The linked list is a downward path in the tree. Try matching the whole list from every tree node, and recurse into left/right if the match does not start there.
 * Approach: 1. findMatchingPath walks list and tree together, requiring equal values and succeeding if the list ends. 2. isSubPath returns true if a match starts at the current node or at any descendant.
 * Dry Run: list 4→2, tree root 1 with left 4 (right 2).
 *   - Match fails at root (1 ≠ 4).
 *   - At node 4, 4 matches then 2 matches left child. Return true.
 * Time Complexity: O(N * M)
 * Space Complexity: O(H + M)
 */
var isSubPath = function (head, root) {
  function findMatchingPath(currentListNode, currentTreeNode) {
    if (!currentListNode) {
      return true;
    }
    if (!currentTreeNode) {
      return false;
    }
    if (currentListNode.val !== currentTreeNode.val) {
      return false;
    }

    const continueLeftBranch = findMatchingPath(
      currentListNode.next,
      currentTreeNode.left
    );
    const continueRightBranch = findMatchingPath(
      currentListNode.next,
      currentTreeNode.right
    );
    return continueLeftBranch || continueRightBranch;
  }

  if (!head) {
    return true;
  }
  if (!root) {
    return false;
  }

  const pathBeginsHere = findMatchingPath(head, root);
  const pathBeginsLeft = isSubPath(head, root.left);
  const pathBeginsRight = isSubPath(head, root.right);

  return pathBeginsHere || pathBeginsLeft || pathBeginsRight;
};
