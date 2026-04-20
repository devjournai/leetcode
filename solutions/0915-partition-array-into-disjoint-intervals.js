/**
 * Partition Array Into Disjoint Intervals
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var partitionDisjoint = function (nums) {
  let currentLeftMaximum = nums[0];
  let overallMaximumEncountered = nums[0];
  let currentPartitionBoundaryIndex = 0;

  for (let arrayIterator = 1; arrayIterator < nums.length; arrayIterator++) {
    if (nums[arrayIterator] < currentLeftMaximum) {
      currentPartitionBoundaryIndex = arrayIterator;
      currentLeftMaximum = overallMaximumEncountered;
    }
    overallMaximumEncountered = Math.max(
      overallMaximumEncountered,
      nums[arrayIterator],
    );
  }

  return currentPartitionBoundaryIndex + 1;
};
