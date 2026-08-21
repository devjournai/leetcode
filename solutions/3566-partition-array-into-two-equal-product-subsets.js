/**
 * Partition Array into Two Equal Product Subsets
 * Intuition: n is at most 12, so every assignment of elements to two subsets can be enumerated with bit masks. Both subset products must equal target.
 * Approach: 1. For each mask, multiply selected elements into x and the rest into y. 2. Abort a mask early if a product exceeds target. 3. Return true if any mask has x = y = target (both subsets non-empty is implied unless target is 1 and empty product is 1 — empty mask gives x=1, y=full product).
 * Dry Run: nums = [3, 1, 6, 8, 4], target = 24. Mask putting 3,8 vs 1,6,4: 24 and 24. True.
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(1)
 */
var checkEqualPartitions = function (nums, target) {
  const n = nums.length;

  for (let mask = 0; mask < 1 << n; mask++) {
    let x = 1;
    let y = 1;
    for (let j = 0; j < n; j++) {
      if ((mask >> j) & 1) {
        x *= nums[j];
      } else {
        y *= nums[j];
      }
      if (x > target || y > target) {
        break;
      }
    }
    if (x === target && y === target) {
      return true;
    }
  }

  return false;
};
