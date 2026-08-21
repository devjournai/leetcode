/**
 * Minimum One Bit Operations To Make Integers Zero
 * Intuition: The allowed operations generate Gray-code order. The number of ops to turn n into 0 is the inverse Gray code of n, computed by XOR-folding n with its right shifts.
 * Approach: 1. Set transformationCount = 0. 2. While n > 0, XOR transformationCount with n and shift n right by 1. 3. Return the accumulated XOR (Gray-code inverse).
 * Dry Run: n = 3 (11b).
 *   - xor 11 → 11, n=1; xor 1 → 10b = 2. Answer 2.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var minimumOneBitOperations = function (inputNumber) {
  let transformationCount = 0;
  let temporaryNumber = inputNumber;

  while (temporaryNumber > 0) {
    transformationCount ^= temporaryNumber;
    temporaryNumber >>= 1;
  }

  return transformationCount;
};
