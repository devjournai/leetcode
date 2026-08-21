/**
 * Sum Root To Leaf Numbers
 * Intuition: Each root-to-leaf path is a decimal number. Passing valueSoFar * 10 + node.val down the tree builds that number; leaves contribute it, internal nodes sum both sides.
 * Approach: 1. Helper: null → 0. 2. updated = valueSoFar * 10 + val. 3. Leaf returns updated. 4. Otherwise return left(updated) + right(updated). Start from (root, 0).
 * Dry Run: 1 / 2, 3. Paths 12 and 13. Sum 25.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var sumNumbers = function (root) {
  function pathValueCollector(currentTreeNode, valueSoFar) {
    if (!currentTreeNode) {
      return 0;
    }

    let updatedPathNumber = valueSoFar * 10 + currentTreeNode.val;

    if (!currentTreeNode.left && !currentTreeNode.right) {
      return updatedPathNumber;
    }

    let leftSubtreeSum = pathValueCollector(
      currentTreeNode.left,
      updatedPathNumber
    );
    let rightSubtreeSum = pathValueCollector(
      currentTreeNode.right,
      updatedPathNumber
    );

    return leftSubtreeSum + rightSubtreeSum;
  }

  return pathValueCollector(root, 0);
};
