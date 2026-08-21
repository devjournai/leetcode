/**
 * Increasing Order Search Tree
 * Intuition: Inorder of a BST is sorted. Emit a right-only chain by attaching a fresh node for each inorder value onto a dummy's `right` spine.
 * Approach: 1. Dummy `startNode` and `movePointer`. 2. `processTreeInorder`: recurse left, set `movePointer.right = new TreeNode(val)` and advance, recurse right. 3. Return `startNode.right`.
 * Dry Run: tree [5,3,6,2,4,null,8,1,null,null,null,7,9].
 *   - Inorder 1,2,3,4,5,6,7,8,9 becomes 1→2→…→9 with all left null.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var increasingBST = function (root) {
  const startNode = new TreeNode(0);
  let movePointer = startNode;

  function processTreeInorder(presentNode) {
    if (presentNode === null) {
      return;
    }

    processTreeInorder(presentNode.left);

    movePointer.right = new TreeNode(presentNode.val);
    movePointer = movePointer.right;

    processTreeInorder(presentNode.right);
  }

  processTreeInorder(root);

  return startNode.right;
};
