/**
 * Single Element In A Sorted Array
 * Intuition: Pairs occupy even-odd index pairs until the unique element. Binary search: if mid sits in a matching pair on the even-odd pattern, the unique value is to the right; otherwise to the left (including mid).
 * Approach: 1. While `start < end`, mid = floor midpoint. 2. If mid even: equal to mid+1 → search mid+2..end, else end=mid. 3. If mid odd: equal to mid-1 → search mid+1..end, else end=mid. 4. Return `nums[start]`.
 * Dry Run: nums = [1,1,2,3,3].
 *   - mid=2 (even), nums[2]=2 ≠ nums[3]=3 → end=2. Loop ends. Return 2.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var singleNonDuplicate = function (nums) {
  let startSearchIndex = 0;
  let endSearchIndex = nums.length - 1;

  while (startSearchIndex < endSearchIndex) {
    let midPoint =
      startSearchIndex + Math.floor((endSearchIndex - startSearchIndex) / 2);

    if (midPoint % 2 === 0) {
      if (nums[midPoint] === nums[midPoint + 1]) {
        startSearchIndex = midPoint + 2;
      } else {
        endSearchIndex = midPoint;
      }
    } else {
      if (nums[midPoint] === nums[midPoint - 1]) {
        startSearchIndex = midPoint + 1;
      } else {
        endSearchIndex = midPoint;
      }
    }
  }

  return nums[startSearchIndex];
};
