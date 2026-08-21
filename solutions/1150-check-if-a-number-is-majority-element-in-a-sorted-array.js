/**
 * Check If A Number Is Majority Element In A Sorted Array
 * Intuition: In a sorted array the target occupies a contiguous range. Majority means that range is longer than n/2, found via binary search for first and last index.
 * Approach: 1. Lower-bound search for the first index >= target. 2. If missing, false. 3. Upper-bound search for last index. 4. Return (last-first+1) > n/2.
 * Dry Run: nums = [2,4,5,5,5,5,5,6,6], target = 5.
 *   - First 5 at index 2, last at 6, count 5. n=9, 5 > 4.5. True.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var isMajorityElement = function (nums, target) {
  const arrayLength = nums.length;

  const findTargetFirst = (arrayData, searchValue) => {
    let startPointer = 0;
    let endPointer = arrayData.length;
    while (startPointer < endPointer) {
      const midPoint = Math.floor((startPointer + endPointer) / 2);
      const currentValue = arrayData[midPoint];
      if (currentValue < searchValue) {
        startPointer = midPoint + 1;
      } else {
        endPointer = midPoint;
      }
    }
    return startPointer;
  };

  const findTargetLast = (arrayData, searchValue) => {
    let searchLeft = 0;
    let searchRight = arrayData.length;
    while (searchLeft < searchRight) {
      const centerIndex = Math.floor((searchLeft + searchRight) / 2);
      const elementValue = arrayData[centerIndex];
      if (elementValue <= searchValue) {
        searchLeft = centerIndex + 1;
      } else {
        searchRight = centerIndex;
      }
    }
    return searchLeft - 1;
  };

  const firstOccurrence = findTargetFirst(nums, target);

  if (firstOccurrence >= arrayLength || nums[firstOccurrence] !== target) {
    return false;
  }

  const lastOccurrence = findTargetLast(nums, target);

  const totalCount = lastOccurrence - firstOccurrence + 1;

  return totalCount > arrayLength / 2;
};
