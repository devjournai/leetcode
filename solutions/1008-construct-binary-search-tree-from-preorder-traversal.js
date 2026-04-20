/**
 * Construct Binary Search Tree From Preorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var bstFromPreorder = function (preorder) {
  if (preorder.length === 0) {
    return null;
  }

  const treeRootNode = new TreeNode(preorder[0]);
  const parentStack = [treeRootNode];

  for (let indexValue = 1; indexValue < preorder.length; indexValue++) {
    const nextNodeValue = preorder[indexValue];
    let currentParent = parentStack[parentStack.length - 1];
    const newNodeObject = new TreeNode(nextNodeValue);

    if (nextNodeValue < currentParent.val) {
      currentParent.left = newNodeObject;
    } else {
      while (
        parentStack.length > 0 &&
        nextNodeValue > parentStack[parentStack.length - 1].val
      ) {
        currentParent = parentStack.pop();
      }
      currentParent.right = newNodeObject;
    }
    parentStack.push(newNodeObject);
  }

  return treeRootNode;
};
