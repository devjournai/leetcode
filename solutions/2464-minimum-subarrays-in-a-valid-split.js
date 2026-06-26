/**
 * Minimum Subarrays In A Valid Split
 * Intuition: This problem asks for the minimum number of subarrays, which is a classic indicator for dynamic programming. We can define a state `minimumSubarrayCounts[k]` as the minimum number of valid subarrays needed to split the prefix `nums[0...k-1]`.
 * Approach: 1. Initialize a `minimumSubarrayCounts` array of size `n + 1` with `Infinity`, representing an unreachable state. Set `minimumSubarrayCounts[0]` to `0`, as an empty prefix requires zero subarrays. 2. Iterate `currentPrefixLengthIndex` from `1` to `n` (inclusive). For each `currentPrefixLengthIndex`, we aim to compute `minimumSubarrayCounts[currentPrefixLengthIndex]`. 3. Inside this loop, iterate `previousSplitPointIndex` from `0` to `currentPrefixLengthIndex - 1`. `previousSplitPointIndex` marks the end of the previous valid split, meaning `nums[previousSplitPointIndex ... currentPrefixLengthIndex-1]` would be the last subarray. 4. Check if `minimumSubarrayCounts[previousSplitPointIndex]` is not `Infinity`. If it's reachable, then consider forming a new subarray from `nums[previousSplitPointIndex]` to `nums[currentPrefixLengthIndex - 1]`. 5. Compute the greatest common divisor (GCD) of `nums[previousSplitPointIndex]` and `nums[currentPrefixLengthIndex - 1]`. If the GCD is greater than 1, then this forms a valid last subarray. 6. Update `minimumSubarrayCounts[currentPrefixLengthIndex]` with `Math.min(minimumSubarrayCounts[currentPrefixLengthIndex], minimumSubarrayCounts[previousSplitPointIndex] + 1)`. 7. After all iterations, `minimumSubarrayCounts[n]` will hold the minimum number of subarrays for the entire array. If it's still `Infinity`, no valid split is possible, so return `-1`. Otherwise, return `minimumSubarrayCounts[n]`. 8. A helper `calculateGcd` function is used for GCD computation.
 * Dry Run: nums = [2, 3, 6]
 *   numberCount = 3
 *   minimumSubarrayCounts = [0, Infinity, Infinity, Infinity]
 *
 *   Helper calculateGcd(a, b):
 *     calculateGcd(2,3) = 1
 *     calculateGcd(2,6) = 2
 *     calculateGcd(3,6) = 3
 *
 *   currentPrefixLengthIndex = 1: (processing prefix [2])
 *     previousSplitPointIndex = 0:
 *       minimumSubarrayCounts[0] is 0 (reachable).
 *       startElement = nums[0] = 2, endElement = nums[0] = 2.
 *       calculateGcd(2,2) = 2 > 1. Valid.
 *       minimumSubarrayCounts[1] = Math.min(Infinity, minimumSubarrayCounts[0] + 1) = Math.min(Infinity, 0 + 1) = 1.
 *     minimumSubarrayCounts = [0, 1, Infinity, Infinity]
 *
 *   currentPrefixLengthIndex = 2: (processing prefix [2, 3])
 *     previousSplitPointIndex = 0:
 *       minimumSubarrayCounts[0] is 0 (reachable).
 *       startElement = nums[0] = 2, endElement = nums[1] = 3.
 *       calculateGcd(2,3) = 1 (not > 1). Skip.
 *     previousSplitPointIndex = 1:
 *       minimumSubarrayCounts[1] is 1 (reachable).
 *       startElement = nums[1] = 3, endElement = nums[1] = 3.
 *       calculateGcd(3,3) = 3 > 1. Valid.
 *       minimumSubarrayCounts[2] = Math.min(Infinity, minimumSubarrayCounts[1] + 1) = Math.min(Infinity, 1 + 1) = 2.
 *     minimumSubarrayCounts = [0, 1, 2, Infinity]
 *
 *   currentPrefixLengthIndex = 3: (processing prefix [2, 3, 6])
 *     previousSplitPointIndex = 0:
 *       minimumSubarrayCounts[0] is 0 (reachable).
 *       startElement = nums[0] = 2, endElement = nums[2] = 6.
 *       calculateGcd(2,6) = 2 > 1. Valid.
 *       minimumSubarrayCounts[3] = Math.min(Infinity, minimumSubarrayCounts[0] + 1) = Math.min(Infinity, 0 + 1) = 1.
 *     previousSplitPointIndex = 1:
 *       minimumSubarrayCounts[1] is 1 (reachable).
 *       startElement = nums[1] = 3, endElement = nums[2] = 6.
 *       calculateGcd(3,6) = 3 > 1. Valid.
 *       minimumSubarrayCounts[3] = Math.min(1, minimumSubarrayCounts[1] + 1) = Math.min(1, 1 + 1) = 1. (No change, min is still 1)
 *     previousSplitPointIndex = 2:
 *       minimumSubarrayCounts[2] is 2 (reachable).
 *       startElement = nums[2] = 6, endElement = nums[2] = 6.
 *       calculateGcd(6,6) = 6 > 1. Valid.
 *       minimumSubarrayCounts[3] = Math.min(1, minimumSubarrayCounts[2] + 1) = Math.min(1, 2 + 1) = 1. (No change, min is still 1)
 *     minimumSubarrayCounts = [0, 1, 2, 1]
 *
 *   Final result: minimumSubarrayCounts[3] = 1.
 *
 * Time Complexity: O(N^2 * log(max(nums)))
 * Space Complexity: O(N)
 */
var validSubarraySplit = function (nums) {
  const numberCount = nums.length;
  const minimumSubarrayCounts = new Array(numberCount + 1).fill(Infinity);
  minimumSubarrayCounts[0] = 0;

  for (
    let currentPrefixLengthIndex = 1;
    currentPrefixLengthIndex <= numberCount;
    currentPrefixLengthIndex++
  ) {
    for (
      let previousSplitPointIndex = 0;
      previousSplitPointIndex < currentPrefixLengthIndex;
      previousSplitPointIndex++
    ) {
      if (minimumSubarrayCounts[previousSplitPointIndex] !== Infinity) {
        const startElement = nums[previousSplitPointIndex];
        const endElement = nums[currentPrefixLengthIndex - 1];
        if (calculateGcd(startElement, endElement) > 1) {
          minimumSubarrayCounts[currentPrefixLengthIndex] = Math.min(
            minimumSubarrayCounts[currentPrefixLengthIndex],
            minimumSubarrayCounts[previousSplitPointIndex] + 1,
          );
        }
      }
    }
  }

  return minimumSubarrayCounts[numberCount] === Infinity
    ? -1
    : minimumSubarrayCounts[numberCount];

  function calculateGcd(firstNumber, secondNumber) {
    while (secondNumber !== 0) {
      const tempValue = secondNumber;
      secondNumber = firstNumber % secondNumber;
      firstNumber = tempValue;
    }
    return firstNumber;
  }
};
