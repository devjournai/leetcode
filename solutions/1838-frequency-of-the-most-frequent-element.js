/**
 * Frequency Of The Most Frequent Element
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var maxFrequency = function (nums, k) {
  nums.sort((valueA, valueB) => valueA - valueB);

  let maximumFrequency = 0;
  let windowAccumulator = 0;
  let startPointer = 0;

  for (let endPointer = 0; endPointer < nums.length; endPointer++) {
    windowAccumulator += nums[endPointer];

    while (
      windowAccumulator + k <
      nums[endPointer] * (endPointer - startPointer + 1)
    ) {
      windowAccumulator -= nums[startPointer];
      startPointer++;
    }

    maximumFrequency = Math.max(
      maximumFrequency,
      endPointer - startPointer + 1,
    );
  }

  return maximumFrequency;
};
