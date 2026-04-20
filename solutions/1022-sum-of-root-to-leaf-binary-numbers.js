/**
 * Sum of Root To Leaf Binary Numbers
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var sumRootToLeaf = function (root) {
  if (!root) {
    return 0;
  }

  let totalResult = 0;
  const traverseStack = [];
  traverseStack.push([root, 0]);

  while (traverseStack.length > 0) {
    const currentEntry = traverseStack.pop();
    const currentNode = currentEntry[0];
    const currentPathValue = currentEntry[1];

    const nextPathValue = (currentPathValue << 1) | currentNode.val;

    if (currentNode.left === null && currentNode.right === null) {
      totalResult += nextPathValue;
    }

    if (currentNode.right !== null) {
      traverseStack.push([currentNode.right, nextPathValue]);
    }

    if (currentNode.left !== null) {
      traverseStack.push([currentNode.left, nextPathValue]);
    }
  }

  return totalResult;
};
