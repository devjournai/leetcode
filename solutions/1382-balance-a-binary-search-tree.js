/**
 * Balance a Binary Search Tree
 * Intuition: Inorder traversal of a BST is sorted. Rebuild by always picking the middle of the remaining range so heights differ by at most one.
 * Approach: 1. Inorder collect all values. 2. Recursively build: mid becomes root, left range is left child, right range is right child. 3. Return the new root.
 * Dry Run: skewed tree 1→2→3.
 *   - Values [1,2,3], mid 2 as root, left 1, right 3. Balanced height 2.
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
      (startIndexForBuild + endIndexForBuild) / 2
    );
    const currentTreeNode = new TreeNode(nodeValuesArray[midIndexForBuild]);

    currentTreeNode.left = constructBstFromSorted(
      startIndexForBuild,
      midIndexForBuild - 1
    );
    currentTreeNode.right = constructBstFromSorted(
      midIndexForBuild + 1,
      endIndexForBuild
    );

    return currentTreeNode;
  }

  const finalBalancedTree = constructBstFromSorted(
    0,
    nodeValuesArray.length - 1
  );
  return finalBalancedTree;
};
