/**
 * Split Bst
 * Intuition: Recursively split so the first tree has values `<= target` and the second has values `> target`, rewiring `root.left` / `root.right` to attach the matching subtree.
 * Approach: 1. Null root → `[null, null]`. 2. If `root.val <= target`, split `root.right`; set `root.right` to the ≤ part and return `[root, > part]`. 3. Else split `root.left`; set `root.left` to the > part and return `[≤ part, root]`.
 * Dry Run: tree 4 / 2 6, target = 2.
 *   - 4 > 2 → split left (2). 2 ≤ 2 → split 2.right (empty) → [2, null]. Attach 4.left = null. Return [2, 4-with-right-6].
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var splitBST = function (root, target) {
  if (!root) {
    return [null, null];
  }

  if (root.val <= target) {
    const resultFromRightSplit = splitBST(root.right, target);
    const leftPartFromRight = resultFromRightSplit[0];
    const rightPartFromRight = resultFromRightSplit[1];

    root.right = leftPartFromRight;
    return [root, rightPartFromRight];
  } else {
    const resultFromLeftSplit = splitBST(root.left, target);
    const leftPartFromLeft = resultFromLeftSplit[0];
    const rightPartFromLeft = resultFromLeftSplit[1];

    root.left = rightPartFromLeft;
    return [leftPartFromLeft, root];
  }
};
