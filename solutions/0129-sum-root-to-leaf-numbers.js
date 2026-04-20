/**
 * Sum Root To Leaf Numbers
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
      updatedPathNumber,
    );
    let rightSubtreeSum = pathValueCollector(
      currentTreeNode.right,
      updatedPathNumber,
    );

    return leftSubtreeSum + rightSubtreeSum;
  }

  return pathValueCollector(root, 0);
};
