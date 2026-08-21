/**
 * Maximum Width Of Binary Tree
 * Intuition: Width of a level is lastIndex - firstIndex + 1 in heap numbering. BFS stores BigInt indices (left 2i, right 2i+1) so deep trees do not overflow.
 * Approach: 1. Queue `[root, 0n]`. 2. Drain the level with splice. 3. First node's index is `levelStartingIndex`; last updates `levelEndingIndex`; enqueue children. 4. Track max width, return `Number(...)`.
 * Dry Run: [1,3,2,5,3,null,9].
 *   - Level 0 width 1. Level 1 indices 0,1 width 2. Level 2: 0,1,3 width 4. Return 4.
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
      nodeIndexingQueue.length
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
