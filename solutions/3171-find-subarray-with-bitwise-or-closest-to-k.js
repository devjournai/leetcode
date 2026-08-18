/**
 * Find Subarray With Bitwise OR Closest to K
 * Intuition: Subarray OR is monotonic: extending a subarray can only turn bits on. For subarrays ending at each index, the set of distinct OR values has size at most the bit width (about 32), so we can track them all.
 * Approach: 1. Keep `prev`, the set of OR values of subarrays ending at the previous index. 2. For each `num`, form `next = {num} union {val | num for val in prev}`. 3. Update the answer with `min(|k - val|)` over `next`. 4. Set `prev = next`. Similar to 1521.
 * Dry Run: nums = [1,2,4], k = 5
 *   num=1: dp={1}, closest |5-1|=4
 *   num=2: dp={2, 1|2=3}, closest min(4, |5-2|=3, |5-3|=2)=2
 *   num=4: dp={4, 2|4=6, 3|4=7}, closest min(2, |5-4|=1, |5-6|=1, |5-7|=2)=1
 * Time Complexity: O(n log max(nums))
 * Space Complexity: O(n)
 */
var minimumDifference = function (nums, k) {
  let ans = Infinity;
  let dp = new Set();

  for (const num of nums) {
    const next = new Set([num]);
    for (const val of dp) {
      next.add(val | num);
    }
    for (const val of next) {
      ans = Math.min(ans, Math.abs(k - val));
    }
    dp = next;
  }

  return ans;
};
