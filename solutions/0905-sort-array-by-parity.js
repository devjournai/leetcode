/**
 * Sort Array By Parity
 * Intuition: Two pointers: skip evens on the left and odds on the right; swap when left is odd and right is even so evens pack to the front.
 * Approach: 1. `leftPointer=0`, `rightPointer=n-1`. 2. While left < right: if nums[left] even, left++. Else if nums[right] odd, right--. Else swap and move both. 3. Return `nums`.
 * Dry Run: nums = [3, 1, 2, 4].
 *   - 3 odd, 4 even → swap [4,1,2,3]; left at 1 (odd), right at 2 (even) → [4,2,1,3]. Left meets right. Return that.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var sortArrayByParity = function (nums) {
  let leftPointer = 0;
  let rightPointer = nums.length - 1;

  while (leftPointer < rightPointer) {
    if (nums[leftPointer] % 2 === 0) {
      leftPointer++;
    } else {
      if (nums[rightPointer] % 2 !== 0) {
        rightPointer--;
      } else {
        let temporaryStore = nums[leftPointer];
        nums[leftPointer] = nums[rightPointer];
        nums[rightPointer] = temporaryStore;
        leftPointer++;
        rightPointer--;
      }
    }
  }
  return nums;
};
