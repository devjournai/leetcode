/**
 * Height Of Binary Tree After Subtree Removal Queries
 * Intuition: To find the height of the tree after removing a specific node's subtree, we need to determine the longest path that does not include the removed subtree. This involves two main ideas: precomputing the height of every subtree and then, during a second traversal, calculating for each node what the maximum tree height would be if *that node's subtree* were removed. This "maximum height without" for a node can be found by taking the maximum of (1) the path reaching its sibling's subtree, (2) the path reaching any "cousin" branch that originates from an ancestor's other child, or (3) simply the path ending at its own parent.
 * Approach: 1. Perform a post-order Depth-First Search (DFS) to calculate the height of each node's subtree and store it in a map (`nodeSubtreeHeights`). A null node has height -1, a leaf node has height 0. 2. Perform a pre-order DFS to calculate, for each node, the maximum possible height of the tree if that node's subtree were removed. This is stored in another map (`treeMaxHeightExcluding`). During this traversal, pass down the current node's depth and the "longest alternative path height" (i.e., the maximum height achievable from any path not going through the current node's ancestor path). 3. For each query, retrieve the precomputed maximum height from the `treeMaxHeightExcluding` map.
 * Dry Run: Tree: 1 (D0) -> (Left: 2 (D1) -> 4 (D2)), (Right: 3 (D1) -> (Left: 5 (D2)), (Right: 6 (D2))). Queries = [2, 4, 3].
 * `nodeSubtreeHeights` computation (post-order DFS):
 * - `height(null)` = -1
 * - `height(4)` = `max(-1, -1) + 1` = 0. `nodeSubtreeHeights.set(4, 0)`
 * - `height(5)` = `max(-1, -1) + 1` = 0. `nodeSubtreeHeights.set(5, 0)`
 * - `height(6)` = `max(-1, -1) + 1` = 0. `nodeSubtreeHeights.set(6, 0)`
 * - `height(2)` = `max(height(4), height(null)) + 1` = `max(0, -1) + 1` = 1. `nodeSubtreeHeights.set(2, 1)`
 * - `height(3)` = `max(height(5), height(6)) + 1` = `max(0, 0) + 1` = 1. `nodeSubtreeHeights.set(3, 1)`
 * - `height(1)` = `max(height(2), height(3)) + 1` = `max(1, 1) + 1` = 2. `nodeSubtreeHeights.set(1, 2)`
 * `nodeSubtreeHeights`: `{1: 2, 2: 1, 3: 1, 4: 0, 5: 0, 6: 0}`
 * `treeMaxHeightExcluding` computation (pre-order DFS): `calculateMaxHeightInternal(nodeTraversal, currentTreeDepth, longestAlternativePathHeight)`
 * - `calculateMaxHeightInternal(1, 0, -1)`:
 *   - `leftChildSubtreeHeight` for 1 (node 2) = 1. `rightChildSubtreeHeight` for 1 (node 3) = 1.
 *   - `maxPossibleHeightWhenRemoved` for 1 = `max(-1, 0 - 1)` = -1. `treeMaxHeightExcluding.set(1, -1)` (root removal not queried)
 *   - Call `calculateMaxHeightInternal(2, 1, Math.max(-1, 0 + 1 + rightChildSubtreeHeight=1))` -> `calculateMaxHeightInternal(2, 1, 2)`
 *   - Call `calculateMaxHeightInternal(3, 1, Math.max(-1, 0 + 1 + leftChildSubtreeHeight=1))` -> `calculateMaxHeightInternal(3, 1, 2)`
 * - `calculateMaxHeightInternal(2, 1, 2)`:
 *   - `leftChildSubtreeHeight` for 2 (node 4) = 0. `rightChildSubtreeHeight` for 2 (null) = -1.
 *   - `maxPossibleHeightWhenRemoved` for 2 = `max(2, 1 - 1)` = 2. `treeMaxHeightExcluding.set(2, 2)` (If 2 is removed, the remaining deepest path is 1->3->5 or 1->3->6, total height 2).
 *   - Call `calculateMaxHeightInternal(4, 2, Math.max(2, 1 + 1 + rightChildSubtreeHeight=-1))` -> `calculateMaxHeightInternal(4, 2, 2)`
 * - `calculateMaxHeightInternal(4, 2, 2)`:
 *   - `leftChildSubtreeHeight` for 4 (null) = -1. `rightChildSubtreeHeight` for 4 (null) = -1.
 *   - `maxPossibleHeightWhenRemoved` for 4 = `max(2, 2 - 1)` = 2. `treeMaxHeightExcluding.set(4, 2)` (If 4 is removed, the remaining deepest path is 1->3->5 or 1->3->6, total height 2).
 * - `calculateMaxHeightInternal(3, 1, 2)`:
 *   - `leftChildSubtreeHeight` for 3 (node 5) = 0. `rightChildSubtreeHeight` for 3 (node 6) = 0.
 *   - `maxPossibleHeightWhenRemoved` for 3 = `max(2, 1 - 1)` = 2. `treeMaxHeightExcluding.set(3, 2)` (If 3 is removed, the remaining deepest path is 1->2->4, total height 2).
 *   - Call `calculateMaxHeightInternal(5, 2, Math.max(2, 1 + 1 + rightChildSubtreeHeight=0))` -> `calculateMaxHeightInternal(5, 2, 2)`
 *   - Call `calculateMaxHeightInternal(6, 2, Math.max(2, 1 + 1 + leftChildSubtreeHeight=0))` -> `calculateMaxHeightInternal(6, 2, 2)`
 * - `calculateMaxHeightInternal(5, 2, 2)`: `maxPossibleHeightWhenRemoved` for 5 = `max(2, 2-1)` = 2. `treeMaxHeightExcluding.set(5, 2)`.
 * - `calculateMaxHeightInternal(6, 2, 2)`: `maxPossibleHeightWhenRemoved` for 6 = `max(2, 2-1)` = 2. `treeMaxHeightExcluding.set(6, 2)`.
 * `treeMaxHeightExcluding`: `{1: -1, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2}`
 * Process Queries:
 * - Query 2: `treeMaxHeightExcluding.get(2)` = 2
 * - Query 4: `treeMaxHeightExcluding.get(4)` = 2
 * - Query 3: `treeMaxHeightExcluding.get(3)` = 2
 * `queryAnswers` = `[2, 2, 2]`
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var treeQueries = function (root, queries) {
  const nodeSubtreeHeights = new Map();
  const treeMaxHeightExcluding = new Map();

  const computeHeightsInternal = (nodeCurrent) => {
    if (!nodeCurrent) {
      return -1;
    }

    const leftResultantHeight = computeHeightsInternal(nodeCurrent.left);
    const rightResultantHeight = computeHeightsInternal(nodeCurrent.right);
    const finalComputedHeight =
      Math.max(leftResultantHeight, rightResultantHeight) + 1;
    nodeSubtreeHeights.set(nodeCurrent.val, finalComputedHeight);
    return finalComputedHeight;
  };

  const calculateMaxHeightInternal = (
    nodeTraversal,
    currentTreeDepth,
    longestAlternativePathHeight,
  ) => {
    if (!nodeTraversal) {
      return;
    }

    const leftChildSubtreeHeight = nodeTraversal.left
      ? nodeSubtreeHeights.get(nodeTraversal.left.val)
      : -1;
    const rightChildSubtreeHeight = nodeTraversal.right
      ? nodeSubtreeHeights.get(nodeTraversal.right.val)
      : -1;

    const maxPossibleHeightWhenRemoved = Math.max(
      longestAlternativePathHeight,
      currentTreeDepth - 1,
    );
    treeMaxHeightExcluding.set(nodeTraversal.val, maxPossibleHeightWhenRemoved);

    const alternativePathForLeft = Math.max(
      longestAlternativePathHeight,
      currentTreeDepth + 1 + rightChildSubtreeHeight,
    );
    calculateMaxHeightInternal(
      nodeTraversal.left,
      currentTreeDepth + 1,
      alternativePathForLeft,
    );

    const alternativePathForRight = Math.max(
      longestAlternativePathHeight,
      currentTreeDepth + 1 + leftChildSubtreeHeight,
    );
    calculateMaxHeightInternal(
      nodeTraversal.right,
      currentTreeDepth + 1,
      alternativePathForRight,
    );
  };

  computeHeightsInternal(root);
  calculateMaxHeightInternal(root, 0, -1);

  const queryAnswers = new Array(queries.length);
  for (let queryIterator = 0; queryIterator < queries.length; queryIterator++) {
    const currentQueryValue = queries[queryIterator];
    queryAnswers[queryIterator] = treeMaxHeightExcluding.get(currentQueryValue);
  }

  return queryAnswers;
};
