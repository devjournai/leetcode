/**
 * Xor Operation In An Array
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
