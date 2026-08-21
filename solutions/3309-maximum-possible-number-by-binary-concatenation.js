/**
 * Maximum Possible Number by Binary Concatenation
 * Intuition: Like largest-number concatenation, the best order is the pairwise comparison of binary concatenations, not numeric order.
 * Approach: 1. `concat(a, b)` shifts a left by bitLength(b) and adds b. 2. Sort so concat(a,b) > concat(b,a). 3. Fold concat over the sorted values.
 * Dry Run: nums = [1, 2, 3] binaries 1, 10, 11
 *   - Best order 3,1,2 → 11|1|10 = 11110 = 30
 * Time Complexity: O(1) (n is 3)
 * Space Complexity: O(1)
 */
var maxGoodNumber = function (nums) {
  const concat = (a, b) => {
    const bitLength = 32 - Math.clz32(b);
    return (a << bitLength) + b;
  };

  nums.sort((a, b) => concat(b, a) - concat(a, b));

  let ans = 0;
  for (const num of nums) {
    ans = concat(ans, num);
  }
  return ans;
};
