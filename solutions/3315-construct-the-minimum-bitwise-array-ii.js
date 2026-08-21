/**
 * Construct the Minimum Bitwise Array II
 * Intuition: Same as I: x | (x+1) fills a trailing-ones block, so candidates come from choosing which run of 1-bits is produced.
 * Approach: For each target, try k=0..29; if the lowest k+1 bits are all 1, candidate x = (target & ~mask) | ((1<<k)-1). Keep the minimum candidate, or -1 if none exist.
 * Dry Run: target=3, k=1 mask=3, x=(0)|1=1; answer 1. Even targets never match a mask and yield -1.
 * Time Complexity: O(N * log(max(nums[i])))
 * Space Complexity: O(N)
 */
var minBitwiseArray = function (nums) {
  const ans = [];

  for (const target of nums) {
    let minX = Infinity;
    for (let k = 0; k < 30; k++) {
      const mask = (1 << (k + 1)) - 1;
      if ((target & mask) === mask) {
        const currentX = (target & ~mask) | ((1 << k) - 1);
        if (currentX < minX) {
          minX = currentX;
        }
      }
    }
    if (minX === Infinity) {
      ans.push(-1);
    } else {
      ans.push(minX);
    }
  }

  return ans;
};
