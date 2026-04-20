/**
 * Shortest Subarray With Sum At Least K
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var shortestSubarray = function (nums, k) {
  const prefixSumCollection = [0];
  for (
    let currentNumIndex = 0;
    currentNumIndex < nums.length;
    currentNumIndex++
  ) {
    prefixSumCollection.push(
      prefixSumCollection[currentNumIndex] + nums[currentNumIndex],
    );
  }

  const indexDeque = [];
  let minimumSubarrayLength = Infinity;

  for (
    let evaluationPoint = 0;
    evaluationPoint < prefixSumCollection.length;
    evaluationPoint++
  ) {
    while (
      indexDeque.length > 0 &&
      prefixSumCollection[evaluationPoint] -
        prefixSumCollection[indexDeque[0]] >=
        k
    ) {
      minimumSubarrayLength = Math.min(
        minimumSubarrayLength,
        evaluationPoint - indexDeque.shift(),
      );
    }
    while (
      indexDeque.length > 0 &&
      prefixSumCollection[evaluationPoint] <=
        prefixSumCollection[indexDeque[indexDeque.length - 1]]
    ) {
      indexDeque.pop();
    }
    indexDeque.push(evaluationPoint);
  }

  return minimumSubarrayLength === Infinity ? -1 : minimumSubarrayLength;
};
