/**
 * Moving Stones Until Consecutive
 * Intuition: After sorting, max moves is the empty slots between ends (end-start-2). Min is 0 if already consecutive, 1 if a gap of size 1 or 2 lets one stone hop in, else 2.
 * Approach: 1. Sort a,b,c. 2. max = last-first-2. 3. If both adjacent gaps are 1, min=0. 4. Else if either gap <=2, min=1. 5. Else min=2.
 * Dry Run: a=1,b=2,c=5.
 *   - Sorted 1,2,5. Gaps 1 and 3. One gap is 1 so min=1, max=5-1-2=2. [1,2].
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var numMovesStones = function (a, b, c) {
  const stonePositions = [a, b, c];
  stonePositions.sort((firstValue, secondValue) => firstValue - secondValue);

  const firstStonePosition = stonePositions[0];
  const secondStonePosition = stonePositions[1];
  const thirdStonePosition = stonePositions[2];

  const gapBetweenFirstAndSecond = secondStonePosition - firstStonePosition;
  const gapBetweenSecondAndThird = thirdStonePosition - secondStonePosition;

  const totalDistance = thirdStonePosition - firstStonePosition;
  const maximumMovesCount = totalDistance - 2;

  let minimumMovesCount;

  const allStonesAdjacent =
    gapBetweenFirstAndSecond === 1 && gapBetweenSecondAndThird === 1;
  const oneMovePossible =
    gapBetweenFirstAndSecond <= 2 || gapBetweenSecondAndThird <= 2;

  if (allStonesAdjacent) {
    minimumMovesCount = 0;
  } else if (oneMovePossible) {
    minimumMovesCount = 1;
  } else {
    minimumMovesCount = 2;
  }

  const finalAnswer = [minimumMovesCount, maximumMovesCount];
  return finalAnswer;
};
