/**
 * Minimum Swaps to Move Zeros to End
 * Intuition: We use two pointers i and j pointing to the beginning and end of the array respectively. Each time, we move i to the right until we find a 0, and move j to the left until we find a non-zero number. If i < j, we swap the two elements and increment the answer by 1. We repeat this process until i geq j.
 * Approach: 1. Follow Two Pointers. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [0,1,0,3,12]. Output: 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minimumSwaps = function (nums) {
  let ans = 0;
  const n = nums.length;

  let i = 0;
  let j = n - 1;

  while (i < j) {
    while (i < n && nums[i] !== 0) {
      ++i;
    }

    while (j > 0 && nums[j] === 0) {
      --j;
    }

    if (i >= j) {
      break;
    }

    ++ans;
    ++i;
    --j;
  }

  return ans;
};
