/**
 * Shortest Subarray With Sum At Least K
 * Intuition: Prefix sums turn subarray sums into P[j]-P[i]. A deque of increasing prefixes lets us pop the leftmost i once P[j]-P[i]≥k (that i is done) and drop worse (larger) prefixes from the back.
 * Approach: 1. Build `prefixSumCollection` with leading 0. 2. For each j: while deque front satisfies sum≥k, update min length and shift. 3. Pop back while P[j] ≤ P[back]. Push j. 4. Return min or -1.
 * Dry Run: nums=[2,-1,2], k=3. Prefix [0,2,1,4]. At j=3, 4-0≥3 length 3; 4-1≥3 length 2. Return 2.
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
      prefixSumCollection[currentNumIndex] + nums[currentNumIndex]
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
        evaluationPoint - indexDeque.shift()
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
