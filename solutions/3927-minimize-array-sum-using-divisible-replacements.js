/**
 * Minimize Array Sum Using Divisible Replacements
 * Intuition: You may replace a multiple with a divisor that appears in the array. Each value can be reduced to the smallest array value that divides it (transitively via other values).
 * Approach: 1. Unique sorted values. 2. For each value, the best replacement is the global minimum that divides it among values that themselves can be reduced. 3. Process ascending: dp[v] = min(v, min dp[d] for d in array dividing v).
 * Dry Run: Input: nums = [3,6,2]. Output: 7.
 * Time Complexity: O(N sqrt A)
 * Space Complexity: O(N)
 */
var minimizeSum = function (nums) {
  const uniq = [...new Set(nums)].sort((a, b) => a - b);
  const best = new Map();
  for (const v of uniq) {
    let b = v;
    for (const d of uniq) {
      if (d >= v) break;
      if (v % d === 0) b = Math.min(b, best.get(d));
    }
    best.set(v, b);
  }
  let sum = 0;
  for (const x of nums) sum += best.get(x);
  return sum;
};
