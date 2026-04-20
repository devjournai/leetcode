/**
 * Find Duplicate Subtrees
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findDuplicateSubtrees = function (root) {
  const subtreeSerializationCounts = new Map();
  const foundDuplicateSubtreeRoots = [];

  function getSerialization(currentTree) {
    if (!currentTree) {
      return "#";
    }

    const leftPartSerialization = getSerialization(currentTree.left);
    const rightPartSerialization = getSerialization(currentTree.right);

    const fullTreeSerialization = `${currentTree.val},${leftPartSerialization},${rightPartSerialization}`;

    const currentSerializationCount =
      (subtreeSerializationCounts.get(fullTreeSerialization) || 0) + 1;
    subtreeSerializationCounts.set(
      fullTreeSerialization,
      currentSerializationCount,
    );

    if (currentSerializationCount === 2) {
      foundDuplicateSubtreeRoots.push(currentTree);
    }

    return fullTreeSerialization;
  }

  getSerialization(root);

  return foundDuplicateSubtreeRoots;
};
