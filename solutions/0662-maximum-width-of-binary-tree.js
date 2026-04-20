/**
 * Maximum Width Of Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var widthOfBinaryTree = function (root) {
  if (!root) {
    return 0;
  }

  const nodeIndexingQueue = [[root, 0n]];
  let maximumTreeWidth = 0n;

  while (nodeIndexingQueue.length > 0) {
    const nodesInThisLevel = nodeIndexingQueue.splice(
      0,
      nodeIndexingQueue.length,
    );

    const levelStartingIndex = nodesInThisLevel[0][1];
    let levelEndingIndex = levelStartingIndex;

    for (const currentEntry of nodesInThisLevel) {
      const treeNode = currentEntry[0];
      const nodePositionIndex = currentEntry[1];

      levelEndingIndex = nodePositionIndex;

      if (treeNode.left) {
        nodeIndexingQueue.push([treeNode.left, nodePositionIndex * 2n]);
      }
      if (treeNode.right) {
        nodeIndexingQueue.push([treeNode.right, nodePositionIndex * 2n + 1n]);
      }
    }

    const currentLevelWidth = levelEndingIndex - levelStartingIndex + 1n;
    if (currentLevelWidth > maximumTreeWidth) {
      maximumTreeWidth = currentLevelWidth;
    }
  }

  return Number(maximumTreeWidth);
};
