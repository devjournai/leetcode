/**
 * Permutation Difference Between Two Strings
 * Intuition: The permutation difference is the sum of absolute index gaps of each letter between s and t.
 * Approach: 1. Record each character's index in s. 2. Scan t and add |indexInS - indexInT|. 3. Return the sum.
 * Dry Run:
 *   s = "abc", t = "bac"
 *   a: |0-1|=1, b: |1-0|=1, c: |2-2|=0, total = 2
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findPermutationDifference = function (s, t) {
  const sourceIndexByChar = new Array(26);
  for (let charIndex = 0; charIndex < s.length; charIndex++) {
    sourceIndexByChar[s.charCodeAt(charIndex) - 97] = charIndex;
  }
  let permutationDifference = 0;
  for (let charIndex = 0; charIndex < t.length; charIndex++) {
    permutationDifference += Math.abs(
      sourceIndexByChar[t.charCodeAt(charIndex) - 97] - charIndex,
    );
  }
  return permutationDifference;
};
