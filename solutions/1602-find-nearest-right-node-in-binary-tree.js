/**
 * Find Nearest Right Node In Binary Tree
 * Intuition: The nearest right neighbor of u is the next node in a left-to-right level-order scan that sits on the same depth.
 * Approach: 1. BFS a queue of [node, level] starting at the root. 2. When the dequeued node is u, peek at the front of the queue. 3. If that peek has the same level, return it; otherwise u is last on its level, so return null. 4. Enqueue left then right children with level + 1.
 * Dry Run: tree = [1,2,3,null,4,5,6], u = 4.
 *   - Level 2 queue after visiting 4 still has 5 (same level) → return 5.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findNearestRightNode = function (root, u) {
  if (!root) {
    return null;
  }

  const nodeAndLevelQueue = [[root, 0]];

  while (nodeAndLevelQueue.length > 0) {
    const currentQueueElement = nodeAndLevelQueue.shift();
    const processingNode = currentQueueElement[0];
    const processingLevel = currentQueueElement[1];

    if (processingNode === u) {
      if (nodeAndLevelQueue.length > 0) {
        const peekedElement = nodeAndLevelQueue[0];
        const peekedElementLevel = peekedElement[1];

        if (peekedElementLevel === processingLevel) {
          return peekedElement[0];
        }
      }
      return null;
    }

    const leftChildNode = processingNode.left;
    if (leftChildNode) {
      const leftChildEntry = [leftChildNode, processingLevel + 1];
      nodeAndLevelQueue.push(leftChildEntry);
    }

    const rightChildNode = processingNode.right;
    if (rightChildNode) {
      const rightChildEntry = [rightChildNode, processingLevel + 1];
      nodeAndLevelQueue.push(rightChildEntry);
    }
  }

  return null;
};
