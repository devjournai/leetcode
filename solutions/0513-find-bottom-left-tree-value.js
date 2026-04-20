/**
 * Find Bottom Left Tree Value
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var findBottomLeftValue = function (root) {
  const levelOrderQueue = [root];
  let ultimateLeftmostValue = root.val;

  while (levelOrderQueue.length > 0) {
    const currentLevelNodeCount = levelOrderQueue.length;
    ultimateLeftmostValue = levelOrderQueue[0].val;

    for (
      let nodeTraversalIndex = 0;
      nodeTraversalIndex < currentLevelNodeCount;
      nodeTraversalIndex++
    ) {
      const processingNode = levelOrderQueue.shift();

      if (processingNode.left) {
        levelOrderQueue.push(processingNode.left);
      }
      if (processingNode.right) {
        levelOrderQueue.push(processingNode.right);
      }
    }
  }

  return ultimateLeftmostValue;
};
