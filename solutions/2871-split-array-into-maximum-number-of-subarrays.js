/**
 * Split Array Into Maximum Number Of Subarrays
 * Intuition: To minimize the sum of scores, we aim to make each subarray's score 0, as 0 is the minimum possible score for a non-negative bitwise AND. This strategy is only possible if the bitwise AND of all elements in the entire array is 0. If the total AND is not 0, then no subarray can have a score of 0, and the minimum sum of scores is achieved by having a single subarray (the whole array) whose score is the total AND. If the total AND is 0, we greedily split the array into as many subarrays as possible, each having a bitwise AND score of 0.
 * Approach: 1. Calculate the bitwise AND of all elements in the `nums` array. Let's call this `totalArrayAnd`. 2. If `totalArrayAnd` is not 0, it means no individual subarray can have an AND sum of 0. Thus, the minimum sum of scores is `totalArrayAnd` itself, achieved by splitting the array into just one subarray (the entire array). In this case, return 1. 3. If `totalArrayAnd` is 0, then it is possible to achieve a sum of scores of 0 by making each subarray's score 0. Iterate through the array, maintaining a running bitwise AND for the current subarray being formed. Whenever this running AND becomes 0, increment the count of subarrays and reset the running AND to start a new subarray. The goal is to maximize the number of such 0-score subarrays.
 * Dry Run: nums = [1, 2, 0, 3, 4, 0]
 * 1. Calculate totalArrayAnd:
 *    - Initialize totalArrayAnd = nums[0] = 1
 *    - For firstLoopIndex = 1: totalArrayAnd = 1 & nums[1] = 1 & 2 = 0
 *    - For firstLoopIndex = 2: totalArrayAnd = 0 & nums[2] = 0 & 0 = 0
 *    - ... (totalArrayAnd remains 0 for subsequent elements)
 *    - Final totalArrayAnd = 0
 * 2. totalArrayAnd is 0, so proceed to split.
 *    - Initialize subarraysCount = 0
 *    - Initialize currentSubarrayAnd = -1 (sentinel for "start a new subarray")
 * 3. Iterate through nums with secondLoopIndex:
 *    - secondLoopIndex = 0, currentElement = 1:
 *      - currentSubarrayAnd is -1, set currentSubarrayAnd = 1
 *    - secondLoopIndex = 1, currentElement = 2:
 *      - currentSubarrayAnd = 1 & 2 = 0
 *      - currentSubarrayAnd is 0, so increment subarraysCount to 1. Reset currentSubarrayAnd = -1.
 *    - secondLoopIndex = 2, currentElement = 0:
 *      - currentSubarrayAnd is -1, set currentSubarrayAnd = 0
 *      - currentSubarrayAnd is 0, so increment subarraysCount to 2. Reset currentSubarrayAnd = -1.
 *    - secondLoopIndex = 3, currentElement = 3:
 *      - currentSubarrayAnd is -1, set currentSubarrayAnd = 3
 *    - secondLoopIndex = 4, currentElement = 4:
 *      - currentSubarrayAnd = 3 & 4 = 0
 *      - currentSubarrayAnd is 0, so increment subarraysCount to 3. Reset currentSubarrayAnd = -1.
 *    - secondLoopIndex = 5, currentElement = 0:
 *      - currentSubarrayAnd is -1, set currentSubarrayAnd = 0
 *      - currentSubarrayAnd is 0, so increment subarraysCount to 4. Reset currentSubarrayAnd = -1.
 * 4. Loop ends. Return subarraysCount = 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxSubarrays = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let totalArrayAnd = nums[0];
  let firstLoopIndex;
  for (firstLoopIndex = 1; firstLoopIndex < nums.length; firstLoopIndex++) {
    totalArrayAnd = totalArrayAnd & nums[firstLoopIndex];
  }

  if (totalArrayAnd !== 0) {
    return 1;
  }

  let subarraysCount = 0;
  let currentSubarrayAnd = -1; // Sentinel value indicating a new subarray should start
  let secondLoopIndex;

  for (secondLoopIndex = 0; secondLoopIndex < nums.length; secondLoopIndex++) {
    let currentElement = nums[secondLoopIndex];
    if (currentSubarrayAnd === -1) {
      currentSubarrayAnd = currentElement;
    } else {
      currentSubarrayAnd = currentSubarrayAnd & currentElement;
    }

    if (currentSubarrayAnd === 0) {
      subarraysCount++;
      currentSubarrayAnd = -1; // Reset to start a new subarray
    }
  }

  return subarraysCount;
};
