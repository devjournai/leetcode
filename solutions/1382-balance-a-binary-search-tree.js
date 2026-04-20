/**
 * Balance a Binary Search Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var balanceBST = function (rootNodeInput) {
  const nodeValuesArray = [];

  function traverseAndStore(currentVisitingNode) {
    if (currentVisitingNode === null) {
      return;
    }
    traverseAndStore(currentVisitingNode.left);
    nodeValuesArray.push(currentVisitingNode.val);
    traverseAndStore(currentVisitingNode.right);
  }

  traverseAndStore(rootNodeInput);

  function constructBstFromSorted(startIndexForBuild, endIndexForBuild) {
    if (startIndexForBuild > endIndexForBuild) {
      return null;
    }

    const midIndexForBuild = Math.floor(
      (startIndexForBuild + endIndexForBuild) / 2,
    );
    const currentTreeNode = new TreeNode(nodeValuesArray[midIndexForBuild]);

    currentTreeNode.left = constructBstFromSorted(
      startIndexForBuild,
      midIndexForBuild - 1,
    );
    currentTreeNode.right = constructBstFromSorted(
      midIndexForBuild + 1,
      endIndexForBuild,
    );

    return currentTreeNode;
  }

  const finalBalancedTree = constructBstFromSorted(
    0,
    nodeValuesArray.length - 1,
  );
  return finalBalancedTree;
};
