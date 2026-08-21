/**
 * Validate Binary Search Tree
 * Intuition: Inorder traversal of a BST is strictly increasing; walk inorder iteratively and fail if the current value is not greater than the previous.
 * Approach: 1. Stack-based inorder: push all the way left. 2. Pop, if previousValue is set and node.val ≤ previousValue return false. 3. Set previousValue and continue to the right child. 4. If the walk finishes, it is a BST.
 * Dry Run: [2,1,3] inorder 1,2,3 increasing → true; [5,1,4,null,null,3,6] inorder 1,5,3 → 3≤5 → false
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var isValidBST = function (root) {
  let nodeStack = [];
  let previousValue = null;
  let currentProcessingNode = root;

  while (currentProcessingNode !== null || nodeStack.length > 0) {
    while (currentProcessingNode !== null) {
      nodeStack.push(currentProcessingNode);
      currentProcessingNode = currentProcessingNode.left;
    }

    let nextTreeNode = nodeStack.pop();

    if (previousValue !== null && nextTreeNode.val <= previousValue) {
      return false;
    }

    previousValue = nextTreeNode.val;
    currentProcessingNode = nextTreeNode.right;
  }

  return true;
};
