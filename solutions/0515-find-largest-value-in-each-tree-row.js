/**
 * Find Largest Value In Each Tree Row
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var largestValues = function (root) {
  if (!root) {
    return [];
  }

  const rowMaximums = [];
  const processingQueue = [root];

  while (processingQueue.length > 0) {
    let currentLevelNodeCount = processingQueue.length;
    let maximumValueInCurrentRow = -Infinity;

    for (
      let nodeIndexInLevel = 0;
      nodeIndexInLevel < currentLevelNodeCount;
      nodeIndexInLevel++
    ) {
      const currentElement = processingQueue.shift();
      maximumValueInCurrentRow = Math.max(
        maximumValueInCurrentRow,
        currentElement.val,
      );

      if (currentElement.left) {
        processingQueue.push(currentElement.left);
      }
      if (currentElement.right) {
        processingQueue.push(currentElement.right);
      }
    }
    rowMaximums.push(maximumValueInCurrentRow);
  }

  return rowMaximums;
};
