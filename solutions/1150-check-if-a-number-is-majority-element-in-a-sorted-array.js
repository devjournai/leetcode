/**
 * Check If A Number Is Majority Element In A Sorted Array
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
