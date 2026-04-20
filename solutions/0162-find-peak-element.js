/**
 * Find Peak Element
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
*/ 
var findPeakElement = function(nums) {
  let startIndex = 0;
  let endIndex = nums.length - 1;

  while (startIndex < endIndex) {
    let midPoint = Math.floor((startIndex + endIndex) / 2);
    if (nums[midPoint] > nums[midPoint + 1]) {
      endIndex = midPoint;
    } else {
      startIndex = midPoint + 1;
    }
  }

  return startIndex;
};