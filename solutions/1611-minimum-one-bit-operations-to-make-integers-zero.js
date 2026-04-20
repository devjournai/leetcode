/**
 * Minimum One Bit Operations To Make Integers Zero
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
