/**
 * Insert Into A Binary Search Tree
 * Intuition: Walk iteratively to a null child on the BST path for `val`, then attach a new `TreeNode`. Empty tree becomes that node.
 * Approach: 1. If !root, return new TreeNode(val). 2. `currentTraversalNode` loop: if val < node go left (insert if missing) else go right. 3. Return original root.
 * Dry Run: insert 5 into 4 / 2 7 / 1 3. 5>4 go right; 5<7, no left → attach 5 as 7.left. Return root 4.
 * Time Complexity: O(H)
 * Space Complexity: O(1)
 */
var insertIntoBST = function (root, val) {
  if (!root) {
    let newRootNode = new TreeNode(val);
    return newRootNode;
  }

  let currentTraversalNode = root;

  while (true) {
    if (val < currentTraversalNode.val) {
      if (!currentTraversalNode.left) {
        let leftChildNode = new TreeNode(val);
        currentTraversalNode.left = leftChildNode;
        break;
      } else {
        currentTraversalNode = currentTraversalNode.left;
      }
    } else {
      // val > currentTraversalNode.val
      if (!currentTraversalNode.right) {
        let rightChildNode = new TreeNode(val);
        currentTraversalNode.right = rightChildNode;
        break;
      } else {
        currentTraversalNode = currentTraversalNode.right;
      }
    }
  }

  return root;
};
