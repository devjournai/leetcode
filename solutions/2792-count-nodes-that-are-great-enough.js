/**
 * Count Nodes That Are Great Enough
 * Intuition: To determine if a node is "great enough", we need information about its entire subtree, specifically the total node count and the values of its smallest 'k' nodes. This suggests a post-order traversal (DFS) where child information is aggregated before processing the current node.
 * Approach: 1. Initialize a counter for great enough nodes. 2. Implement a recursive DFS function (`traverseAndAggregate`) that returns both the total count of nodes in its subtree and a sorted list of its `k` smallest node values. 3. In the DFS, for each node, combine the results from its children and its own value to calculate the total node count and re-evaluate the `k` smallest values for its entire subtree. 4. Check the two conditions for "great enough" (subtree node count >= k, and current node's value > k-th smallest in its subtree) and increment the counter if both hold.
 * Dry Run: For root = [5,4,7,3,null,6,8], k = 2:
 * 1. `greatEnoughNodesCount = 0`.
 * 2. `traverseAndAggregate(5)` is called.
 *    a. `traverseAndAggregate(4)` is called.
 *       i. `traverseAndAggregate(3)` is called.
 *          - `traverseAndAggregate(null)` returns `{ totalNodesInSubtree: 0, smallestKValuesInSubtree: [] }` (twice for null children).
 *          - `currentSubtreeNodeCount = 0 + 0 + 1 = 1`.
 *          - `combinedSubtreeValues = [3]`. Sorted: `[3]`.
 *          - `extractedSmallestK = [3].slice(0, 2) = [3]`.
 *          - `isSubtreeLargeEnough = (1 >= 2)` is `false`. `isNodeValueGreatEnough = (1 === 2 && 3 > undefined)` is `false`. No increment.
 *          - Returns `{ totalNodesInSubtree: 1, smallestKValuesInSubtree: [3] }` (`dataFor3`).
 *       ii. `leftSubtreeResult = dataFor3`. `rightSubtreeResult` (from null) is `{ 0, [] }`.
 *       iii. `currentSubtreeNodeCount = 1 + 0 + 1 = 2`.
 *       iv. `combinedSubtreeValues = [3, 4]`. Sorted: `[3, 4]`.
 *       v. `extractedSmallestK = [3, 4].slice(0, 2) = [3, 4]`.
 *       vi. `isSubtreeLargeEnough = (2 >= 2)` is `true`. `isNodeValueGreatEnough = (2 === 2 && 4 > 4)` is `false`. No increment.
 *       vii. Returns `{ totalNodesInSubtree: 2, smallestKValuesInSubtree: [3, 4] }` (`dataFor4`).
 *    b. `leftSubtreeResult = dataFor4`.
 *    c. `traverseAndAggregate(7)` is called.
 *       i. `traverseAndAggregate(6)` (similar logic) returns `{ totalNodesInSubtree: 1, smallestKValuesInSubtree: [6] }` (`dataFor6`).
 *       ii. `traverseAndAggregate(8)` (similar logic) returns `{ totalNodesInSubtree: 1, smallestKValuesInSubtree: [8] }` (`dataFor8`).
 *       iii. `currentSubtreeNodeCount = 1 + 1 + 1 = 3`.
 *       iv. `combinedSubtreeValues = [6, 8, 7]`. Sorted: `[6, 7, 8]`.
 *       v. `extractedSmallestK = [6, 7, 8].slice(0, 2) = [6, 7]`.
 *       vi. `isSubtreeLargeEnough = (3 >= 2)` is `true`. `isNodeValueGreatEnough = (2 === 2 && 7 > 7)` is `false`. No increment.
 *       vii. Returns `{ totalNodesInSubtree: 3, smallestKValuesInSubtree: [6, 7] }` (`dataFor7`).
 *    d. `rightSubtreeResult = dataFor7`.
 *    e. `currentSubtreeNodeCount = 2 + 3 + 1 = 6`.
 *    f. `combinedSubtreeValues = [3, 4, 6, 7, 5]`. Sorted: `[3, 4, 5, 6, 7]`.
 *    g. `extractedSmallestK = [3, 4, 5, 6, 7].slice(0, 2) = [3, 4]`.
 *    h. `isSubtreeLargeEnough = (6 >= 2)` is `true`. `isNodeValueGreatEnough = (2 === 2 && 5 > 4)` is `true`. Both true, so `greatEnoughNodesCount` becomes 1.
 *    i. Returns `{ totalNodesInSubtree: 6, smallestKValuesInSubtree: [3, 4] }`.
 * 3. The initial call completes.
 * 4. Returns `greatEnoughNodesCount` (which is 1).
 * Time Complexity: O(N * k log k)
 * Space Complexity: O(N * k)
 */
var countGreatEnoughNodes = function (root, k) {
  let greatEnoughNodesCount = 0;

  function traverseAndAggregate(currentNode) {
    if (!currentNode) {
      return { totalNodesInSubtree: 0, smallestKValuesInSubtree: [] };
    }

    const leftSubtreeResult = traverseAndAggregate(currentNode.left);
    const rightSubtreeResult = traverseAndAggregate(currentNode.right);

    const currentSubtreeNodeCount =
      leftSubtreeResult.totalNodesInSubtree +
      rightSubtreeResult.totalNodesInSubtree +
      1;

    const combinedSubtreeValues = [
      ...leftSubtreeResult.smallestKValuesInSubtree,
      ...rightSubtreeResult.smallestKValuesInSubtree,
      currentNode.val,
    ];
    combinedSubtreeValues.sort((valueOne, valueTwo) => valueOne - valueTwo);

    const extractedSmallestK = combinedSubtreeValues.slice(0, k);

    const isSubtreeLargeEnough = currentSubtreeNodeCount >= k;
    const isNodeValueGreatEnough =
      extractedSmallestK.length === k &&
      currentNode.val > extractedSmallestK[k - 1];

    if (isSubtreeLargeEnough && isNodeValueGreatEnough) {
      greatEnoughNodesCount++;
    }

    return {
      totalNodesInSubtree: currentSubtreeNodeCount,
      smallestKValuesInSubtree: extractedSmallestK,
    };
  }

  traverseAndAggregate(root);

  return greatEnoughNodesCount;
};
