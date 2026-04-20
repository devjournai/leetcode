/**
 * Print Binary Tree
 * Time Complexity: O(H * 2^H)
 * Space Complexity: O(H * 2^H)
 */
var printTree = function (rootNode) {
  function calculateHeight(currentTreeElement) {
    if (!currentTreeElement) {
      return -1;
    }
    let leftSubtreeHeight = calculateHeight(currentTreeElement.left);
    let rightSubtreeHeight = calculateHeight(currentTreeElement.right);
    let combinedHeight = 1 + Math.max(leftSubtreeHeight, rightSubtreeHeight);
    return combinedHeight;
  }

  let treeDepth = calculateHeight(rootNode);
  let totalColumns = Math.pow(2, treeDepth + 1) - 1;
  let outputMatrix = new Array(treeDepth + 1).fill(null).map(() => {
    return new Array(totalColumns).fill("");
  });

  function fillMatrix(nodeToPlace, levelIndex, columnIndex, maximumDepth) {
    if (!nodeToPlace) {
      return;
    }
    let valString = nodeToPlace.val.toString();
    outputMatrix[levelIndex][columnIndex] = valString;

    let powerValue = Math.pow(2, maximumDepth - levelIndex - 1);
    let leftOffset = columnIndex - powerValue;
    let rightOffset = columnIndex + powerValue;

    fillMatrix(nodeToPlace.left, levelIndex + 1, leftOffset, maximumDepth);
    fillMatrix(nodeToPlace.right, levelIndex + 1, rightOffset, maximumDepth);
  }

  fillMatrix(rootNode, 0, Math.floor((totalColumns - 1) / 2), treeDepth);

  return outputMatrix;
};
