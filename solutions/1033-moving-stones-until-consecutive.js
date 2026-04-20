/**
 * Moving Stones Until Consecutive
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
