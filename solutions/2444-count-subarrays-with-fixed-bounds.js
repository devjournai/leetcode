/**
 * Count Subarrays With Fixed Bounds
 * Intuition: A fixed-bound subarray must contain only elements within the [minK, maxK] range, and must include both minK and maxK. We can process the array linearly, identifying valid segments and within those segments, count subarrays that satisfy the min/max conditions.
 * Approach: 1. Initialize a counter for fixed-bound subarrays, a pointer for the start of the current valid segment (where all numbers are within [minK, maxK]), and pointers for the most recent occurrences of minK and maxK. 2. Iterate through the array. 3. If an element is outside [minK, maxK], it breaks the current valid segment; advance the segment start pointer past this element and effectively reset minK/maxK tracking for new segments. 4. Update the most recent indices for minK and maxK when they are encountered. 5. For each position, calculate how many valid starting points exist for fixed-bound subarrays ending at the current position. This is determined by the minimum of the most recent minK and maxK indices, relative to the current valid segment's start.
 * Dry Run: nums = [1, 3, 2, 1, 4], minK = 1, maxK = 3
 * Initial: countOverall = 0, blockBeginning = 0, mostRecentMin = -1, mostRecentMax = -1
 * iterativeIndex = 0, currentNumber = 1:
 *   - 1 is within [1,3].
 *   - currentNumber === minK -> mostRecentMin = 0.
 *   - candidateCount = Math.min(0, -1) - 0 + 1 = 0.
 *   - countOverall = 0 + Math.max(0, 0) = 0.
 * iterativeIndex = 1, currentNumber = 3:
 *   - 3 is within [1,3].
 *   - currentNumber === maxK -> mostRecentMax = 1.
 *   - candidateCount = Math.min(0, 1) - 0 + 1 = 1.
 *   - countOverall = 0 + Math.max(0, 1) = 1. (Subarray: [1,3])
 * iterativeIndex = 2, currentNumber = 2:
 *   - 2 is within [1,3].
 *   - candidateCount = Math.min(0, 1) - 0 + 1 = 1.
 *   - countOverall = 1 + Math.max(0, 1) = 2. (Subarray: [1,3,2])
 * iterativeIndex = 3, currentNumber = 1:
 *   - 1 is within [1,3].
 *   - currentNumber === minK -> mostRecentMin = 3.
 *   - candidateCount = Math.min(3, 1) - 0 + 1 = 1 - 0 + 1 = 2.
 *   - countOverall = 2 + Math.max(0, 2) = 4. (Subarrays: [1,3,2,1], [3,2,1])
 * iterativeIndex = 4, currentNumber = 4:
 *   - 4 is > maxK.
 *   - blockBeginning = 4 + 1 = 5.
 *   - candidateCount = Math.min(3, 1) - 5 + 1 = 1 - 5 + 1 = -3.
 *   - countOverall = 4 + Math.max(0, -3) = 4.
 * Return 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countSubarrays = function (nums, minK, maxK) {
  let countOverall = 0;
  let blockBeginning = 0;
  let mostRecentMin = -1;
  let mostRecentMax = -1;

  for (let iterativeIndex = 0; iterativeIndex < nums.length; iterativeIndex++) {
    let currentNumber = nums[iterativeIndex];

    if (currentNumber < minK || currentNumber > maxK) {
      blockBeginning = iterativeIndex + 1;
    }
    if (currentNumber === minK) {
      mostRecentMin = iterativeIndex;
    }
    if (currentNumber === maxK) {
      mostRecentMax = iterativeIndex;
    }

    let candidateCount =
      Math.min(mostRecentMin, mostRecentMax) - blockBeginning + 1;
    countOverall += Math.max(0, candidateCount);
  }

  return countOverall;
};
