/**
 * N Ary Tree Postorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var postorder = function (root) {
  const collectedValues = [];

  if (!root) {
    return collectedValues;
  }

  const primaryStack = [root];
  const auxiliaryStack = [];

  while (primaryStack.length > 0) {
    const currentNode = primaryStack.pop();
    auxiliaryStack.push(currentNode);

    for (
      let childIndex = 0;
      childIndex < currentNode.children.length;
      childIndex++
    ) {
      primaryStack.push(currentNode.children[childIndex]);
    }
  }

  while (auxiliaryStack.length > 0) {
    const finalNode = auxiliaryStack.pop();
    collectedValues.push(finalNode.val);
  }

  return collectedValues;
};
