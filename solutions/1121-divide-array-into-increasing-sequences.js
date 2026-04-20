/**
 * Divide Array Into Increasing Sequences
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canDivideIntoSubsequences = function (nums, k) {
  let maximumElementFrequency = 1;
  let consecutiveElementCount = 1;
  let arrayLength = nums.length;

  for (let arrayIndex = 1; arrayIndex < arrayLength; arrayIndex++) {
    if (nums[arrayIndex] === nums[arrayIndex - 1]) {
      consecutiveElementCount++;
    } else {
      consecutiveElementCount = 1;
    }
    maximumElementFrequency = Math.max(
      maximumElementFrequency,
      consecutiveElementCount,
    );
  }

  return k * maximumElementFrequency <= arrayLength;
};
