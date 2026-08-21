/**
 * Maximum Depth Of Binary Tree
 * Intuition: Depth is the number of BFS levels from the root to the farthest leaf; increment a counter once per level while the queue is non-empty.
 * Approach: 1. Null root → 0. 2. Queue the root. 3. While the queue has nodes, increment depth, then dequeue the current level’s count of nodes and enqueue their children. 4. Return the depth counter.
 * Dry Run: [3,9,20,null,null,15,7] → three levels processed → 3
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }

  let currentLevelDepth = 0;
  const processingQueue = [root];

  while (processingQueue.length > 0) {
    currentLevelDepth++;
    let nodesAtCurrentLevelCount = processingQueue.length;

    for (
      let currentIndex = 0;
      currentIndex < nodesAtCurrentLevelCount;
      currentIndex++
    ) {
      const currentNode = processingQueue.shift();

      if (currentNode.left) {
        processingQueue.push(currentNode.left);
      }
      if (currentNode.right) {
        processingQueue.push(currentNode.right);
      }
    }
  }

  return currentLevelDepth;
};
