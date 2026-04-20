/**
 * Split Bst
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var splitBST = function (root, target) {
  if (!root) {
    return [null, null];
  }

  if (root.val <= target) {
    const resultFromRightSplit = splitBST(root.right, target);
    const leftPartFromRight = resultFromRightSplit[0];
    const rightPartFromRight = resultFromRightSplit[1];

    root.right = leftPartFromRight;
    return [root, rightPartFromRight];
  } else {
    const resultFromLeftSplit = splitBST(root.left, target);
    const leftPartFromLeft = resultFromLeftSplit[0];
    const rightPartFromLeft = resultFromLeftSplit[1];

    root.left = rightPartFromLeft;
    return [leftPartFromLeft, root];
  }
};
