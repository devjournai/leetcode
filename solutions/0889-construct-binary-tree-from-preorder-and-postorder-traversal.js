/**
 * Construct Binary Tree From Preorder And Postorder Traversal
 * Intuition: Preorder gives the root then the left-subtree root. That left-root's index in postorder sizes the left subtree so both ranges can be split in O(1) with a value-to-index map.
 * Approach: 1. Empty preorder → null. 2. Map each postorder value to its index. 3. `buildTreeRecursive` on half-open pre/post ranges: empty → null; one node → that TreeNode. 4. Else left size = postIndex(pre[start+1]) - postStart + 1; recurse left then right (right post end excludes the current root). 5. Attach children and return the root.
 * Dry Run: pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1].
 *   - Root 1; next pre 2 is left root, post index of 2 gives left size 3 → left [2,4,5], right [3,6,7]. Recurse to 2-4-5 and 3-6-7.
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
    postorderTraversalEnd
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
      nextLeftSubtreeRootValue
    );
    const leftSubtreeElementsCount =
      nextLeftSubtreeRootPostorderIndex - postorderTraversalStart + 1;

    const constructedLeftChild = buildTreeRecursive(
      preorderTraversalStart + 1,
      preorderTraversalStart + 1 + leftSubtreeElementsCount,
      postorderTraversalStart,
      postorderTraversalStart + leftSubtreeElementsCount
    );

    const constructedRightChild = buildTreeRecursive(
      preorderTraversalStart + 1 + leftSubtreeElementsCount,
      preorderTraversalEnd,
      postorderTraversalStart + leftSubtreeElementsCount,
      postorderTraversalEnd - 1
    );

    currentLevelNode.left = constructedLeftChild;
    currentLevelNode.right = constructedRightChild;

    return currentLevelNode;
  };

  const finalRootNode = buildTreeRecursive(0, preorderSize, 0, preorderSize);
  return finalRootNode;
};
