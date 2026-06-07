/**
 * Minimum Average Difference
 * Intuition: The problem requires calculating averages of prefix and suffix segments. A two-pointer or prefix-sum approach is efficient for this, where we maintain a running sum for the left segment and derive the right segment's sum from the total sum.
 * Approach: 1. Calculate the total sum of all elements in the input array. This sum will initially represent the sum of all elements and will be decremented to represent the right segment's sum. 2. Initialize a variable for the left segment's sum to zero. 3. Iterate through the array from left to right. In each iteration, update the left sum by adding the current element and update the right sum by subtracting the current element. 4. Calculate the average of the left segment (currentLeftSum / count of left elements) and the average of the right segment (currentRightSum / count of right elements). Handle the edge case where the right segment has zero elements, in which case its average is 0. 5. Compute the absolute difference between these two averages. 6. Keep track of the minimum difference found so far and the corresponding index. 7. Return the index with the minimum average difference.
 * Dry Run: nums = [2, 5, 3, 9, 5]
 * nElementsCount = 5
 * totalCollectionSum = 24
 * currentLeftAccumulator = 0
 * minDifferenceFound = Infinity
 * optimalIndex = 0
 *
 * iteratorIndex = 0: nums[0] = 2
 *   currentLeftAccumulator = 0 + 2 = 2
 *   totalCollectionSum = 24 - 2 = 22
 *   currentLeftCount = 1
 *   currentRightCount = 4
 *   leftSideAverage = floor(2 / 1) = 2
 *   rightSideAverage = floor(22 / 4) = 5
 *   presentDifference = abs(2 - 5) = 3
 *   3 < Infinity, so minDifferenceFound = 3, optimalIndex = 0
 *
 * iteratorIndex = 1: nums[1] = 5
 *   currentLeftAccumulator = 2 + 5 = 7
 *   totalCollectionSum = 22 - 5 = 17
 *   currentLeftCount = 2
 *   currentRightCount = 3
 *   leftSideAverage = floor(7 / 2) = 3
 *   rightSideAverage = floor(17 / 3) = 5
 *   presentDifference = abs(3 - 5) = 2
 *   2 < 3, so minDifferenceFound = 2, optimalIndex = 1
 *
 * iteratorIndex = 2: nums[2] = 3
 *   currentLeftAccumulator = 7 + 3 = 10
 *   totalCollectionSum = 17 - 3 = 14
 *   currentLeftCount = 3
 *   currentRightCount = 2
 *   leftSideAverage = floor(10 / 3) = 3
 *   rightSideAverage = floor(14 / 2) = 7
 *   presentDifference = abs(3 - 7) = 4
 *   4 < 2 is false.
 *
 * iteratorIndex = 3: nums[3] = 9
 *   currentLeftAccumulator = 10 + 9 = 19
 *   totalCollectionSum = 14 - 9 = 5
 *   currentLeftCount = 4
 *   currentRightCount = 1
 *   leftSideAverage = floor(19 / 4) = 4
 *   rightSideAverage = floor(5 / 1) = 5
 *   presentDifference = abs(4 - 5) = 1
 *   1 < 2, so minDifferenceFound = 1, optimalIndex = 3
 *
 * iteratorIndex = 4: nums[4] = 5
 *   currentLeftAccumulator = 19 + 5 = 24
 *   totalCollectionSum = 5 - 5 = 0
 *   currentLeftCount = 5
 *   currentRightCount = 0
 *   leftSideAverage = floor(24 / 5) = 4
 *   rightSideAverage = 0 (since currentRightCount is 0)
 *   presentDifference = abs(4 - 0) = 4
 *   4 < 1 is false.
 *
 * Loop ends. Return optimalIndex = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumAverageDifference = function (nums) {
  const nElementsCount = nums.length;
  let totalCollectionSum = 0;
  for (let currentNumber of nums) {
    totalCollectionSum += currentNumber;
  }

  let currentLeftAccumulator = 0;
  let minDifferenceFound = Infinity;
  let optimalIndex = 0;

  for (let iteratorIndex = 0; iteratorIndex < nElementsCount; iteratorIndex++) {
    currentLeftAccumulator += nums[iteratorIndex];
    totalCollectionSum -= nums[iteratorIndex];

    const currentLeftCount = iteratorIndex + 1;
    const currentRightCount = nElementsCount - iteratorIndex - 1;

    const leftSideAverage = Math.floor(
      currentLeftAccumulator / currentLeftCount,
    );
    const rightSideAverage =
      currentRightCount === 0
        ? 0
        : Math.floor(totalCollectionSum / currentRightCount);

    const presentDifference = Math.abs(leftSideAverage - rightSideAverage);

    if (presentDifference < minDifferenceFound) {
      minDifferenceFound = presentDifference;
      optimalIndex = iteratorIndex;
    }
  }

  return optimalIndex;
};
