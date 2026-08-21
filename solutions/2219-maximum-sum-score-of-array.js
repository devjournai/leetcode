/**
 * Maximum Sum Score Of Array
 * Intuition: The problem requires calculating the maximum of a prefix sum and a suffix sum at each index, then finding the overall maximum among these scores. An efficient way to achieve this is by maintaining a running prefix sum and deriving the suffix sum using the total sum of the array. This allows for a single pass through the array after an initial pass to compute the total sum.
 * Approach: 1. First, calculate the sum of all elements in the input `nums` array. This will be used to derive suffix sums. 2. Initialize `currentRunningPrefixSum` to zero and `greatestSumScore` to negative infinity to track the maximum score. 3. Iterate through the `nums` array using a `while` loop. In each iteration for an element at `loopIndex`: a. Update `currentRunningPrefixSum` by adding `nums[loopIndex]`. b. Calculate `calculatedSuffixSum` as `entireArraySum - currentRunningPrefixSum + nums[loopIndex]`. This formula correctly represents `sum(nums[loopIndex...numsLength-1])`. c. Determine `currentIterationScore` by taking the maximum of `currentRunningPrefixSum` and `calculatedSuffixSum`. d. Update `greatestSumScore` if `currentIterationScore` is larger. 4. After the loop completes, return `greatestSumScore`.
 * Dry Run: nums = [1, 2, 3]
 *   numsLength = 3
 *
 *   1. Calculate entireArraySum:
 *      entireArraySum = 0
 *      summationIndex = 0: entireArraySum += nums[0] (1) => entireArraySum = 1
 *      summationIndex = 1: entireArraySum += nums[1] (2) => entireArraySum = 3
 *      summationIndex = 2: entireArraySum += nums[2] (3) => entireArraySum = 6
 *      (entireArraySum is 6)
 *
 *   2. Iterate and find greatestSumScore:
 *      currentRunningPrefixSum = 0
 *      greatestSumScore = -Infinity
 *      loopIndex = 0
 *
 *      loopIndex = 0 (nums[0] = 1):
 *        currentRunningPrefixSum += nums[0] (1) => currentRunningPrefixSum = 1
 *        calculatedSuffixSum = entireArraySum - currentRunningPrefixSum + nums[0] = 6 - 1 + 1 = 6
 *        currentIterationScore = Math.max(1, 6) = 6
 *        greatestSumScore = Math.max(-Infinity, 6) = 6
 *        loopIndex increments to 1
 *
 *      loopIndex = 1 (nums[1] = 2):
 *        currentRunningPrefixSum += nums[1] (2) => currentRunningPrefixSum = 1 + 2 = 3
 *        calculatedSuffixSum = entireArraySum - currentRunningPrefixSum + nums[1] = 6 - 3 + 2 = 5
 *        currentIterationScore = Math.max(3, 5) = 5
 *        greatestSumScore = Math.max(6, 5) = 6
 *        loopIndex increments to 2
 *
 *      loopIndex = 2 (nums[2] = 3):
 *        currentRunningPrefixSum += nums[2] (3) => currentRunningPrefixSum = 3 + 3 = 6
 *        calculatedSuffixSum = entireArraySum - currentRunningPrefixSum + nums[2] = 6 - 6 + 3 = 3
 *        currentIterationScore = Math.max(6, 3) = 6
 *        greatestSumScore = Math.max(6, 6) = 6
 *        loopIndex increments to 3
 *
 *      loopIndex (3) is not less than numsLength (3), loop terminates.
 *
 *   Return greatestSumScore (6).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximumSumScore = function (nums) {
  const numsLength = nums.length;
  let entireArraySum = 0;
  let summationIndex = 0;

  while (summationIndex < numsLength) {
    entireArraySum += nums[summationIndex];
    summationIndex++;
  }

  let currentRunningPrefixSum = 0;
  let greatestSumScore = -Infinity;
  let loopIndex = 0;

  while (loopIndex < numsLength) {
    currentRunningPrefixSum += nums[loopIndex];
    const calculatedSuffixSum =
      entireArraySum - currentRunningPrefixSum + nums[loopIndex];
    const currentIterationScore = Math.max(
      currentRunningPrefixSum,
      calculatedSuffixSum
    );
    greatestSumScore = Math.max(greatestSumScore, currentIterationScore);
    loopIndex++;
  }

  return greatestSumScore;
};
