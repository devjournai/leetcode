/**
 * Count Nodes Equal To Average Of Subtree
 * Intuition: The problem requires calculating the average of each subtree, which means we need to know the sum of node values and the count of nodes for every subtree. This suggests a post-order traversal (DFS) where child information is processed before the parent.
 * Approach: 1. Initialize a counter `totalMatchingNodes` to zero. 2. Implement a recursive helper function `calculateSubtreeMetrics(currentNodePointer)` that performs a post-order DFS. 3. The base case for the helper function is a null node, returning `[0, 0]` (sum and count). 4. For a non-null node, recursively call `calculateSubtreeMetrics` for its left and right children to get their respective subtree sums and node counts. 5. Combine these results with the current node's value to find the `currentSubtreeSum` and `currentSubtreeCount` for the `currentNodePointer`'s subtree. 6. Calculate the `calculatedAverage` by dividing the `currentSubtreeSum` by `currentSubtreeCount` and rounding down. 7. If `calculatedAverage` equals `currentNodePointer.val`, increment `totalMatchingNodes`. 8. Return `[currentSubtreeSum, currentSubtreeCount]` to the parent call. 9. Initiate the DFS by calling `calculateSubtreeMetrics(root)`. 10. Return `totalMatchingNodes`.
 * Dry Run: Input: root = [4,8,5,0,1,null,6]
 *
 * 1. `totalMatchingNodes` = 0.
 * 2. Call `calculateSubtreeMetrics(node_4)`.
 *    a. Call `calculateSubtreeMetrics(node_8)`.
 *       i. Call `calculateSubtreeMetrics(node_0)`.
 *          - `calculateSubtreeMetrics(null)` returns `[0, 0]`. (`leftSumOfSubtree`=0, `leftCountOfNodes`=0)
 *          - `calculateSubtreeMetrics(null)` returns `[0, 0]`. (`rightSumOfSubtree`=0, `rightCountOfNodes`=0)
 *          - `currentSubtreeSum` = 0 + 0 + 0 = 0.
 *          - `currentSubtreeCount` = 0 + 0 + 1 = 1.
 *          - `calculatedAverage` = floor(0/1) = 0.
 *          - `0 === node_0.val` (0 === 0) is true. `totalMatchingNodes` becomes 1.
 *          - Returns `[0, 1]`.
 *       ii. Call `calculateSubtreeMetrics(node_1)`.
 *          - `calculateSubtreeMetrics(null)` returns `[0, 0]`. (`leftSumOfSubtree`=0, `leftCountOfNodes`=0)
 *          - `calculateSubtreeMetrics(null)` returns `[0, 0]`. (`rightSumOfSubtree`=0, `rightCountOfNodes`=0)
 *          - `currentSubtreeSum` = 0 + 0 + 1 = 1.
 *          - `currentSubtreeCount` = 0 + 0 + 1 = 1.
 *          - `calculatedAverage` = floor(1/1) = 1.
 *          - `1 === node_1.val` (1 === 1) is true. `totalMatchingNodes` becomes 2.
 *          - Returns `[1, 1]`.
 *       iii. For node_8:
 *          - `leftSumOfSubtree`=0, `leftCountOfNodes`=1 (from node_0).
 *          - `rightSumOfSubtree`=1, `rightCountOfNodes`=1 (from node_1).
 *          - `currentSubtreeSum` = 0 + 1 + 8 = 9.
 *          - `currentSubtreeCount` = 1 + 1 + 1 = 3.
 *          - `calculatedAverage` = floor(9/3) = 3.
 *          - `3 === node_8.val` (3 === 8) is false.
 *          - Returns `[9, 3]`.
 *    b. Call `calculateSubtreeMetrics(node_5)`.
 *       i. `calculateSubtreeMetrics(null)` returns `[0, 0]`. (`leftSumOfSubtree`=0, `leftCountOfNodes`=0)
 *       ii. Call `calculateSubtreeMetrics(node_6)`.
 *          - `calculateSubtreeMetrics(null)` returns `[0, 0]`. (`leftSumOfSubtree`=0, `leftCountOfNodes`=0)
 *          - `calculateSubtreeMetrics(null)` returns `[0, 0]`. (`rightSumOfSubtree`=0, `rightCountOfNodes`=0)
 *          - `currentSubtreeSum` = 0 + 0 + 6 = 6.
 *          - `currentSubtreeCount` = 0 + 0 + 1 = 1.
 *          - `calculatedAverage` = floor(6/1) = 6.
 *          - `6 === node_6.val` (6 === 6) is true. `totalMatchingNodes` becomes 3.
 *          - Returns `[6, 1]`.
 *       iii. For node_5:
 *          - `leftSumOfSubtree`=0, `leftCountOfNodes`=0 (from null).
 *          - `rightSumOfSubtree`=6, `rightCountOfNodes`=1 (from node_6).
 *          - `currentSubtreeSum` = 0 + 6 + 5 = 11.
 *          - `currentSubtreeCount` = 0 + 1 + 1 = 2.
 *          - `calculatedAverage` = floor(11/2) = 5.
 *          - `5 === node_5.val` (5 === 5) is true. `totalMatchingNodes` becomes 4.
 *          - Returns `[11, 2]`.
 *    c. For node_4 (root):
 *       - `leftSumOfSubtree`=9, `leftCountOfNodes`=3 (from node_8).
 *       - `rightSumOfSubtree`=11, `rightCountOfNodes`=2 (from node_5).
 *       - `currentSubtreeSum` = 9 + 11 + 4 = 24.
 *       - `currentSubtreeCount` = 3 + 2 + 1 = 6.
 *       - `calculatedAverage` = floor(24/6) = 4.
 *       - `4 === node_4.val` (4 === 4) is true. `totalMatchingNodes` becomes 5.
 *       - Returns `[24, 6]`.
 * 3. Final `totalMatchingNodes` is 5.
 * Time Complexity: O(N)
 * Space Complexity: O(H)
 */
var averageOfSubtree = function (root) {
  let totalMatchingNodes = 0;

  function calculateSubtreeMetrics(currentNodePointer) {
    if (!currentNodePointer) {
      return [0, 0];
    }

    const [leftSumOfSubtree, leftCountOfNodes] = calculateSubtreeMetrics(
      currentNodePointer.left
    );
    const [rightSumOfSubtree, rightCountOfNodes] = calculateSubtreeMetrics(
      currentNodePointer.right
    );

    const currentSubtreeSum =
      leftSumOfSubtree + rightSumOfSubtree + currentNodePointer.val;
    const currentSubtreeCount = leftCountOfNodes + rightCountOfNodes + 1;

    const calculatedAverage = Math.floor(
      currentSubtreeSum / currentSubtreeCount
    );

    if (calculatedAverage === currentNodePointer.val) {
      totalMatchingNodes++;
    }

    return [currentSubtreeSum, currentSubtreeCount];
  }

  calculateSubtreeMetrics(root);

  return totalMatchingNodes;
};
