/**
 * Minimum Moves To Make Array Complementary
 * Time Complexity: O(n + limit)
 * Space Complexity: O(limit)
 */
var minMoves = function (nums, limit) {
  const arrayLength = nums.length;
  const moveDifference = new Array(2 * limit + 2).fill(0);
  let minTotalMoves = arrayLength;

  for (let pairIndex = 0; pairIndex < arrayLength / 2; pairIndex++) {
    const firstElement = nums[pairIndex];
    const secondElement = nums[arrayLength - 1 - pairIndex];

    const oneMoveLowerBound = Math.min(firstElement, secondElement) + 1;
    const oneMoveUpperBound = Math.max(firstElement, secondElement) + limit;

    moveDifference[2] += 2;
    moveDifference[oneMoveLowerBound] -= 1;
    moveDifference[firstElement + secondElement] -= 1;
    moveDifference[firstElement + secondElement + 1] += 1;
    moveDifference[oneMoveUpperBound + 1] += 1;
  }

  let currentMovesForTarget = 0;
  for (
    let targetSumCandidate = 2;
    targetSumCandidate <= 2 * limit;
    targetSumCandidate++
  ) {
    currentMovesForTarget += moveDifference[targetSumCandidate];
    minTotalMoves = Math.min(minTotalMoves, currentMovesForTarget);
  }

  return minTotalMoves;
};
