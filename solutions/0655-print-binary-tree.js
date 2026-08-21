/**
 * Print Binary Tree
 * Intuition: Height h needs a (h+1) by (2^{h+1}-1) grid; each node sits at mid of its interval, children at ± 2^{h-level-1}.
 * Approach: 1. `calculateHeight` (null = -1). 2. Allocate `outputMatrix` of empty strings. 3. `fillMatrix` writes `val` at (level, col) then recurses left/right with that power offset. 4. Start at column floor((cols-1)/2).
 * Dry Run: [1,2]. Height 1, cols=3. Root at col 1, left child at col 0. Matrix [["","1",""],["2","",""]].
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
