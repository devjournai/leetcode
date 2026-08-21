/**
 * Reach End of Array With Max Score
 * Intuition: A jump from i to j scores (j - i) * nums[i]. You should keep using the current value until a strictly larger value appears, because every unit of distance is multiplied by the jump's starting value. That means each index (except the last as a start) contributes the maximum value seen so far to its left.
 * Approach:
 * 1. Track `mx`, the best jump value available so far, initially 0.
 * 2. Scan left to right. Before updating `mx` with `nums[i]`, add `mx` to the answer. That charges the step i-1 -> i to the previous maximum.
 * 3. Then set `mx = max(mx, nums[i])`.
 * 4. The last addition uses the max of `nums[0..n-2]`, which is the value of the last jump into the end. Never jump from the last index.
 * Dry Run: nums = [1, 3, 1, 5]
 *   - i=0, num=1: ans += 0 -> 0; mx = 1
 *   - i=1, num=3: ans += 1 -> 1; mx = 3
 *   - i=2, num=1: ans += 3 -> 4; mx = 3
 *   - i=3, num=5: ans += 3 -> 7; mx = 5
 *   - Path 0 -> 1 -> 3 scores 1*1 + 2*3 = 7.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findMaximumScore = function (nums) {
  let ans = 0;
  let mx = 0;

  for (const num of nums) {
    ans += mx;
    mx = Math.max(mx, num);
  }

  return ans;
};
