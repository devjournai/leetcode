/**
 * Construct Binary Search Tree From Preorder Traversal
 * Intuition: Preorder visits root then left then right. A decreasing-value stack of ancestors tells whether the next value is a left child or belongs as a right child after popping.
 * Approach: 1. Root is preorder[0]; stack holds the path. 2. If next < stack top, attach as left. 3. Else pop while next is larger, then attach as right of the last popped. 4. Push the new node.
 * Dry Run: preorder = [8,5,1,7,10].
 *   - Root 8. 5 < 8 -> left. 1 < 5 -> left. 7 > 1, pop 1 then 5, attach 7 as 5.right. 10 > 7, pop to 8, attach as 8.right.
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
