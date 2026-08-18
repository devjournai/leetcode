/**
 * Find the Minimum Cost Array Permutation
 * Intuition: The score is cyclic, so we can fix perm[0] = 0 and search the rest. DP over (last value, bitmask of used indices) records the cheapest next index, then the permutation is reconstructed from those choices.
 * Approach: 1. Memoize getScore(last, mask): if all indices are used, return |last - nums[0]|. 2. Try every unused i, cost = |last - nums[i]| + getScore(i, mask | 1 << i), keep the best i in bestPick. 3. Reconstruct by walking bestPick from last = 0, mask = 1.
 * Dry Run: nums = [1, 0, 2]
 * - Fix perm[0] = 0. Remaining permutations [0,1,2] score |0-0|+|1-2|+|2-1| = 2 and [0,2,1] score |0-2|+|2-0|+|1-1| = 4
 * - Best permutation [0, 1, 2]
 * Time Complexity: O(2^n * n^2)
 * Space Complexity: O(2^n * n)
 */
var findPermutation = function (nums) {
  const n = nums.length;
  const mem = Array.from({ length: n }, () => new Array(1 << n).fill(0));
  const bestPick = Array.from({ length: n }, () => new Array(1 << n).fill(0));

  const getScore = (last, mask) => {
    if (mask.toString(2).split("1").length - 1 === n) {
      return Math.abs(last - nums[0]);
    }
    if (mem[last][mask] > 0) {
      return mem[last][mask];
    }

    let minScore = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < n; i++) {
      if ((mask >> i) & 1) {
        continue;
      }
      const nextMinScore =
        Math.abs(last - nums[i]) + getScore(i, mask | (1 << i));
      if (nextMinScore < minScore) {
        minScore = nextMinScore;
        bestPick[last][mask] = i;
      }
    }

    mem[last][mask] = minScore;
    return minScore;
  };

  getScore(0, 1);

  const answer = [];
  let last = 0;
  let mask = 1;
  for (let i = 0; i < n; i++) {
    answer.push(last);
    last = bestPick[last][mask];
    mask |= 1 << last;
  }
  return answer;
};
