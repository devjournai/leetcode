/**
 * Xor Operation In An Array
 * Intuition: The implied array is start, start+2, ..., start+2*(n-1). XOR them in one loop.
 * Approach: 1. xorSumResult = 0. 2. For i in 0..n-1 XOR (start + 2*i). 3. Return the accumulator.
 * Dry Run: n = 5, start = 0
 *   - 0^2^4^6^8 = 8
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var xorOperation = function (n, start) {
  let xorSumResult = 0;
  for (let loopCounter = 0; loopCounter < n; loopCounter++) {
    let currentArrayElement = start + 2 * loopCounter;
    xorSumResult ^= currentArrayElement;
  }
  return xorSumResult;
};
