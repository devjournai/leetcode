/**
 * Binary Search Tree To Greater Sum Tree
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var bstToGst = function (root) {
  let runningTotal = 0;

  function convertTree(currentNode) {
    if (currentNode === null) {
      return;
    }

    convertTree(currentNode.right);

    runningTotal += currentNode.val;
    currentNode.val = runningTotal;

    convertTree(currentNode.left);
  }

  convertTree(root);
  return root;
};
