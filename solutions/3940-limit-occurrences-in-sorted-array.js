/**
 * Limit Occurrences in Sorted Array
 * Intuition: We define two pointers, l and r, where l is the write position and r is the current read position. We also use a counter cnt to record how many  *  the current value has appeared. Initially, both l and cnt are set to 1.
 * Approach: We define two pointers, l and r, where l is the write position and r is the current read position. We also use a counter cnt to record how many  *  the current value has appeared. Initially, both l and cnt are set to 1. Then we traverse the array starting from r = 1: 1. If nums[r] ne nums[r - 1], we meet a new value, so reset cnt to 1. 2. If nums[r] = nums[r - 1], it is a duplicate, so increment cnt by 1.
 * Dry Run: Input: nums = [1,1,1,2,2,3], k = 2. Output: [1,1,2,2,3].
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var limitOccurrences = function (nums, k) {
  const n = nums.length;
  let cnt = 1;
  let l = 1;

  for (let r = 1; r < n; r++) {
    if (nums[r] !== nums[r - 1]) {
      cnt = 1;
    } else {
      cnt++;
    }

    if (cnt <= k) {
      nums[l] = nums[r];
      l++;
    }
  }

  return nums.slice(0, l);
};
