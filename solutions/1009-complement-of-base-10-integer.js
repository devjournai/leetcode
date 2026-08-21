/**
 * Complement of Base 10 Integer
 * Intuition: Complementing N is XOR with a mask of 1-bits covering every bit of N (and 0 maps to 1).
 * Approach: 1. If N is 0 return 1. 2. Walk N right, OR a growing power-of-two into the mask. 3. Return N XOR mask.
 * Dry Run: N = 5 (101).
 *   - Mask builds 1, then 11, then 111 = 7. 5 XOR 7 = 2.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var bitwiseComplement = function (N) {
  if (N === 0) {
    return 1;
  }

  let workingNumber = N;
  let complementMask = 0;
  let currentBitPlace = 1;

  while (workingNumber > 0) {
    complementMask = complementMask | currentBitPlace;
    workingNumber = workingNumber >> 1;
    currentBitPlace = currentBitPlace << 1;
  }

  return N ^ complementMask;
};
