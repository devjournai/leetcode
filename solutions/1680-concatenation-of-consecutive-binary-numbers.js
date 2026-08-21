/**
 * Concatenation of Consecutive Binary Numbers
 * Intuition: Concatenating 1..n in binary is repeatedly shifting the running value left by the bit-length of i then adding i, all modulo 1e9+7. Bit-length increases by 1 at each power of two.
 * Approach: 1. Track currentBitsRequired, doubling powerOfTwoThreshold when i hits it. 2. concatenatedValue = (concatenatedValue * 2^bits + i) mod 1e9+7. 3. Loop i from 1 to n.
 * Dry Run: n=3.
 *   - i=1 (1 bit): 1; i=2 (2 bits): 1<<2 + 2 = 6; i=3: 6<<2 + 3 = 27.
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
