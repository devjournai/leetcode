/**
 * Greatest Sum Divisible By Three
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
          potentialTotalSum,
        );
      }
    }
  }

  return maxSumsForRemainders[0];
};
