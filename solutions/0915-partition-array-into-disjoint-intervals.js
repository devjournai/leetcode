/**
 * Partition Array Into Disjoint Intervals
 * Intuition: The left part must end as soon as a value smaller than the left’s max appears; after that, the left max becomes the max of everything seen so far so later values stay ≥ that left max.
 * Approach: 1. `currentLeftMaximum` and `overallMaximumEncountered` start at nums[0]; boundary index 0. 2. For each later value, if it is < left max, extend the partition to this index and set left max to the overall max so far. 3. Always update overall max. 4. Return boundary+1.
 * Dry Run: [5,0,3,8,6]. Start leftMax=5. 0<5 → boundary=1, leftMax=5. 3<5 → boundary=2, leftMax=5. 8,6 ok. Length 3.
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
      nums[arrayIterator]
    );
  }

  return currentPartitionBoundaryIndex + 1;
};
