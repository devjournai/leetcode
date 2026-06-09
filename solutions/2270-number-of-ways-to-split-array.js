/**
 * Number Of Ways To Split Array
 * Intuition: To efficiently check split conditions, we need quick access to prefix sums. Pre-calculating these sums allows constant time retrieval for any left-side sum and derived right-side sum, making the validation process straightforward.
 * Approach: 1. Compute a prefix sum array where each element stores the sum of numbers from the start of the array up to that index. 2. Iterate through all possible split points (excluding the last element as per problem constraints). 3. For each split point, use the precomputed prefix sums to find the sum of the left part and derive the sum of the right part. 4. If the left sum is greater than or equal to the right sum, increment a counter.
 * Dry Run: nums = [10, 4, -8, 7]
 * n = 4
 * 1. Prefix Sum Array Calculation:
 *    prefixSummation = new Array(4)
 *    accumulatedSum = 0
 *    buildIndex = 0: accumulatedSum = 10, prefixSummation[0] = 10
 *    buildIndex = 1: accumulatedSum = 10 + 4 = 14, prefixSummation[1] = 14
 *    buildIndex = 2: accumulatedSum = 14 - 8 = 6, prefixSummation[2] = 6
 *    buildIndex = 3: accumulatedSum = 6 + 7 = 13, prefixSummation[3] = 13
 *    prefixSummation = [10, 14, 6, 13]
 * 2. Split Validation:
 *    validSplitCounter = 0
 *    arrayTotalSum = prefixSummation[3] = 13
 *    splitCandidateIndex iterates from 0 to n - 2 = 2
 *    - splitCandidateIndex = 0:
 *        leftSideSum = prefixSummation[0] = 10
 *        rightSideSum = arrayTotalSum - leftSideSum = 13 - 10 = 3
 *        10 >= 3 (True) -> validSplitCounter = 1
 *    - splitCandidateIndex = 1:
 *        leftSideSum = prefixSummation[1] = 14
 *        rightSideSum = arrayTotalSum - leftSideSum = 13 - 14 = -1
 *        14 >= -1 (True) -> validSplitCounter = 2
 *    - splitCandidateIndex = 2:
 *        leftSideSum = prefixSummation[2] = 6
 *        rightSideSum = arrayTotalSum - leftSideSum = 13 - 6 = 7
 *        6 >= 7 (False)
 * 3. Return validSplitCounter = 2.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var waysToSplitArray = function (nums) {
  let currentLength = nums.length;
  let prefixSummation = new Array(currentLength);
  let accumulatedSum = 0;

  for (let buildIndex = 0; buildIndex < currentLength; ++buildIndex) {
    accumulatedSum += nums[buildIndex];
    prefixSummation[buildIndex] = accumulatedSum;
  }

  let validSplitCounter = 0;
  let arrayTotalSum = prefixSummation[currentLength - 1];

  for (
    let splitCandidateIndex = 0;
    splitCandidateIndex < currentLength - 1;
    ++splitCandidateIndex
  ) {
    let leftSideSum = prefixSummation[splitCandidateIndex];
    let rightSideSum = arrayTotalSum - leftSideSum;
    if (leftSideSum >= rightSideSum) {
      validSplitCounter++;
    }
  }

  return validSplitCounter;
};
