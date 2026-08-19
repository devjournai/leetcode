/**
 * Find the Maximum Length of Valid Subsequence II
 * Intuition: Adjacent sums must share the same remainder modulo k, which again yields a repeating xyxy residue pattern. Generalize the 3201 parity DP to residues 0..k-1.
 * Approach: 1. Keep a kxk dp where dp[lastResidue][desiredResidue] is the longest valid subsequence ending with lastResidue that wants desiredResidue next. 2. For each number x, for every partner residue y, extend dp[y][x%k] into dp[x%k][y]. 3. Return the maximum dp value.
 * Dry Run:
 *   nums = [1, 2, 3, 4, 5], k = 2
 *   Same as problem 3201 with residues mod 2; the alternating pattern grows to length 5.
 * Time Complexity: O(k^2 + n*k)
 * Space Complexity: O(k^2)
 */
var maximumLength = function (nums, k) {
  const lengthByLastAndDesiredResidue = Array.from({ length: k }, () =>
    Array(k).fill(0),
  );

  for (const currentValue of nums) {
    const currentResidue = currentValue % k;
    for (
      let patternPartnerResidue = 0;
      patternPartnerResidue < k;
      patternPartnerResidue++
    ) {
      lengthByLastAndDesiredResidue[currentResidue][patternPartnerResidue] =
        lengthByLastAndDesiredResidue[patternPartnerResidue][currentResidue] +
        1;
    }
  }

  let maximumLengthValue = 0;
  for (const row of lengthByLastAndDesiredResidue) {
    for (const lengthValue of row) {
      maximumLengthValue = Math.max(maximumLengthValue, lengthValue);
    }
  }
  return maximumLengthValue;
};
