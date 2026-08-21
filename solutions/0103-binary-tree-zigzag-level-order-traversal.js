/**
 * Binary Tree Zigzag Level Order Traversal
 * Intuition: Same as level-order BFS, but reverse every other level so values alternate left-to-right then right-to-left.
 * Approach: 1. Empty root → []. 2. BFS collecting each level left-to-right. 3. If `isLeftToRight` is false, reverse that level’s array before pushing. 4. Flip the direction flag after each level.
 * Dry Run: [3,9,20,null,null,15,7] → [[3],[20,9],[15,7]]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var zigzagLevelOrder = function (initialNode) {
  const finalResult = [];

  if (!initialNode) {
    return finalResult;
  }

  const nodeQueue = [initialNode];
  let isLeftToRight = true;

  while (nodeQueue.length > 0) {
    const levelSize = nodeQueue.length;
    const currentLevelValues = [];

    for (let idx = 0; idx < levelSize; idx++) {
      const processingNode = nodeQueue.shift();
      currentLevelValues.push(processingNode.val);

      if (processingNode.left) {
        nodeQueue.push(processingNode.left);
      }
      if (processingNode.right) {
        nodeQueue.push(processingNode.right);
      }
    }

    if (!isLeftToRight) {
      currentLevelValues.reverse();
    }

    finalResult.push(currentLevelValues);
    isLeftToRight = !isLeftToRight;
  }

  return finalResult;
};
