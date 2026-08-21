/**
 * Find Bottom Left Tree Value
 * Intuition: Level-order BFS visits the tree top-down left-to-right. The first node of each level is the leftmost value; after the last level, that first node is the bottom-left.
 * Approach: 1. Queue starts with `root`; `ultimateLeftmostValue` starts as `root.val`. 2. For each level, set `ultimateLeftmostValue` to `levelOrderQueue[0].val`, then enqueue left then right children. 3. Return the last level's leftmost.
 * Dry Run: tree 1 / 2 3, 2 has left 4.
 *   - Level 1: leftmost 1. Level 2: 2. Level 3: 4. Return 4.
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
