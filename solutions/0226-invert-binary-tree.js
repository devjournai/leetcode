/**
 * Invert Binary Tree
 * Intuition: Inverting is swapping left and right at every node. BFS with a queue visits each node once and swaps children in place.
 * Approach: 1. Null root → null. 2. Enqueue the root. 3. While the queue is non-empty, dequeue, swap left/right, enqueue non-null children. 4. Return the original root.
 * Dry Run: root = [2,1,3].
 *   - Queue [2]; swap → [2,3,1]; enqueue 3 then 1.
 *   - 3 and 1 have no children. Return [2,3,1].
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var invertTree = function (rootNode) {
  if (!rootNode) {
    return null;
  }

  const nodeQueue = [rootNode];
  let currentProcessingNode;
  let temporaryHolder;

  while (nodeQueue.length > 0) {
    currentProcessingNode = nodeQueue.shift();

    temporaryHolder = currentProcessingNode.left;
    currentProcessingNode.left = currentProcessingNode.right;
    currentProcessingNode.right = temporaryHolder;

    if (currentProcessingNode.left) {
      nodeQueue.push(currentProcessingNode.left);
    }
    if (currentProcessingNode.right) {
      nodeQueue.push(currentProcessingNode.right);
    }
  }

  return rootNode;
};
