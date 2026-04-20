/**
 * Deepest Leaves Sum
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
