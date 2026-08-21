/**
 * Smallest Integer Divisible By K
 * Intuition: Numbers of all 1s never divide by 2 or 5. Otherwise remainders of 1, 11, 111, ... modulo k cycle within k steps.
 * Approach: 1. Return -1 if k is even or divisible by 5. 2. Iterate length 1..k, remainder = (remainder*10+1)%k. 3. Return the length when remainder hits 0, else -1.
 * Dry Run: k = 3.
 *   - rem: 1, then 11%3=2, then 21%3=0 at length 3. Return 3.
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
