/**
 * Find The Maximum Sum Of Node Values
 * Intuition: The operation allows us to XOR any chosen node `u` with `k`, and its neighbor `v` with `k`. A key property in trees is that this allows us to effectively XOR any *pair* of nodes with `k` without affecting other nodes. This means we can independently decide for each node `i` whether its final value will be `nums[i]` or `nums[i] XOR k`, with the global constraint that the total number of nodes whose values are `nums[i] XOR k` must be even. To maximize the sum, we greedily choose `max(nums[i], nums[i] XOR k)` for each node `i`. We then count how many nodes actually switched to `nums[i] XOR k`. If this count is even, our greedy sum is the answer. If the count is odd, we must "undo" one of our greedy choices to make the count even. To minimize the reduction in sum, we subtract the smallest absolute difference `|nums[i] - (nums[i] XOR k)|` from our current sum.
 * Approach: 1. Initialize `overallSumValue` to 0, `smallestAbsoluteDifference` to `Infinity`, and `xorToggledCount` to 0. 2. Iterate through each `originalNodeValue` in the `nums` array. 3. For each `originalNodeValue`, calculate its `transformedNodeValue` as `originalNodeValue XOR k`. 4. Determine the `currentValueDifference` as `transformedNodeValue - originalNodeValue`. 5. If `currentValueDifference` is positive, it means `transformedNodeValue` yields a larger sum; add `transformedNodeValue` to `overallSumValue` and increment `xorToggledCount`. 6. Otherwise (if `transformedNodeValue` is not greater than `originalNodeValue`), add `originalNodeValue` to `overallSumValue`. 7. Update `smallestAbsoluteDifference` with `Math.min(smallestAbsoluteDifference, Math.abs(currentValueDifference))`. 8. After iterating through all nodes, if `xorToggledCount` is even, return `overallSumValue`. 9. If `xorToggledCount` is odd, return `overallSumValue - smallestAbsoluteDifference`.
 * Dry Run: nums = [2, 3, 4], k = 1, edges = [[0,1],[0,2]]
 * 1. Initialize: `overallSumValue = 0`, `smallestAbsoluteDifference = Infinity`, `xorToggledCount = 0`.
 * 2. Process node 0: `originalNodeValue = 2`.
 *    `transformedNodeValue = 2 ^ 1 = 3`.
 *    `currentValueDifference = 3 - 2 = 1`.
 *    `currentValueDifference > 0`. `overallSumValue = 0 + 3 = 3`. `xorToggledCount = 1`.
 *    `smallestAbsoluteDifference = Math.min(Infinity, Math.abs(1)) = 1`.
 * 3. Process node 1: `originalNodeValue = 3`.
 *    `transformedNodeValue = 3 ^ 1 = 2`.
 *    `currentValueDifference = 2 - 3 = -1`.
 *    `currentValueDifference > 0` is false. `overallSumValue = 3 + 3 = 6`. `xorToggledCount` remains `1`.
 *    `smallestAbsoluteDifference = Math.min(1, Math.abs(-1)) = 1`.
 * 4. Process node 2: `originalNodeValue = 4`.
 *    `transformedNodeValue = 4 ^ 1 = 5`.
 *    `currentValueDifference = 5 - 4 = 1`.
 *    `currentValueDifference > 0`. `overallSumValue = 6 + 5 = 11`. `xorToggledCount = 1 + 1 = 2`.
 *    `smallestAbsoluteDifference = Math.min(1, Math.abs(1)) = 1`.
 * 5. Loop ends. `xorToggledCount = 2` (even).
 * 6. Return `overallSumValue = 11`.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximumValueSum = function (nums, k, edges) {
  let overallSumValue = 0;
  let smallestAbsoluteDifference = Infinity;
  let xorToggledCount = 0;

  for (
    let currentNumberIndex = 0;
    currentNumberIndex < nums.length;
    ++currentNumberIndex
  ) {
    const originalNodeValue = nums[currentNumberIndex];
    const transformedNodeValue = originalNodeValue ^ k;
    const currentValueDifference = transformedNodeValue - originalNodeValue;

    if (currentValueDifference > 0) {
      overallSumValue += transformedNodeValue;
      xorToggledCount++;
    } else {
      overallSumValue += originalNodeValue;
    }

    smallestAbsoluteDifference = Math.min(
      smallestAbsoluteDifference,
      Math.abs(currentValueDifference)
    );
  }

  if (xorToggledCount % 2 === 0) {
    return overallSumValue;
  }

  return overallSumValue - smallestAbsoluteDifference;
};
