/**
 * Peaks in Array II
 * Intuition: A peak subarray of length>=3 contains some peak index k. Count subarrays in [L,R] that contain at least one peak. If peaks are P, count subarrays covering at least one p in (L,R).
 * Approach: 1. Track peak indices (strict local max). 2. Type 2 updates rebuild peaks locally. 3. Type 1: for range [L,R], count subarrays with i>=L,j<=R,j-i+1>=3 that include some peak k in (i,j). Equivalent to all subarrays of [L,R] length>=3 minus those with no internal peak.
 * Dry Run: Input: nums=[1,3,2,4], queries. Output: [2,0].
 * Time Complexity: O(Q N)
 * Space Complexity: O(N)
 */
var peaksInArray = function (nums, queries) {
  const n = nums.length;
  const isPeak = (k) =>
    k > 0 && k < n - 1 && nums[k] > nums[k - 1] && nums[k] > nums[k + 1];
  const ans = [];
  for (const q of queries) {
    if (q[0] === 2) {
      nums[q[1]] = q[2];
    } else {
      const l = q[1],
        r = q[2];
      let cnt = 0;
      for (let i = l; i <= r; i++) {
        for (let j = i + 2; j <= r; j++) {
          let ok = false;
          for (let k = i + 1; k < j; k++)
            if (isPeak(k)) {
              ok = true;
              break;
            }
          if (ok) cnt++;
        }
      }
      ans.push(cnt);
    }
  }
  return ans;
};
