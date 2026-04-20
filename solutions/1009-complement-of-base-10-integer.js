/**
 * Complement of Base 10 Integer
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
