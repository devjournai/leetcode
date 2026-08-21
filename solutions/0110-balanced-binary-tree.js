/**
 * Balanced Binary Tree
 * Intuition: A node is balanced only if both subtrees are balanced and their heights differ by at most 1. Returning height or a -1 failure from a postorder walk checks this in one pass.
 * Approach: 1. Null returns height 0. 2. Recurse left then right; if either returns -1, propagate -1. 3. If |leftH - rightH| > 1 return -1, else return 1 + max(leftH, rightH). 4. Root is balanced iff the result is not -1.
 * Dry Run: Tree 3 / 9, 20 / 15, 7. Leaves height 0, 20 height 1, 3 height 2, diffs all ≤ 1 so true. Tree 1 / 2 / 3 is left-skewed: at 2 the height gap is 2 → -1 → false.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var isBalanced = function (root) {
  const calculateBalanceAndHeight = (currentPntr) => {
    if (!currentPntr) {
      return 0;
    }

    const heightLeftSubtree = calculateBalanceAndHeight(currentPntr.left);
    if (heightLeftSubtree === -1) {
      return -1;
    }

    const heightRightSubtree = calculateBalanceAndHeight(currentPntr.right);
    if (heightRightSubtree === -1) {
      return -1;
    }

    const heightDifference = Math.abs(heightLeftSubtree - heightRightSubtree);
    if (heightDifference > 1) {
      return -1;
    }

    const maximumHeight = 1 + Math.max(heightLeftSubtree, heightRightSubtree);
    return maximumHeight;
  };

  const finalCheckResult = calculateBalanceAndHeight(root);
  return finalCheckResult !== -1;
};
