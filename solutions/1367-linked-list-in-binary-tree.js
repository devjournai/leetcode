/**
 * Linked List In Binary Tree
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
      currentTreeNode.left,
    );
    const continueRightBranch = findMatchingPath(
      currentListNode.next,
      currentTreeNode.right,
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
