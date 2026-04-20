/**
 * Construct Binary Tree From Preorder And Postorder Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var constructFromPrePost = function (preorder, postorder) {
  const preorderSize = preorder.length;
  if (preorderSize === 0) {
    return null;
  }

  const postorderValueToIndexMap = new Map();
  for (
    let currentPosition = 0;
    currentPosition < preorderSize;
    currentPosition++
  ) {
    postorderValueToIndexMap.set(postorder[currentPosition], currentPosition);
  }

  const buildTreeRecursive = (
    preorderTraversalStart,
    preorderTraversalEnd,
    postorderTraversalStart,
    postorderTraversalEnd,
  ) => {
    if (preorderTraversalStart >= preorderTraversalEnd) {
      return null;
    }

    const currentLevelRootValue = preorder[preorderTraversalStart];
    const currentLevelNode = new TreeNode(currentLevelRootValue);

    if (preorderTraversalEnd - preorderTraversalStart === 1) {
      return currentLevelNode;
    }

    const nextLeftSubtreeRootValue = preorder[preorderTraversalStart + 1];
    const nextLeftSubtreeRootPostorderIndex = postorderValueToIndexMap.get(
      nextLeftSubtreeRootValue,
    );
    const leftSubtreeElementsCount =
      nextLeftSubtreeRootPostorderIndex - postorderTraversalStart + 1;

    const constructedLeftChild = buildTreeRecursive(
      preorderTraversalStart + 1,
      preorderTraversalStart + 1 + leftSubtreeElementsCount,
      postorderTraversalStart,
      postorderTraversalStart + leftSubtreeElementsCount,
    );

    const constructedRightChild = buildTreeRecursive(
      preorderTraversalStart + 1 + leftSubtreeElementsCount,
      preorderTraversalEnd,
      postorderTraversalStart + leftSubtreeElementsCount,
      postorderTraversalEnd - 1,
    );

    currentLevelNode.left = constructedLeftChild;
    currentLevelNode.right = constructedRightChild;

    return currentLevelNode;
  };

  const finalRootNode = buildTreeRecursive(0, preorderSize, 0, preorderSize);
  return finalRootNode;
};
