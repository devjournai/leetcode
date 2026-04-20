/**
 * Clone N Ary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var cloneTree = function (rootNode) {
  if (!rootNode) {
    return null;
  }

  const clonedRootEntry = new _Node(rootNode.val);
  const nodeMapping = new Map();
  nodeMapping.set(rootNode, clonedRootEntry);

  const traversalStack = [rootNode];

  while (traversalStack.length > 0) {
    const originalParentNode = traversalStack.pop();
    const clonedParentReference = nodeMapping.get(originalParentNode);

    let childCount = 0;
    const originalChildrenList = originalParentNode.children;

    while (childCount < originalChildrenList.length) {
      const currentOriginalChild = originalChildrenList[childCount];

      if (!nodeMapping.has(currentOriginalChild)) {
        const newClonedChildInstance = new _Node(currentOriginalChild.val);
        nodeMapping.set(currentOriginalChild, newClonedChildInstance);
        traversalStack.push(currentOriginalChild);
      }

      const linkedClonedChild = nodeMapping.get(currentOriginalChild);
      clonedParentReference.children.push(linkedClonedChild);

      childCount++;
    }
  }

  return clonedRootEntry;
};
