/**
 * Find Leaves Of Binary Tree
 * Intuition: Nodes that fall in the same “peel” share the same height measured from the leaves (leaf height 0), so a post-order height walk can bucket each value by that height.
 * Approach: 1. Recurse: null returns -1. 2. Height = max(left, right) + 1. 3. Grow `collectedLeaves` until that index exists, then push the node value. 4. Return the buckets in height order.
 * Dry Run: tree [1,2,3,4,5]. Leaves 4,5,3 have height 0; 2 has height 1; 1 has height 2 → [[4,5,3],[2],[1]].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findLeaves = function (root) {
  const collectedLeaves = [];

  const calculateNodeHeight = (currentNode) => {
    if (!currentNode) {
      return -1;
    }

    const leftSubtreeHeight = calculateNodeHeight(currentNode.left);
    const rightSubtreeHeight = calculateNodeHeight(currentNode.right);

    const currentLevelHeight =
      Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;

    while (collectedLeaves.length <= currentLevelHeight) {
      collectedLeaves.push([]);
    }

    collectedLeaves[currentLevelHeight].push(currentNode.val);

    return currentLevelHeight;
  };

  calculateNodeHeight(root);

  return collectedLeaves;
};
