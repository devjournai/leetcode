/**
 * N Ary Tree Preorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var preorder = function (root) {
  const collectedValues = [];

  if (root === null) {
    return collectedValues;
  }

  const processStack = [root];

  while (processStack.length > 0) {
    const currentVisitingNode = processStack.pop();
    collectedValues.push(currentVisitingNode.val);

    for (
      let childIndex = currentVisitingNode.children.length - 1;
      childIndex >= 0;
      childIndex--
    ) {
      const currentChildNode = currentVisitingNode.children[childIndex];
      processStack.push(currentChildNode);
    }
  }

  return collectedValues;
};
