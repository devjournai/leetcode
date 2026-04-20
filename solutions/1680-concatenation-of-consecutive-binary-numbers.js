/**
 * Concatenation of Consecutive Binary Numbers
 * Time Complexity: O(N * logN) or O(N) amortized for bit length calculation
 * Space Complexity: O(1)
 */
var concatenatedBinary = function (n) {
  const moduloConst = 1000000007;
  let concatenatedValue = 0;
  let currentNumber = 1;
  let powerOfTwoThreshold = 1;
  let currentBitsRequired = 0;

  while (currentNumber <= n) {
    if (currentNumber === powerOfTwoThreshold) {
      currentBitsRequired++;
      powerOfTwoThreshold *= 2;
    }
    concatenatedValue =
      (((concatenatedValue * (1 << currentBitsRequired)) % moduloConst) +
        currentNumber) %
      moduloConst;
    currentNumber++;
  }

  return concatenatedValue;
};
