/**
 * Find Largest Value In Each Tree Row
 * Intuition: BFS one level at a time. The answer for a row is the max `val` among nodes in that queue slice.
 * Approach: 1. Empty root → `[]`. 2. While the queue is nonempty, scan `currentLevelNodeCount` nodes, track `maximumValueInCurrentRow`, and enqueue children. 3. Push that max onto `rowMaximums`.
 * Dry Run: 1 / 3 2, 3 has 5 and 3.
 *   - Row 1: 1. Row 2: max(3,2)=3. Row 3: max(5,3)=5. Result [1,3,5].
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
        currentElement.val
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
