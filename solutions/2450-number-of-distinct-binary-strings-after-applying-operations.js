/**
 * Number Of Distinct Binary Strings After Applying Operations
 * Intuition: The problem asks for the number of distinct binary strings obtainable by applying a specific operation any number of times. An operation involves choosing a substring of size `k` and flipping all its characters. Let `N` be the length of the string `s`. There are `N - k + 1` possible starting positions for a substring of size `k`, ranging from index `0` to `N - k`. Let's denote these `N - k + 1` potential operations as `op_0, op_1, ..., op_{N-k}`. For each `op_j`, we have a binary choice: either apply it or not. The key insight is that each unique combination of these `N - k + 1` independent binary choices will result in a unique final string. This can be proven by contradiction: assume two different sequences of choices `(x_0, ..., x_{N-k})` and `(x'_0, ..., x'_{N-k})` lead to the same final string. If the resulting strings are identical, then the XOR sum of operations applied at each position `i` must be the same. This implies that the XOR difference between the two choice sequences (i.e., `diff_j = x_j XOR x'_j`) must result in a net effect of zero on every character. It can be shown through induction on `j` that `diff_j` must be `0` for all `j`, meaning `x_j = x'_j` for all `j`. Therefore, there are `2` to the power of `(N - k + 1)` distinct strings.
 * Approach: 1. Calculate the total number of distinct available operations. This is `stringLength - k + 1`. Let's call this `numChoices`. 2. If `numChoices` is less than or equal to 0 (which occurs if `k` is greater than `stringLength`, implying no operation can be applied), then only the original string can be obtained, so the answer is `1`. 3. Otherwise, the number of distinct strings is `2` raised to the power of `numChoices`. 4. Compute this value modulo `10^9 + 7` using iterative multiplication, applying the modulo at each step to prevent overflow.
 * Dry Run: s = "0101", k = 2
 *   stringLength = 4, k = 2.
 *   moduloConstant = 1000000007.
 *   numberOfOperations = stringLength - k + 1 = 4 - 2 + 1 = 3.
 *   Since numberOfOperations (3) is greater than 0, we proceed with exponentiation.
 *   finalCount = 1.
 *   loopIndex = 0.
 *   While loop (loopIndex < numberOfOperations):
 *     - loopIndex = 0: `0 < 3` is true. `finalCount = (1 * 2) % 1000000007 = 2`. `loopIndex` becomes 1.
 *     - loopIndex = 1: `1 < 3` is true. `finalCount = (2 * 2) % 1000000007 = 4`. `loopIndex` becomes 2.
 *     - loopIndex = 2: `2 < 3` is true. `finalCount = (4 * 2) % 1000000007 = 8`. `loopIndex` becomes 3.
 *     - loopIndex = 3: `3 < 3` is false. Loop terminates.
 *   The function returns `finalCount`, which is 8.
 *   This is correct, as for `s="0101", k=2`, the 3 possible operations allow for `2^3 = 8` distinct strings.
 * Time Complexity: O(s.length - k)
 * Space Complexity: O(1)
 */
var countDistinctStrings = function (s, k) {
  const stringLength = s.length;
  const moduloConstant = 1000000007;

  let numberOfOperations = stringLength - k + 1;
  if (numberOfOperations <= 0) {
    return 1;
  }

  let finalCount = 1;
  let operationIterator = 0;

  while (operationIterator < numberOfOperations) {
    finalCount = (finalCount * 2) % moduloConstant;
    operationIterator++;
  }

  return finalCount;
};
