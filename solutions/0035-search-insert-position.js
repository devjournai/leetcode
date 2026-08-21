/**
 * Search Insert Position
 * Intuition: Standard binary search: if `target` is found return `midIndex`; otherwise `lowIndex` ends at the insertion point among sorted `nums`.
 * Approach: 1. `lowIndex=0`, `highIndex=n-1`. 2. While low ≤ high, compare `nums[midIndex]` to `target`. 3. Equal → return mid; smaller → `lowIndex = mid+1`; larger → `highIndex = mid-1`. 4. Return `lowIndex`.
 * Dry Run: nums = [1, 3, 5, 6], target = 5.
 *   - mid=1 (3<5) low=2; mid=2 (5===5) return 2.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var searchInsert = function (nums, target) {
  let lowIndex = 0;
  let highIndex = nums.length - 1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);

    if (nums[midIndex] === target) {
      return midIndex;
    } else if (nums[midIndex] < target) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }

  return lowIndex;
};
