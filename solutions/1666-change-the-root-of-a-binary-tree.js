/**
 * Change The Root Of A Binary Tree
 * Intuition: Walk from the given leaf to the old root along parent pointers, reversing each edge: parent becomes left child, old left becomes right, and the node is unlinked from its former parent.
 * Approach: 1. Recurse from leaf with nextParent=null. 2. Save original parent, set parent to nextParent, move left into right, set left to original parent. 3. Null the original parent's pointer to this node. 4. Recurse on the original parent. 5. Return the leaf as the new root.
 * Dry Run: root=3 with left 5, leaf=5.
 *   - 5.parent=null, 5.left=3, 3 unlinked from 5 → tree rooted at 5.
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
