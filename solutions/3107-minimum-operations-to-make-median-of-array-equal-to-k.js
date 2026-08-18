/**
 * Minimum Operations To Make Median Of Array Equal To K
 * Intuition: After sorting, the median is nums[mid]. If it is already k, answer 0. If larger, decrease all values from mid leftward that exceed k. If smaller, increase values from mid rightward that are below k.
 * Approach: 1. Sort nums. 2. If median > k, sum (nums[i]-k) for i in [0, mid] where nums[i] > k. 3. If median < k, sum (k-nums[i]) for i in [mid, n) where nums[i] < k.
 * Dry Run:
 *   nums = [2,5,6,8,5], k = 4, sorted [2,5,5,6,8], median 5, need to lower left half including median: (5-4)+(5-4)=2? Only from mid left: indices 0..2 values 2,5,5 -> (5-4)+(5-4)=2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var minOperationsToMakeMedianK = function (nums, k) {
  nums.sort((a, b) => a - b);
  const medianIndex = Math.floor(nums.length / 2);
  let operationCount = 0;
  if (nums[medianIndex] > k) {
    for (let index = 0; index <= medianIndex; index++) {
      if (nums[index] > k) {
        operationCount += nums[index] - k;
      }
    }
  } else {
    for (let index = medianIndex; index < nums.length; index++) {
      if (nums[index] < k) {
        operationCount += k - nums[index];
      }
    }
  }
  return operationCount;
};
