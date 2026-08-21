/**
 * Global And Local Inversions
 * Intuition: Local inversions are adjacent swaps. All global inversions are local iff no value is more than 1 away from its index (nothing jumped farther than a neighbor swap).
 * Approach: 1. For each `elementIndex`, if `Math.abs(nums[i] - i) > 1`, return false. 2. Otherwise return true.
 * Dry Run: nums = [1,0,2].
 *   - |1-0|=1, |0-1|=1, |2-2|=0 — all ≤ 1. Return true.
 *   - Contrast [1,2,0]: |0-2|=2 > 1 → false.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isIdealPermutation = function (nums) {
  const inputLength = nums.length;

  for (let elementIndex = 0; elementIndex < inputLength; elementIndex++) {
    const elementValue = nums[elementIndex];
    const absoluteDisplacement = Math.abs(elementValue - elementIndex);

    if (absoluteDisplacement > 1) {
      return false;
    }
  }

  return true;
};
