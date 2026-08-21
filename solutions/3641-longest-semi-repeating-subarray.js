/**
 * Longest Semi-Repeating Subarray
 * Intuition: A semi-repeating window allows at most k values that appear more than once. Two pointers expand while tracking how many values currently have frequency ≥ 2.
 * Approach: 1. Map frequencies. 2. On entering a value, if freq becomes 2, increment repeats. 3. Shrink from the left while repeats > k. 4. Track max window length.
 * Dry Run: nums = [1,2,3,2,1], k = 1. Window [1,2,3,2] has one repeated (2), length 4.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var longestSubarray = function (nums, k) {
  const frequency = new Map();
  let answer = 0;
  let repeats = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    frequency.set(nums[right], (frequency.get(nums[right]) || 0) + 1);
    if (frequency.get(nums[right]) === 2) {
      repeats++;
    }

    while (repeats > k) {
      frequency.set(nums[left], frequency.get(nums[left]) - 1);
      if (frequency.get(nums[left]) === 1) {
        repeats--;
      }
      left++;
    }

    answer = Math.max(answer, right - left + 1);
  }

  return answer;
};
