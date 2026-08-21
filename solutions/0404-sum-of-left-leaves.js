/**
 * Sum Of Left Leaves
 * Intuition: A left leaf is a node with no children that was reached as a left child (`isNodeLeftChild`). Recurse and sum those values.
 * Approach: 1. `calculateLeftLeafSum(node, isLeft)`: null → 0; leaf and isLeft → `val`. 2. Recurse left with true, right with false, add the two sums. 3. Call from `root` with false so the root is never counted as a left leaf.
 * Dry Run: 3 / 9 20 /   15 7, 9 is a left leaf, 15 is a left leaf. 9+15=24.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var sumOfLeftLeaves = function (root) {
  function calculateLeftLeafSum(currentNode, isNodeLeftChild) {
    if (!currentNode) {
      return 0;
    }

    if (!currentNode.left && !currentNode.right && isNodeLeftChild) {
      return currentNode.val;
    }

    let sumFromLeftSubtree = calculateLeftLeafSum(currentNode.left, true);
    let sumFromRightSubtree = calculateLeftLeafSum(currentNode.right, false);

    return sumFromLeftSubtree + sumFromRightSubtree;
  }

  return calculateLeftLeafSum(root, false);
};
