/**
 * Maximum Depth Of N Ary Tree
 * Intuition: Depth is the number of BFS levels from the root. Each level processes the current queue size and enqueues children.
 * Approach: 1. Empty root → 0. 2. Queue with root, `levelCounter = 0`. 3. While the queue is nonempty, increment the counter, then for that level's size `shift` nodes and push their children. 4. Return `levelCounter`.
 * Dry Run: root 1 with children 3,2,4; 3 has 5,6.
 *   - Level 1: 1. Level 2: 3,2,4. Level 3: 5,6. Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }

  let nodeQueue = [root];
  let levelCounter = 0;

  while (nodeQueue.length > 0) {
    let currentLevelSize = nodeQueue.length;
    levelCounter++;

    for (
      let iterationCount = 0;
      iterationCount < currentLevelSize;
      iterationCount++
    ) {
      let processedNode = nodeQueue.shift();
      if (processedNode.children) {
        for (let childElement of processedNode.children) {
          if (childElement) {
            nodeQueue.push(childElement);
          }
        }
      }
    }
  }

  return levelCounter;
};
