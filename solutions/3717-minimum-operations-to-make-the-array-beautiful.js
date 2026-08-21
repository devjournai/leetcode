/**
 * Minimum Operations To Make The Array Beautiful
 * Intuition: Only later elements may increase, and each must become a multiple of the previous. DP maps each reachable previous value to min ops; the next value jumps to multiples of that previous.
 * Approach: Start with {nums[0]: 0}. For each later x, for each previous p, try cur = ceil(x/p)*p, cur+p, ... while cur <= 100, recording ops cur-x.
 * Dry Run: [3, 7, 9] raises 7 to 9 (two increments) → [3, 9, 9].
 * Time Complexity: O(N * M^2) with M ≤ 100
 * Space Complexity: O(M)
 */
var minOperations = function (nums) {
  let minOpsByPrev = new Map([[nums[0], 0]]);
  for (let index = 1; index < nums.length; index++) {
    const value = nums[index];
    const nextOps = new Map();
    for (const [prev, ops] of minOpsByPrev) {
      let current = Math.ceil(value / prev) * prev;
      while (current <= 100) {
        const nextCost = ops + current - value;
        if (!nextOps.has(current) || nextOps.get(current) > nextCost) {
          nextOps.set(current, nextCost);
        }
        current += prev;
      }
    }
    minOpsByPrev = nextOps;
  }
  let answer = Infinity;
  for (const ops of minOpsByPrev.values()) {
    answer = Math.min(answer, ops);
  }
  return answer;
};
