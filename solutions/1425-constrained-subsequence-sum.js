/**
 * Constrained Subsequence Sum
 * Intuition: dp[i] is the best subsequence ending at i: nums[i] alone, or nums[i] plus the best dp in the last windowConstraint indices. A decreasing deque of indices keeps the window max in amortized O(1).
 * Approach: 1. Copy nums into dynamicProgression. 2. For each i, drop deque heads older than i - windowConstraint. 3. If the deque is non-empty, set dp[i] = max(dp[i], dp[front] + nums[i]). 4. Pop back indices whose dp is <= dp[i], then push i. 5. Track the global max dp value.
 * Dry Run: nums = [10,2,-10,5,20], k = 2
 *   - i=0: dp=[10,...], max=10, deque=[0]
 *   - i=1: dp[1]=max(2,10+2)=12, max=12
 *   - i=3: take 12 + 5 = 17, then i=4: 17+20=37. Return 37.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var constrainedSubsetSum = function (numericArray, windowConstraint) {
  const dynamicProgression = [...numericArray];
  const indicesDeque = [];
  let maximalSubsequenceSum = numericArray[0];

  for (
    let currentIterationIndex = 0;
    currentIterationIndex < numericArray.length;
    currentIterationIndex++
  ) {
    while (
      indicesDeque.length > 0 &&
      indicesDeque[0] < currentIterationIndex - windowConstraint
    ) {
      indicesDeque.shift();
    }

    if (indicesDeque.length > 0) {
      dynamicProgression[currentIterationIndex] = Math.max(
        dynamicProgression[currentIterationIndex],
        dynamicProgression[indicesDeque[0]] +
          numericArray[currentIterationIndex]
      );
    }

    while (
      indicesDeque.length > 0 &&
      dynamicProgression[indicesDeque[indicesDeque.length - 1]] <=
        dynamicProgression[currentIterationIndex]
    ) {
      indicesDeque.pop();
    }

    indicesDeque.push(currentIterationIndex);
    maximalSubsequenceSum = Math.max(
      maximalSubsequenceSum,
      dynamicProgression[currentIterationIndex]
    );
  }

  return maximalSubsequenceSum;
};
