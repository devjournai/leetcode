/**
 * Adjacent Increasing Subarrays Detection II
 * Intuition: Same run-length idea as part I, but maximize k: from a run of length L we can take k = floor(L/2), and from two adjacent runs we can take k = min(prev, current).
 * Approach: Scan runs. After each step, ans = max(ans, increasing/2, min(prevIncreasing, increasing)).
 * Dry Run: nums = [1,2,3,4,4,5,6,7]. First run length 4 (k up to 2 from splitting it). After the plateau, second run grows to 4; min(4, 4) yields k = 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var maxIncreasingSubarrays = function (nums) {
  let answer = 0;
  let increasing = 1;
  let prevIncreasing = 0;

  for (let index = 1; index < nums.length; index++) {
    if (nums[index] > nums[index - 1]) {
      increasing++;
    } else {
      prevIncreasing = increasing;
      increasing = 1;
    }
    answer = Math.max(answer, Math.floor(increasing / 2));
    answer = Math.max(answer, Math.min(prevIncreasing, increasing));
  }

  return answer;
};
