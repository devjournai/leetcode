/**
 * Smallest Unique Subarray
 * Intuition: The shortest subarray whose rolling hash appears only once is the smallest unique window. Binary search that length.
 * Approach: 1. Binary search length L. 2. Rolling hash all windows of length L. 3. Feasible if some hash occurs once (treat collisions by storing counts; values are used as hash).
 * Dry Run: Input nums; try mid lengths until the minimal unique window is found.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var smallestUniqueSubarray = function (nums) {
  const n = nums.length;
  const base = 19n;
  const modulo = 1000000007n;
  const check = (len) => {
    const powers = Array(n + 1).fill(1n);
    for (let i = 1; i <= n; i++) powers[i] = (powers[i - 1] * base) % modulo;
    let current = 0n;
    for (let i = 0; i < len; i++) {
      current = (current * base + BigInt(nums[i])) % modulo;
    }
    const freq = new Map();
    freq.set(current.toString(), 1);
    for (let i = 1; i <= n - len; i++) {
      current = current - ((powers[len - 1] * BigInt(nums[i - 1])) % modulo);
      if (current < 0n) current += modulo;
      current = (current * base + BigInt(nums[i + len - 1])) % modulo;
      const key = current.toString();
      freq.set(key, (freq.get(key) || 0) + 1);
    }
    for (const v of freq.values()) if (v === 1) return true;
    return false;
  };
  let lo = 1,
    hi = n,
    ans = n;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (check(mid)) {
      ans = mid;
      hi = mid - 1;
    } else lo = mid + 1;
  }
  return ans;
};
