/**
 * Count Nodes Equal To Sum Of Descendants
 * Intuition: To determine if a node's value equals the sum of its descendants, we need to know the total sum of values within its left and right subtrees. A post-order traversal (Depth-First Search) is ideal for this, as it allows us to compute the sum of all values in child subtrees before processing the parent node.
 * Approach: 1. Initialize a counter `descendantMatchCount` to zero, which will store the number of nodes satisfying the condition. 2. Define a recursive helper function, `calculateSubtreeSums`, which takes a `currentTreeNode` and returns the total sum of all node values within the subtree rooted at `currentTreeNode` (including `currentTreeNode.val`). 3. Inside `calculateSubtreeSums`, the base case is when `currentTreeNode` is null, in which case it returns 0. 4. Recursively call `calculateSubtreeSums` for the left child to get `leftSubtreeValueTotal`. 5. Recursively call `calculateSubtreeSums` for the right child to get `rightSubtreeValueTotal`. 6. Compute `accumulatedDescendantSum` as the sum of `leftSubtreeValueTotal` and `rightSubtreeValueTotal`. 7. Check if `currentTreeNode.val` is equal to `accumulatedDescendantSum`; if so, increment `descendantMatchCount`. 8. Finally, return `currentTreeNode.val + accumulatedDescendantSum` to its parent, as this represents the total sum of values in the current subtree for its parent's descendant sum calculation. 9. Invoke `calculateSubtreeSums` with the `root` node and return the final `descendantMatchCount`.
 * Dry Run: Root: [10, 3, 4, 2, 1] (Tree: 10 -> {3, 4}; 3 -> {2, 1}; 4 -> {null, null}; 2, 1 -> {null, null})
 *   Initial: `descendantMatchCount = 0`
 *   `calculateSubtreeSums(node: 10)`:
 *     `calculateSubtreeSums(node: 3)`:
 *       `calculateSubtreeSums(node: 2)`:
 *         `calculateSubtreeSums(null)` -> returns 0 (L_total for 2)
 *         `calculateSubtreeSums(null)` -> returns 0 (R_total for 2)
 *         `accumulatedDescendantSum` = 0 + 0 = 0. `node.val` (2) !== 0.
 *         returns `2 + 0 = 2`. (L_total for 3)
 *       `calculateSubtreeSums(node: 1)`:
 *         `calculateSubtreeSums(null)` -> returns 0 (L_total for 1)
 *         `calculateSubtreeSums(null)` -> returns 0 (R_total for 1)
 *         `accumulatedDescendantSum` = 0 + 0 = 0. `node.val` (1) !== 0.
 *         returns `1 + 0 = 1`. (R_total for 3)
 *       `accumulatedDescendantSum` = 2 + 1 = 3. `node.val` (3) === 3. `descendantMatchCount` becomes 1.
 *       returns `3 + 3 = 6`. (L_total for 10)
 *     `calculateSubtreeSums(node: 4)`:
 *       `calculateSubtreeSums(null)` -> returns 0 (L_total for 4)
 *       `calculateSubtreeSums(null)` -> returns 0 (R_total for 4)
 *       `accumulatedDescendantSum` = 0 + 0 = 0. `node.val` (4) !== 0.
 *       returns `4 + 0 = 4`. (R_total for 10)
 *     `accumulatedDescendantSum` = 6 + 4 = 10. `node.val` (10) === 10. `descendantMatchCount` becomes 2.
 *     returns `10 + 10 = 20`.
 *   Final `descendantMatchCount` = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var equalToDescendants = function (root) {
  let descendantMatchCount = 0;

  function calculateSubtreeSums(currentTreeNode) {
    if (!currentTreeNode) {
      return 0;
    }

    let leftSubtreeValueTotal = calculateSubtreeSums(currentTreeNode.left);
    let rightSubtreeValueTotal = calculateSubtreeSums(currentTreeNode.right);

    let accumulatedDescendantSum =
      leftSubtreeValueTotal + rightSubtreeValueTotal;

    if (currentTreeNode.val === accumulatedDescendantSum) {
      descendantMatchCount++;
    }

    let totalSubtreeValue = currentTreeNode.val + accumulatedDescendantSum;
    return totalSubtreeValue;
  }

  calculateSubtreeSums(root);
  return descendantMatchCount;
};
