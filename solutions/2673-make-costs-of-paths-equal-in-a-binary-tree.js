/**
 * Make Costs Of Paths Equal In A Binary Tree
 * Intuition: The problem requires all root-to-leaf path sums to be equal with minimum increments. This implies a bottom-up approach is optimal. For any parent node, its two children's subtrees must eventually contribute equal path sums to maintain balance upwards. We can achieve this by ensuring the "effective path sum from a child down to its leaves" is equal for both children, adding increments to the smaller path.
 * Approach: 1. Initialize a variable, `totalRequiredIncrements`, to store the cumulative increments. 2. Iterate through the `cost` array from the last parent node (which is `Math.floor(n / 2) - 1` in 0-indexed terms) down to the root node (index `0`). 3. For each parent node at `currentNodeIndex`, calculate its left child's index (`leftChildNodeIndex = 2 * currentNodeIndex + 1`) and right child's index (`rightChildNodeIndex = 2 * currentNodeIndex + 2`). 4. Retrieve the current path sums from the children downwards, which are stored in `cost[leftChildNodeIndex]` and `cost[rightChildNodeIndex]` (as previous iterations have already processed their subtrees). 5. Determine the `maximumChildPathValue` between these two children's path sums. 6. Add the difference between `maximumChildPathValue` and each child's current path sum to `totalRequiredIncrements`. This represents the increments needed to balance the two child paths. 7. Update the parent node's cost (`cost[currentNodeIndex]`) by adding `maximumChildPathValue` to it. This modified `cost[currentNodeIndex]` now effectively represents the maximum path sum from this parent node down to any leaf in its subtree, using the newly balanced child paths. 8. After the loop completes, `totalRequiredIncrements` will hold the minimum total increments.
 * Dry Run: n = 7, cost = [1, 5, 2, 2, 3, 3, 1]
 * totalRequiredIncrements = 0
 * Loop from currentNodeIndex = 2 down to 0:
 *   currentNodeIndex = 2: (Corresponds to node 3 with original cost 2)
 *     leftChildNodeIndex = 5 (Corresponds to node 6 with cost[5]=3)
 *     rightChildNodeIndex = 6 (Corresponds to node 7 with cost[6]=1)
 *     leftPathCurrentSum = 3
 *     rightPathCurrentSum = 1
 *     maximumChildPathValue = Math.max(3, 1) = 3
 *     totalRequiredIncrements += (3 - 3) + (3 - 1) = 0 + 2 = 2
 *     cost[2] += 3 => cost[2] = 2 + 3 = 5. cost becomes [1, 5, 5, 2, 3, 3, 1]
 *
 *   currentNodeIndex = 1: (Corresponds to node 2 with original cost 5)
 *     leftChildNodeIndex = 3 (Corresponds to node 4 with cost[3]=2)
 *     rightChildNodeIndex = 4 (Corresponds to node 5 with cost[4]=3)
 *     leftPathCurrentSum = 2
 *     rightPathCurrentSum = 3
 *     maximumChildPathValue = Math.max(2, 3) = 3
 *     totalRequiredIncrements += (3 - 2) + (3 - 3) = 1 + 0 = 1. totalRequiredIncrements = 2 + 1 = 3
 *     cost[1] += 3 => cost[1] = 5 + 3 = 8. cost becomes [1, 8, 5, 2, 3, 3, 1]
 *
 *   currentNodeIndex = 0: (Corresponds to node 1 with original cost 1)
 *     leftChildNodeIndex = 1 (Corresponds to node 2 with updated cost[1]=8)
 *     rightChildNodeIndex = 2 (Corresponds to node 3 with updated cost[2]=5)
 *     leftPathCurrentSum = 8
 *     rightPathCurrentSum = 5
 *     maximumChildPathValue = Math.max(8, 5) = 8
 *     totalRequiredIncrements += (8 - 8) + (8 - 5) = 0 + 3 = 3. totalRequiredIncrements = 3 + 3 = 6
 *     cost[0] += 8 => cost[0] = 1 + 8 = 9. cost becomes [9, 8, 5, 2, 3, 3, 1]
 *
 * Final totalRequiredIncrements = 6.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minIncrements = function (n, cost) {
  let totalRequiredIncrements = 0;

  for (
    let currentNodeIndex = Math.floor(n / 2) - 1;
    currentNodeIndex >= 0;
    currentNodeIndex--
  ) {
    let leftChildNodeIndex = 2 * currentNodeIndex + 1;
    let rightChildNodeIndex = 2 * currentNodeIndex + 2;

    let leftPathCurrentSum = cost[leftChildNodeIndex];
    let rightPathCurrentSum = cost[rightChildNodeIndex];

    let maximumChildPathValue = Math.max(
      leftPathCurrentSum,
      rightPathCurrentSum,
    );

    totalRequiredIncrements += maximumChildPathValue - leftPathCurrentSum;
    totalRequiredIncrements += maximumChildPathValue - rightPathCurrentSum;

    cost[currentNodeIndex] += maximumChildPathValue;
  }

  return totalRequiredIncrements;
};
