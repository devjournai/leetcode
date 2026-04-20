/**
 * Minimum Operations To Reduce X To Zero
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums, x) {
  const allElementsSum = nums.reduce(
    (initialSum, currentNum) => initialSum + currentNum,
    0,
  );
  const desiredWindowSum = allElementsSum - x;

  if (desiredWindowSum < 0) {
    return -1;
  }

  if (desiredWindowSum === 0) {
    return nums.length;
  }

  let currentSegmentSum = 0;
  let maximumWindowLength = -1;
  let segmentStart = 0;

  for (let segmentEnd = 0; segmentEnd < nums.length; segmentEnd++) {
    currentSegmentSum += nums[segmentEnd];

    while (currentSegmentSum > desiredWindowSum && segmentStart <= segmentEnd) {
      currentSegmentSum -= nums[segmentStart];
      segmentStart++;
    }

    if (currentSegmentSum === desiredWindowSum) {
      maximumWindowLength = Math.max(
        maximumWindowLength,
        segmentEnd - segmentStart + 1,
      );
    }
  }

  return maximumWindowLength === -1 ? -1 : nums.length - maximumWindowLength;
};
