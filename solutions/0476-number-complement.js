/**
 * Number Complement
 * Intuition: The complement of n’s binary (without leading zeros) is n XOR a mask of all 1-bits covering n. That mask is obtained by smearing n’s highest 1 to the right with successive `|= >>` steps.
 * Approach: 1. `bitsCoveredMask` starts as `inputNumber`. 2. OR it with itself shifted 1, 2, 4, 8, then 16 (covers 32-bit range). 3. Return `bitsCoveredMask ^ inputNumber`.
 * Dry Run: inputNumber = 5 (101b).
 *   - After smear: mask 111b = 7. 7 ^ 5 = 2 (010b).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var findComplement = function (inputNumber) {
  let bitsCoveredMask = inputNumber;
  bitsCoveredMask |= bitsCoveredMask >> 1;
  bitsCoveredMask |= bitsCoveredMask >> 2;
  bitsCoveredMask |= bitsCoveredMask >> 4;
  bitsCoveredMask |= bitsCoveredMask >> 8;
  bitsCoveredMask |= bitsCoveredMask >> 16;

  let finalAnswer = bitsCoveredMask ^ inputNumber;

  return finalAnswer;
};
