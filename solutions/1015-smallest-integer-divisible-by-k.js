/**
 * Smallest Integer Divisible By K
 * Time Complexity: O(k)
 * Space Complexity: O(1)
 */
var smallestRepunitDivByK = function (targetDivisor) {
  if (targetDivisor % 2 === 0 || targetDivisor % 5 === 0) {
    return -1;
  }

  let accumulatedRemainder = 0;
  for (
    let currentSequenceLength = 1;
    currentSequenceLength <= targetDivisor;
    currentSequenceLength++
  ) {
    accumulatedRemainder = (accumulatedRemainder * 10 + 1) % targetDivisor;
    if (accumulatedRemainder === 0) {
      return currentSequenceLength;
    }
  }

  return -1;
};
