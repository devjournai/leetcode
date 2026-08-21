/**
 * Closest Binary Search Tree Value
 * Intuition: Walk the BST toward `target`, remembering the closest value seen (tie → smaller value). Only one child is explored, so the path is O(H).
 * Approach: 1. `nearestValue = root.val`. 2. At each node, if |val-target| is smaller, or equal and val is smaller, update. 3. Recurse left if target < val, right if target > val, else stop. 4. Return `nearestValue`.
 * Dry Run: tree 4 with left 2 (children 1, 3) and right 5; target = 3.714.
 *   - Visit 4 (best=4), go left to 2 (|2-t|>|4-t| so keep 4), go right to 3 (|3-t|>|4-t| so keep 4). Return 4.
 * Time Complexity: O(H)
 * Space Complexity: O(H)
 */
var closestValue = function (root, target) {
  let nearestValue = root.val;

  function traverseTree(currentTreeNode) {
    if (!currentTreeNode) {
      return;
    }

    let differenceFromCurrent = Math.abs(currentTreeNode.val - target);
    let minimalDifference = Math.abs(nearestValue - target);

    if (differenceFromCurrent < minimalDifference) {
      nearestValue = currentTreeNode.val;
    } else if (
      differenceFromCurrent === minimalDifference &&
      currentTreeNode.val < nearestValue
    ) {
      nearestValue = currentTreeNode.val;
    }

    if (target < currentTreeNode.val) {
      traverseTree(currentTreeNode.left);
    } else if (target > currentTreeNode.val) {
      traverseTree(currentTreeNode.right);
    }
  }

  traverseTree(root);
  return nearestValue;
};
