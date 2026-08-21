/**
 * Minimum Operations To Reduce X To Zero
 * Intuition: Removing a prefix plus suffix summing to x is equivalent to keeping the longest subarray whose sum is total-x.
 * Approach: 1. Let target = sum(nums)-x; if target < 0 return -1; if 0 return n. 2. Sliding window for the longest subarray with sum == target. 3. Answer is n - that length, or -1 if never found.
 * Dry Run: nums=[1,1,4,2,3], x=5, total=11, target=6.
 *   - Window [1,1,4] length 3 → ops = 5-3 = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums, x) {
  const allElementsSum = nums.reduce(
    (initialSum, currentNum) => initialSum + currentNum,
    0
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
        segmentEnd - segmentStart + 1
      );
    }
  }

  return maximumWindowLength === -1 ? -1 : nums.length - maximumWindowLength;
};
