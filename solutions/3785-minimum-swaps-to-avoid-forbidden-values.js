/**
 * Minimum Swaps to Avoid Forbidden Values
 * Intuition: Indices already valid can stay. Conflicts must be swapped among themselves (or with free valid slots). If any value v appears more than n - (times v is forbidden) times, a derangement is impossible.
 * Approach: 1. If some value is over-constrained (count in nums plus count in forbidden > n), return -1. 2. Count conflict positions and the majority conflict value. 3. Answer is max(majority, ceil(conflicts/2)).
 * Dry Run: nums = [1,2,3], forbidden = [3,2,1]. One conflict at index 1; one swap suffices.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minSwaps = function (nums, forbidden) {
  const n = nums.length;
  const cntNums = new Map();
  const cntForb = new Map();
  for (let i = 0; i < n; i++) {
    cntNums.set(nums[i], (cntNums.get(nums[i]) || 0) + 1);
    cntForb.set(forbidden[i], (cntForb.get(forbidden[i]) || 0) + 1);
  }
  for (const [k, c] of cntNums) {
    if (c + (cntForb.get(k) || 0) > n) {
      return -1;
    }
  }
  const cnt3 = new Map();
  let cnt = 0;
  let cntM = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] !== forbidden[i]) {
      continue;
    }
    cnt++;
    const v = (cnt3.get(nums[i]) || 0) + 1;
    cnt3.set(nums[i], v);
    cntM = Math.max(cntM, v);
  }
  return Math.max(cntM, Math.floor((cnt + 1) / 2));
};
