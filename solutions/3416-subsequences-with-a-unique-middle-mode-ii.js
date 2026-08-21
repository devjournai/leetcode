/**
 * Subsequences with a Unique Middle Mode II
 * Intuition: Same combinatorics as 3395 but n is large, so we cannot loop other values per middle. Maintain aggregate prefix/suffix sums pss, spp, pp, ss, ps and subtract the unique-mode violations in O(1) per index.
 * Approach: 1. Suffix map s starts as full frequencies; prefix map p is empty. 2. For each middle a, update running squares after decrementing s[a], add C(left,2)*C(right,2), subtract freq-1-of-a and the closed-form b!=a terms, then increment p[a]. 3. All arithmetic mod 1e9+7.
 * Dry Run: nums = [1,1,1,1,1]. One length-5 subsequence, unique mode 1. Answer 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var subsequencesWithMiddleMode = function (nums) {
  const MOD = 1000000007n;
  const nC2 = (count) => {
    return ((count * (count - 1n)) / 2n) % MOD;
  };

  let answer = 0n;
  const prefixCount = new Map();
  const suffixCount = new Map();

  for (const value of nums) {
    suffixCount.set(value, (suffixCount.get(value) || 0n) + 1n);
  }

  let prefixSuffixSuffix = 0n;
  let suffixPrefixPrefix = 0n;
  let prefixPrefix = 0n;
  let suffixSuffix = 0n;
  let prefixSuffix = 0n;

  for (const frequency of suffixCount.values()) {
    suffixSuffix = (suffixSuffix + frequency * frequency) % MOD;
  }

  for (let index = 0; index < nums.length; index++) {
    const middleValue = nums[index];
    let suffixOfA = suffixCount.get(middleValue);
    const prefixOfA = prefixCount.get(middleValue) || 0n;

    prefixSuffixSuffix =
      (prefixSuffixSuffix +
        prefixOfA *
          (-suffixOfA * suffixOfA + (suffixOfA - 1n) * (suffixOfA - 1n))) %
      MOD;
    suffixPrefixPrefix = (suffixPrefixPrefix - prefixOfA * prefixOfA) % MOD;
    suffixSuffix =
      (suffixSuffix -
        suffixOfA * suffixOfA +
        (suffixOfA - 1n) * (suffixOfA - 1n)) %
      MOD;
    prefixSuffix = (prefixSuffix - prefixOfA) % MOD;

    suffixOfA -= 1n;
    suffixCount.set(middleValue, suffixOfA);

    const leftCount = BigInt(index);
    const rightCount = BigInt(nums.length - index - 1);

    answer = (answer + nC2(leftCount) * nC2(rightCount)) % MOD;
    answer =
      (answer - nC2(leftCount - prefixOfA) * nC2(rightCount - suffixOfA)) % MOD;

    const prefixSuffixSuffixOthers =
      (prefixSuffixSuffix - prefixOfA * suffixOfA * suffixOfA) % MOD;
    const suffixPrefixPrefixOthers =
      (suffixPrefixPrefix - suffixOfA * prefixOfA * prefixOfA) % MOD;
    const prefixPrefixOthers = (prefixPrefix - prefixOfA * prefixOfA) % MOD;
    const suffixSuffixOthers = (suffixSuffix - suffixOfA * suffixOfA) % MOD;
    const prefixSuffixOthers = (prefixSuffix - prefixOfA * suffixOfA) % MOD;
    const otherPrefixCount = leftCount - prefixOfA;
    const otherSuffixCount = rightCount - suffixOfA;

    let subtract = 0n;
    subtract =
      (subtract + prefixSuffixOthers * (prefixOfA * (rightCount - suffixOfA))) %
      MOD;
    subtract = (subtract + prefixSuffixSuffixOthers * -prefixOfA) % MOD;
    subtract =
      (subtract + prefixSuffixOthers * (suffixOfA * (leftCount - prefixOfA))) %
      MOD;
    subtract = (subtract + suffixPrefixPrefixOthers * -suffixOfA) % MOD;
    subtract =
      (subtract +
        ((prefixPrefixOthers - otherPrefixCount) *
          suffixOfA *
          (rightCount - suffixOfA)) /
          2n) %
      MOD;
    subtract =
      (subtract +
        ((suffixSuffixOthers - otherSuffixCount) *
          prefixOfA *
          (leftCount - prefixOfA)) /
          2n) %
      MOD;
    answer = (answer - subtract + MOD) % MOD;

    prefixSuffixSuffix = (prefixSuffixSuffix + suffixOfA * suffixOfA) % MOD;
    suffixPrefixPrefix =
      (suffixPrefixPrefix +
        suffixOfA *
          (-prefixOfA * prefixOfA + (prefixOfA + 1n) * (prefixOfA + 1n))) %
      MOD;
    prefixPrefix =
      (prefixPrefix -
        prefixOfA * prefixOfA +
        (prefixOfA + 1n) * (prefixOfA + 1n)) %
      MOD;
    prefixSuffix = (prefixSuffix + suffixOfA) % MOD;
    prefixCount.set(middleValue, prefixOfA + 1n);
  }

  return Number((answer + MOD) % MOD);
};
