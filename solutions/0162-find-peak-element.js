/**
 * Find Peak Element
 * Intuition: A peak exists in any array if neighbors of the ends are treated as -∞. Binary search moves toward the larger neighbor of mid, which must contain a peak.
 * Approach: 1. Set `startIndex = 0` and `endIndex = nums.length - 1`. 2. While `startIndex < endIndex`, `midPoint = floor((start+end)/2)`. 3. If `nums[midPoint] > nums[midPoint + 1]`, a peak is at or left of mid, so `endIndex = midPoint`; else `startIndex = midPoint + 1`. 4. Return `startIndex`.
 * Dry Run: nums = [1,2,3,1]
 * mid=1 (2 < 3) → start=2
 * start=2, end=3, mid=2 (3 > 1) → end=2
 * start==end → index 2 (value 3)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var findPeakElement = function (nums) {
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
