/**
 * Maximum Depth Of Binary Tree
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
