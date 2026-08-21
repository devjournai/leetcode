/**
 * Deepest Leaves Sum
 * Intuition: The deepest leaves sit on the last BFS level, so a level-order walk can replace the running sum each level and keep only the last one.
 * Approach: 1. Queue the root. 2. While the queue is nonempty, sum every node on the current level and enqueue children. 3. Overwrite `finalSum` with that level sum. 4. Return `finalSum` after the last level.
 * Dry Run: tree [1,2,3,4,5,null,6,7,null,null,null,null,8]. Levels sum 1 then 5 then 15 then 15; deepest leaves 7+8 = 15.
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var deepestLeavesSum = function (root) {
  if (!root) {
    return 0;
  }

  let levelNodes = [root];
  let finalSum = 0;

  while (levelNodes.length > 0) {
    let currentLevelSize = levelNodes.length;
    let iterationSum = 0;

    for (let i = 0; i < currentLevelSize; i++) {
      let currentNode = levelNodes.shift();
      iterationSum += currentNode.val;

      if (currentNode.left) {
        levelNodes.push(currentNode.left);
      }
      if (currentNode.right) {
        levelNodes.push(currentNode.right);
      }
    }
    finalSum = iterationSum;
  }

  return finalSum;
};
