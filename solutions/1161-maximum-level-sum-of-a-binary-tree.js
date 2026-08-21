/**
 * Maximum Level Sum of a Binary Tree
 * Intuition: The answer is the 1-indexed level whose node-value sum is largest (ties keep the smallest level). BFS sums one level at a time.
 * Approach: 1. Queue the root. 2. For each level, sum node values and enqueue children. 3. If the sum is strictly greater than the best, record this level. 4. Return that level.
 * Dry Run: root = [1,7,0,7,-8,null,null].
 *   - Level 1 sum 1, level 2 sum 7, level 3 sum -1. Best is level 2.
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var maxLevelSum = function (root) {
  let queueForTraversal = [];
  if (root) {
    queueForTraversal.push(root);
  }

  let maximalSumFound = -Infinity;
  let levelWithMaximalSum = 0;
  let currentLevelNumber = 1;

  while (queueForTraversal.length > 0) {
    let nodeQueueSize = queueForTraversal.length;
    let sumForThisLevel = 0;

    for (
      let iteratorVariable = 0;
      iteratorVariable < nodeQueueSize;
      iteratorVariable++
    ) {
      let currentNode = queueForTraversal.shift();
      sumForThisLevel += currentNode.val;

      let leftNodeChild = currentNode.left;
      if (leftNodeChild) {
        queueForTraversal.push(leftNodeChild);
      }

      let rightNodeChild = currentNode.right;
      if (rightNodeChild) {
        queueForTraversal.push(rightNodeChild);
      }
    }

    if (sumForThisLevel > maximalSumFound) {
      maximalSumFound = sumForThisLevel;
      levelWithMaximalSum = currentLevelNumber;
    }
    currentLevelNumber++;
  }

  return levelWithMaximalSum;
};
