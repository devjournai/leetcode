/**
 * Maximum Depth Of N Ary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(W)
 */
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }

  let nodeQueue = [root];
  let levelCounter = 0;

  while (nodeQueue.length > 0) {
    let currentLevelSize = nodeQueue.length;
    levelCounter++;

    for (
      let iterationCount = 0;
      iterationCount < currentLevelSize;
      iterationCount++
    ) {
      let processedNode = nodeQueue.shift();
      if (processedNode.children) {
        for (let childElement of processedNode.children) {
          if (childElement) {
            nodeQueue.push(childElement);
          }
        }
      }
    }
  }

  return levelCounter;
};
