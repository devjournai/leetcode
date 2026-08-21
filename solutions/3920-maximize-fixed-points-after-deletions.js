/**
 * Maximize Fixed Points After Deletions
 * Intuition: After deletions remaining items keep relative order and are reindexed from 0. A value v can sit at index i only if we keep at least i+1 items that can occupy 0..i, and v itself must equal some kept index.
 * Approach: 1. Count values v where v < n (only those can ever be fixed points). 2. Greedily, the maximum t such that at least t numbers among nums are < t (they can occupy indices 0..t-1 as themselves after dropping extras). Scan possible t.
 * Dry Run: Input: nums = [0,2,1]. Output: 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxFixedPoints = function (nums) {
  const n = nums.length;
  const vals = nums.filter((x) => x < n).sort((a, b) => a - b);
  let ans = 0;
  let j = 0;
  for (let t = 1; t <= n; t++) {
    while (j < vals.length && vals[j] < t) j++;
    if (j >= t) ans = t;
  }
  return ans;
};
