/**
 * Number Of Valid Subarrays
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var validSubarrays = function (nums) {
  const lengthOfNums = nums.length;
  const indexTracker = [];
  let subarraysTotal = 0;

  let currentPosition = 0;
  while (currentPosition < lengthOfNums) {
    while (
      indexTracker.length > 0 &&
      nums[indexTracker[indexTracker.length - 1]] > nums[currentPosition]
    ) {
      const poppedPosition = indexTracker.pop();
      subarraysTotal += currentPosition - poppedPosition;
    }
    indexTracker.push(currentPosition);
    currentPosition++;
  }

  while (indexTracker.length > 0) {
    const remainingIndex = indexTracker.pop();
    subarraysTotal += lengthOfNums - remainingIndex;
  }

  return subarraysTotal;
};
