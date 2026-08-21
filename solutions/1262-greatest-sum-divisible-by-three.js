/**
 * Greatest Sum Divisible By Three
 * Intuition: Track the best sum for remainders 0,1,2. Each number updates those three remainders from a snapshot so it is used at most once.
 * Approach: 1. maxSumsForRemainders starts [0, -Inf, -Inf]. 2. For each number, copy prior remainders and for each finite prior sum add the number, taking max at (sum%3). 3. Return remainder 0.
 * Dry Run: nums = [3,6,5,1,8]
 *   after 3,6: remainders [9, -Inf, -Inf]. +5 -> [9, -Inf, 14]. +1 -> [15, 10, 14]. +8 -> rem0=max(15,10+8)=18. Return 18.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxSumDivThree = function (nums) {
  const maxSumsForRemainders = [0, -Infinity, -Infinity];

  for (const currentNumber of nums) {
    const priorRemaindersSums = [...maxSumsForRemainders];
    for (let remainderPointer = 0; remainderPointer < 3; remainderPointer++) {
      if (priorRemaindersSums[remainderPointer] !== -Infinity) {
        const potentialTotalSum =
          priorRemaindersSums[remainderPointer] + currentNumber;
        const resultingRemainder = potentialTotalSum % 3;
        maxSumsForRemainders[resultingRemainder] = Math.max(
          maxSumsForRemainders[resultingRemainder],
          potentialTotalSum
        );
      }
    }
  }

  return maxSumsForRemainders[0];
};
