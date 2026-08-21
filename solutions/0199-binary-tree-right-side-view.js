/**
 * Binary Tree Right Side View
 * Intuition: From the right, you see the last node of each level. BFS level-order and record the node when its index is the last in that level.
 * Approach: 1. Empty tree → []. 2. Queue the root. 3. For each level, dequeue every node, enqueue left then right, and if this is the last index of the level push its value. 4. Return the collected values.
 * Dry Run: tree 1 with left 2 (right child 5) and right 3 (right child 4).
 *   - Level 0: last is 1 → [1].
 *   - Level 1: last is 3 → [1,3].
 *   - Level 2: last is 4 → [1,3,4].
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var rightSideView = function (root) {
  if (!root) {
    return [];
  }

  const rightmostValues = [];
  const nodeProcessingQueue = [root];

  while (nodeProcessingQueue.length > 0) {
    let levelElementCount = nodeProcessingQueue.length;
    let currentNodeForLevel = null;

    for (
      let currentLevelIndex = 0;
      currentLevelIndex < levelElementCount;
      currentLevelIndex++
    ) {
      currentNodeForLevel = nodeProcessingQueue.shift();

      if (currentLevelIndex === levelElementCount - 1) {
        rightmostValues.push(currentNodeForLevel.val);
      }

      if (currentNodeForLevel.left) {
        nodeProcessingQueue.push(currentNodeForLevel.left);
      }

      if (currentNodeForLevel.right) {
        nodeProcessingQueue.push(currentNodeForLevel.right);
      }
    }
  }

  return rightmostValues;
};
