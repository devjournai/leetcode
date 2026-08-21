/**
 * Construct Binary Tree From Inorder And Postorder Traversal
 * Intuition: Postorder ends with the subtree root. An inorder index map locates that root so left/right spans can be taken by index instead of copying arrays.
 * Approach: 1. Map every inorder value to its index. 2. Recurse on inorder and postorder inclusive bounds. 3. Root is postorder[end]. 4. Left size is rootIndex - inorderStart; recurse left then right with the matching postorder windows.
 * Dry Run: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]. Root 3 at inorder index 1. Left uses [9]/[9]. Right uses [15,20,7]/[15,7,20] with root 20. Result: 3 / 9, 20 / 15, 7.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var buildTree = function (inorder, postorder) {
  const totalLength = inorder.length;

  if (totalLength === 0) {
    return null;
  }

  const inorderValueToIndexMap = new Map();

  for (
    let mappingIterator = 0;
    mappingIterator < totalLength;
    mappingIterator++
  ) {
    const currentInorderValue = inorder[mappingIterator];
    inorderValueToIndexMap.set(currentInorderValue, mappingIterator);
  }

  const recursiveTreeBuilder = (
    inorderStartBoundary,
    inorderEndBoundary,
    postorderStartBoundary,
    postorderEndBoundary
  ) => {
    if (
      inorderStartBoundary > inorderEndBoundary ||
      postorderStartBoundary > postorderEndBoundary
    ) {
      return null;
    }

    const currentSubtreeRootValue = postorder[postorderEndBoundary];
    const createdNode = new TreeNode(currentSubtreeRootValue);

    const rootPositionInInorder = inorderValueToIndexMap.get(
      currentSubtreeRootValue
    );

    const leftSubtreeNodeCount = rootPositionInInorder - inorderStartBoundary;

    const leftTreeInorderStart = inorderStartBoundary;
    const leftTreeInorderEnd = rootPositionInInorder - 1;
    const leftTreePostorderStart = postorderStartBoundary;
    const leftTreePostorderEnd =
      postorderStartBoundary + leftSubtreeNodeCount - 1;
    createdNode.left = recursiveTreeBuilder(
      leftTreeInorderStart,
      leftTreeInorderEnd,
      leftTreePostorderStart,
      leftTreePostorderEnd
    );

    const rightTreeInorderStart = rootPositionInInorder + 1;
    const rightTreeInorderEnd = inorderEndBoundary;
    const rightTreePostorderStart =
      postorderStartBoundary + leftSubtreeNodeCount;
    const rightTreePostorderEnd = postorderEndBoundary - 1;
    createdNode.right = recursiveTreeBuilder(
      rightTreeInorderStart,
      rightTreeInorderEnd,
      rightTreePostorderStart,
      rightTreePostorderEnd
    );

    return createdNode;
  };

  const finalTreeRoot = recursiveTreeBuilder(
    0,
    totalLength - 1,
    0,
    totalLength - 1
  );
  return finalTreeRoot;
};
