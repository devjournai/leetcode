/**
 * Merge Two Binary Trees
 * Intuition: Recursively overlay the trees. A missing node is replaced by the other subtree as-is. When both exist, a new node holds the sum and merged children.
 * Approach: 1. Both null → null. 2. `treeA` null → return `treeB`; `treeB` null → return `treeA`. 3. Else `createdNode = new TreeNode(treeA.val + treeB.val)`, recurse `left`/`right`. 4. Return `createdNode`.
 * Dry Run: A=1 with left 3; B=2 with left 1.
 *   - Root 3. Left merge 3+1=4. Rights both null. Tree 3 with left 4.
 * Time Complexity: O(min(m, n))
 * Space Complexity: O(min(m, n))
 */
var mergeTrees = function (treeA, treeB) {
  if (treeA === null && treeB === null) {
    return null;
  }

  let createdNode;

  if (treeA === null) {
    createdNode = treeB;
  } else if (treeB === null) {
    createdNode = treeA;
  } else {
    createdNode = new TreeNode(treeA.val + treeB.val);
    createdNode.left = mergeTrees(treeA.left, treeB.left);
    createdNode.right = mergeTrees(treeA.right, treeB.right);
  }

  return createdNode;
};
