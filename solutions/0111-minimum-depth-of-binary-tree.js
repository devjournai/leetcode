/**
 * Minimum Depth Of Binary Tree
 * Intuition: The shortest root-to-leaf path is the first leaf reached in level-order BFS, so we can stop as soon as a node has no children.
 * Approach: 1. Null root is depth 0. 2. Queue the root at level 1. 3. For each level, dequeue every node; if it is a leaf, return the current level. 4. Otherwise enqueue children and increment the level after the level finishes.
 * Dry Run: Tree 3 / 9, 20 / 15, 7. Level 1: 3. Level 2: 9 is a leaf → return 2 (not 3, the longer path through 20).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minDepth = function (root) {
  if (!root) {
    return 0;
  }

  let currentLevelNumber = 1;
  let nodesInQueue = [root];

  while (nodesInQueue.length > 0) {
    let currentLevelSize = nodesInQueue.length;
    for (
      let iterationIndex = 0;
      iterationIndex < currentLevelSize;
      iterationIndex++
    ) {
      let processedNode = nodesInQueue.shift();

      if (!processedNode.left && !processedNode.right) {
        return currentLevelNumber;
      }

      if (processedNode.left) {
        nodesInQueue.push(processedNode.left);
      }
      if (processedNode.right) {
        nodesInQueue.push(processedNode.right);
      }
    }
    currentLevelNumber++;
  }
};
