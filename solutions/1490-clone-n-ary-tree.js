/**
 * Clone N Ary Tree
 * Intuition: Iterative DFS with a map from original node to clone. When visiting a parent, clone missing children, link them, and push originals to the stack.
 * Approach: 1. Null returns null. 2. Create cloned root and map it. 3. While the stack has an original parent, for each child create/get clone, push onto clonedParent.children, and stack unvisited children. 4. Return cloned root.
 * Dry Run: root 1 with children 3,2,4 and 3 having 5,6
 *   - clone 1, then attach clones of 3,2,4
 *   - process 3 attaching 5 and 6. Structure matches.
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
