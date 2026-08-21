/**
 * Maximum Product Of Two Integers With No Common Bits
 * Intuition: Two numbers are compatible when their bits are disjoint. For each x, the best partner is the largest array value whose bits lie inside the complement of x. SOS DP precomputes the max value on every submask.
 * Approach: 1. nums[i] <= 10^6 so 20 bits suffice. 2. best[mask] starts as the largest nums equal to mask. 3. SOS: for each bit, best[mask] = max(best[mask], best[mask without that bit]). 4. For each x, partner = best[complement(x)]; update x * partner when the partner is nonzero.
 * Dry Run: nums = [1, 2, 3, 4, 5, 6, 7]. Complement of 3 (011) includes 4 (100). Product 12 is best.
 * Time Complexity: O(N + B * 2^B) with B = 20
 * Space Complexity: O(2^B)
 */
var maxProduct = function (nums) {
  const BIT_COUNT = 20;
  const MASK_COUNT = 1 << BIT_COUNT;
  const best = new Array(MASK_COUNT).fill(0);

  for (const value of nums) {
    best[value] = Math.max(best[value], value);
  }

  for (let bit = 0; bit < BIT_COUNT; bit++) {
    for (let mask = 0; mask < MASK_COUNT; mask++) {
      if ((mask & (1 << bit)) !== 0) {
        best[mask] = Math.max(best[mask], best[mask ^ (1 << bit)]);
      }
    }
  }

  const fullMask = MASK_COUNT - 1;
  let answer = 0;

  for (const value of nums) {
    const partner = best[fullMask ^ value];
    if (partner !== 0) {
      answer = Math.max(answer, value * partner);
    }
  }

  return answer;
};
