/**
 * Change The Root Of A Binary Tree
 * Time Complexity: O(H)
 * Space Complexity: O(H)
 */
var changeTheRoot = function (root, leaf) {
  const processPathNode = (currentNodeInPath, nextParentForNode) => {
    const originalNodeParent = currentNodeInPath.parent;
    currentNodeInPath.parent = nextParentForNode;

    currentNodeInPath.right = currentNodeInPath.left;
    currentNodeInPath.left = originalNodeParent;

    if (originalNodeParent) {
      const isCurrentOriginalLeftChild =
        originalNodeParent.left === currentNodeInPath;
      if (isCurrentOriginalLeftChild) {
        originalNodeParent.left = null;
      }
      const isCurrentOriginalRightChild =
        originalNodeParent.right === currentNodeInPath;
      if (isCurrentOriginalRightChild) {
        originalNodeParent.right = null;
      }

      processPathNode(originalNodeParent, currentNodeInPath);
    }
  };

  processPathNode(leaf, null);
  return leaf;
};
