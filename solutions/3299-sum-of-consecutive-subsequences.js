/**
 * Sum of Consecutive Subsequences
 * Intuition: Count subsequences whose adjacent values differ by +1 (increasing) or by -1 (decreasing). Singletons appear in both families, so add both sums and subtract the array sum. For a fixed direction, the contribution of `nums[i]` is `nums[i] * (ways to end a consecutive chain at i) * (ways to start a consecutive chain from i)`. Those way-counts are prefix/suffix DP with a frequency map of the previous/next value.
 * Approach:
 * 1. `getSequenceSum(direction)`: `prefixSubseqs[i]` = 1 + number of consecutive subsequences ending at the previous value `nums[i] - direction`. Maintain a map of ending counts while scanning left to right.
 * 2. Similarly `suffixSubseqs[i]` scanning right to left with next value `nums[i] + direction`.
 * 3. Sum `nums[i] * prefixSubseqs[i] * suffixSubseqs[i]` (mod 1e9+7). The +1 in each DP includes the singleton at i, so the product counts all chains through i.
 * 4. Answer = increasingSum + decreasingSum - arraySum (mod).
 * Dry Run: nums = [1, 2]
 *   - direction +1: prefix [1, 2] (2 can extend the chain ending at 1); suffix [2, 1]
 *     contrib 1*1*2 + 2*2*1 = 2+4 = 6 covering [1], [1,2] at index0 and [2], [1,2] at index1 — product double-counts full chains but each element's value is added once per subsequence that contains it, which is what we want for subsequence sums.
 *   - direction -1: only singletons, sum 3; minus array sum 3; plus increasing 6 -> 6. Subsequences [1],[2],[1,2] sums 1+2+3=6.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getSum = function (nums) {
  const MOD = 1000000007;
  const n = nums.length;

  const getSequenceSum = (direction) => {
    let sequenceSum = 0;
    const prefixCount = new Map();
    const suffixCount = new Map();
    const prefixSubseqs = Array(n).fill(0);
    const suffixSubseqs = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      const prevNum = nums[i] - direction;
      const subseqsCount = (prefixCount.get(prevNum) || 0) + 1;
      prefixSubseqs[i] = subseqsCount;
      prefixCount.set(
        nums[i],
        ((prefixCount.get(nums[i]) || 0) + subseqsCount) % MOD,
      );
    }

    for (let i = n - 1; i >= 0; i--) {
      const nextNum = nums[i] + direction;
      const subseqsCount = (suffixCount.get(nextNum) || 0) + 1;
      suffixSubseqs[i] = subseqsCount;
      suffixCount.set(
        nums[i],
        ((suffixCount.get(nums[i]) || 0) + subseqsCount) % MOD,
      );
    }

    const MODL = BigInt(MOD);
    for (let i = 0; i < n; i++) {
      sequenceSum += Number(
        (((BigInt(nums[i]) * BigInt(prefixSubseqs[i])) % MODL) *
          BigInt(suffixSubseqs[i])) %
          MODL,
      );
      sequenceSum %= MOD;
    }

    return sequenceSum;
  };

  let arraySum = 0;
  for (const num of nums) arraySum = (arraySum + num) % MOD;

  return (
    (((getSequenceSum(1) + getSequenceSum(-1) - arraySum) % MOD) + MOD) % MOD
  );
};
