/**
 * Binary Tree Level Order Traversal II
 * Intuition: Standard BFS already groups values by depth; reversing that list yields bottom-up order.
 * Approach: 1. Empty root returns []. 2. Queue BFS: for each level, dequeue that many nodes, collect values, enqueue children. 3. Push each level array, then reverse the list of levels.
 * Dry Run: Tree 3 / 9, 20 / 15, 7. Levels collected [[3],[9,20],[15,7]]. Reverse gives [[15,7],[9,20],[3]].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var levelOrderBottom = function (root) {
  if (!root) {
    return [];
  }

  const intermediateLevels = [];
  const bfsQueue = [root];

  while (bfsQueue.length > 0) {
    const levelSize = bfsQueue.length;
    const levelValues = [];

    for (let elementCounter = 0; elementCounter < levelSize; elementCounter++) {
      const currentNodeFromQueue = bfsQueue.shift();
      levelValues.push(currentNodeFromQueue.val);

      if (currentNodeFromQueue.left) {
        bfsQueue.push(currentNodeFromQueue.left);
      }
      if (currentNodeFromQueue.right) {
        bfsQueue.push(currentNodeFromQueue.right);
      }
    }
    intermediateLevels.push(levelValues);
  }

  return intermediateLevels.reverse();
};
