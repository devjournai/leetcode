/**
 * Binary Tree Level Order Traversal
 * Intuition: BFS processes nodes level by level: the queue size at the start of an iteration is exactly the current level’s width.
 * Approach: 1. Empty root → []. 2. Queue starts with root. 3. For each level, snapshot queue length, dequeue that many nodes into a values array, enqueue their children. 4. Push each level array onto the result.
 * Dry Run: [3,9,20,null,null,15,7] → [[3],[9,20],[15,7]]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var levelOrder = function (root) {
  const allLevelResults = [];

  if (!root) {
    return allLevelResults;
  }

  const processingQueue = [root];

  while (processingQueue.length > 0) {
    let currentIterationCount = processingQueue.length;
    const currentLevelValues = [];

    for (let nodeIndex = 0; nodeIndex < currentIterationCount; nodeIndex++) {
      const nodeFromQueue = processingQueue.shift();
      currentLevelValues.push(nodeFromQueue.val);

      if (nodeFromQueue.left) {
        processingQueue.push(nodeFromQueue.left);
      }
      if (nodeFromQueue.right) {
        processingQueue.push(nodeFromQueue.right);
      }
    }
    allLevelResults.push(currentLevelValues);
  }

  return allLevelResults;
};
