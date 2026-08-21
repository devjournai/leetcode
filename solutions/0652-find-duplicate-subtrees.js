/**
 * Find Duplicate Subtrees
 * Intuition: Two subtrees are duplicates iff they serialize to the same string. Count each serialization and emit the root the second time it appears.
 * Approach: 1. Post-order `getSerialization`: null is `#`, else `val,left,right`. 2. Increment `subtreeSerializationCounts`. 3. If the count becomes 2, push `currentTree`. 4. Return the collected roots.
 * Dry Run: tree with two identical leaves 4 (under 2 and under 3).
 *   - Leaf "4,#,#" counted twice → push that leaf once. Return those duplicate subtree roots.
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
      currentSerializationCount
    );

    if (currentSerializationCount === 2) {
      foundDuplicateSubtreeRoots.push(currentTree);
    }

    return fullTreeSerialization;
  }

  getSerialization(root);

  return foundDuplicateSubtreeRoots;
};
