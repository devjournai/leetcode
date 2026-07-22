/**
 * Height Of Special Binary Tree
 * Intuition: The height of a binary tree is the length of the longest path from the root to any leaf. In this special binary tree, leaves are connected in a cyclic manner. To correctly calculate the height, we must recognize when we reach one of these special leaves and stop descending into the cyclic connections. The problem states that for every leaf `bi`, its left child is `bi - 1` (or `bk`) and its right child is `bi + 1` (or `b1`). This implies that `bi-1.right` would point back to `bi`. Thus, a node `curr` is effectively a leaf (an endpoint for height calculation) if its left child exists and that left child's right pointer points back to `curr` (`curr.left && curr.left.right === curr`). This condition helps us identify nodes that are part of the leaf cycle and treat them as terminal nodes for height calculation.
 * Approach: 1. Implement a recursive function `heightOfTree(currentNode)` that computes the height of the subtree rooted at `currentNode`. 2. Establish base cases: if `currentNode` is `null`, its height is 0. If `currentNode` satisfies the special leaf condition (`currentNode.left && currentNode.left.right === currentNode`), its height is also 0, as we should not count paths that enter the cyclic connections. 3. For the recursive step, if neither base case is met, the height of `currentNode` is 1 (for `currentNode` itself) plus the maximum of the heights of its left and right children.
 * Dry Run:
 * Consider a tree:
 *      1 (root)
 *     / \
 *    2   3
 *   /     \
 *  4       5
 * Assume 4, 5, 2 are the special leaves (b1=4, b2=5, b3=2 in sorted order for cyclic connections):
 * - 4.right = 5, 4.left = 2
 * - 5.right = 2, 5.left = 4
 * - 2.right = 4, 2.left = 5
 *
 * `heightOfTree(1)`:
 *   - `root` is 1. `1.left` is 2. `2.right` is 4. `4 === 1` is false.
 *   - Calls `1 + Math.max(heightOfTree(1.left), heightOfTree(1.right))` -> `1 + Math.max(heightOfTree(2), heightOfTree(3))`
 *
 *   `heightOfTree(2)`:
 *     - `root` is 2. `2.left` is 5. `5.right` is 2. `2 === 2` is true! (Base case met)
 *     - Returns `0`.
 *
 *   `heightOfTree(3)`:
 *     - `root` is 3. `3.left` is null. `null` && ... is false.
 *     - Calls `1 + Math.max(heightOfTree(3.left), heightOfTree(3.right))` -> `1 + Math.max(heightOfTree(null), heightOfTree(5))`
 *
 *     `heightOfTree(null)`:
 *       - `root` is null. (Base case met)
 *       - Returns `0`.
 *
 *     `heightOfTree(5)`:
 *       - `root` is 5. `5.left` is 4. `4.right` is 5. `5 === 5` is true! (Base case met)
 *       - Returns `0`.
 *
 *     Back to `heightOfTree(3)`:
 *       - `1 + Math.max(0, 0)` -> `1`.
 *
 * Back to `heightOfTree(1)`:
 *   - `1 + Math.max(0, 1)` -> `2`.
 *
 * The height of the tree is 2. The longest paths are 1 -> 3 -> 5 (length 2) or 1 -> 2 -> ... (but 2 is a leaf, so path 1->2 has length 1).
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var heightOfTree = function (rootNode) {
  if (!rootNode || (rootNode.left && rootNode.left.right === rootNode)) {
    return 0;
  }

  let leftHeight = heightOfTree(rootNode.left);
  let rightHeight = heightOfTree(rootNode.right);

  return 1 + Math.max(leftHeight, rightHeight);
};
