/**
 * Sum Of Subarray Ranges
 * Intuition: The sum of subarray ranges can be calculated as the sum of maximums of all subarrays minus the sum of minimums of all subarrays. Both sum of maximums and sum of minimums can be efficiently computed using monotonic stacks by determining the contribution of each element as a maximum or minimum across various subarrays.
 * Approach: 1. For each element, find the index of the nearest element to its left that is strictly smaller/greater than it, and the index of the nearest element to its right that is smaller/greater than or equal to it. This defines the range where the current element is the minimum/maximum.
 *           2. These four arrays (previous smaller, previous greater, next smaller or equal, next greater or equal) are computed using two passes (left-to-right and right-to-left) with monotonic stacks.
 *           3. For each element `nums[i]`, its contribution to the total sum of maximums is `nums[i] * (i - previousGreater[i]) * (nextGreater[i] - i)`.
 *           4. Similarly, its contribution to the total sum of minimums is `nums[i] * (i - previousSmaller[i]) * (nextSmaller[i] - i)`.
 *           5. The final result is the sum of (contribution to maximums - contribution to minimums) for all elements.
 * Dry Run: nums = [1, 2, 3]
 *   n = 3
 *
 *   Pass 1 (Left to right for previous_smaller/greater):
 *   previousSmallerIndices = [-1, 0, 1]
 *   previousGreaterIndices = [-1, -1, -1]
 *
 *   Pass 2 (Right to left for next_smaller_or_equal/greater_or_equal):
 *   nextSmallerIndices = [3, 3, 3]
 *   nextGreaterIndices = [1, 2, 3]
 *
 *   Calculate total sum:
 *   totalOverallRangeSum = 0
 *
 *   i = 0, nums[0] = 1:
 *     leftCountMax = 0 - previousGreaterIndices[0] = 0 - (-1) = 1
 *     rightCountMax = nextGreaterIndices[0] - 0 = 1 - 0 = 1
 *     contribMax = 1 * 1 * 1 = 1
 *
 *     leftCountMin = 0 - previousSmallerIndices[0] = 0 - (-1) = 1
 *     rightCountMin = nextSmallerIndices[0] - 0 = 3 - 0 = 3
 *     contribMin = 1 * 1 * 3 = 3
 *
 *     totalOverallRangeSum += (contribMax - contribMin) = 1 - 3 = -2
 *     totalOverallRangeSum = -2
 *
 *   i = 1, nums[1] = 2:
 *     leftCountMax = 1 - previousGreaterIndices[1] = 1 - (-1) = 2
 *     rightCountMax = nextGreaterIndices[1] - 1 = 2 - 1 = 1
 *     contribMax = 2 * 2 * 1 = 4
 *
 *     leftCountMin = 1 - previousSmallerIndices[1] = 1 - 0 = 1
 *     rightCountMin = nextSmallerIndices[1] - 1 = 3 - 1 = 2
 *     contribMin = 2 * 1 * 2 = 4
 *
 *     totalOverallRangeSum += (contribMax - contribMin) = 4 - 4 = 0
 *     totalOverallRangeSum = -2 + 0 = -2
 *
 *   i = 2, nums[2] = 3:
 *     leftCountMax = 2 - previousGreaterIndices[2] = 2 - (-1) = 3
 *     rightCountMax = nextGreaterIndices[2] - 2 = 3 - 2 = 1
 *     contribMax = 3 * 3 * 1 = 9
 *
 *     leftCountMin = 2 - previousSmallerIndices[2] = 2 - 1 = 1
 *     rightCountMin = nextSmallerIndices[2] - 2 = 3 - 2 = 1
 *     contribMin = 3 * 1 * 1 = 3
 *
 *     totalOverallRangeSum += (contribMax - contribMin) = 9 - 3 = 6
 *     totalOverallRangeSum = -2 + 6 = 4
 *
 *   Final result: 4 (Matches manual calculation: 0+0+0+1+1+2 = 4)
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var subArrayRanges = function (nums) {
  const numsLength = nums.length;

  const previousSmallerIndices = new Array(numsLength);
  const previousGreaterIndices = new Array(numsLength);
  const nextSmallerIndices = new Array(numsLength);
  const nextGreaterIndices = new Array(numsLength);

  const stackLeftMin = [];
  const stackLeftMax = [];

  for (let iterateForward = 0; iterateForward < numsLength; iterateForward++) {
    while (
      stackLeftMin.length > 0 &&
      nums[stackLeftMin[stackLeftMin.length - 1]] >= nums[iterateForward]
    ) {
      stackLeftMin.pop();
    }
    previousSmallerIndices[iterateForward] =
      stackLeftMin.length === 0 ? -1 : stackLeftMin[stackLeftMin.length - 1];
    stackLeftMin.push(iterateForward);

    while (
      stackLeftMax.length > 0 &&
      nums[stackLeftMax[stackLeftMax.length - 1]] <= nums[iterateForward]
    ) {
      stackLeftMax.pop();
    }
    previousGreaterIndices[iterateForward] =
      stackLeftMax.length === 0 ? -1 : stackLeftMax[stackLeftMax.length - 1];
    stackLeftMax.push(iterateForward);
  }

  const stackRightMin = [];
  const stackRightMax = [];

  for (
    let iterateBackward = numsLength - 1;
    iterateBackward >= 0;
    iterateBackward--
  ) {
    while (
      stackRightMin.length > 0 &&
      nums[stackRightMin[stackRightMin.length - 1]] > nums[iterateBackward]
    ) {
      stackRightMin.pop();
    }
    nextSmallerIndices[iterateBackward] =
      stackRightMin.length === 0
        ? numsLength
        : stackRightMin[stackRightMin.length - 1];
    stackRightMin.push(iterateBackward);

    while (
      stackRightMax.length > 0 &&
      nums[stackRightMax[stackRightMax.length - 1]] < nums[iterateBackward]
    ) {
      stackRightMax.pop();
    }
    nextGreaterIndices[iterateBackward] =
      stackRightMax.length === 0
        ? numsLength
        : stackRightMax[stackRightMax.length - 1];
    stackRightMax.push(iterateBackward);
  }

  let totalOverallRangeSum = 0;
  for (
    let calculateResult = 0;
    calculateResult < numsLength;
    calculateResult++
  ) {
    const leftCountForMax =
      calculateResult - previousGreaterIndices[calculateResult];
    const rightCountForMax =
      nextGreaterIndices[calculateResult] - calculateResult;
    const contributionAsMax =
      nums[calculateResult] * leftCountForMax * rightCountForMax;

    const leftCountForMin =
      calculateResult - previousSmallerIndices[calculateResult];
    const rightCountForMin =
      nextSmallerIndices[calculateResult] - calculateResult;
    const contributionAsMin =
      nums[calculateResult] * leftCountForMin * rightCountForMin;

    totalOverallRangeSum += contributionAsMax - contributionAsMin;
  }

  return totalOverallRangeSum;
};
