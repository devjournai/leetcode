/**
 * Count Distinct Subarrays Divisible by K in Sorted Array
 * Intuition: Implement Count Distinct Subarrays Divisible by K in Sorted Array following the editorial simulation.
 * Approach: Implement Count Distinct Subarrays Divisible by K in Sorted Array following the editorial simulation.
 * Dry Run: Input nums = [1,2,3], k = 3. Output 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var numGoodSubarrays = function (nums, k) {
  let ans = 0;
  let s = 0;
  const cnt = new Map();
  cnt.set(0, 1);

  for (const x of nums) {
    s = (s + x) % k;
    ans += cnt.get(s) ?? 0;
    cnt.set(s, (cnt.get(s) ?? 0) + 1);
  }

  const n = nums.length;
  for (let i = 0; i < n;) {
    let j = i + 1;
    while (j < n && nums[j] === nums[i]) ++j;
    const m = j - i;
    for (let h = 1; h <= m; ++h) {
      if ((nums[i] * h) % k === 0) {
        ans -= m - h;
      }
    }
    i = j;
  }

  return ans;
};
