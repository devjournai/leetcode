/**
 * Valid Square
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var validSquare = function (p1, p2, p3, p4) {
  const calculateSquaredDistance = (pointAlpha, pointBeta) => {
    const deltaX = pointAlpha[0] - pointBeta[0];
    const deltaY = pointAlpha[1] - pointBeta[1];
    return deltaX * deltaX + deltaY * deltaY;
  };

  const squaredDistancesList = [];

  const distOneTwo = calculateSquaredDistance(p1, p2);
  squaredDistancesList.push(distOneTwo);

  const distOneThree = calculateSquaredDistance(p1, p3);
  squaredDistancesList.push(distOneThree);

  const distOneFour = calculateSquaredDistance(p1, p4);
  squaredDistancesList.push(distOneFour);

  const distTwoThree = calculateSquaredDistance(p2, p3);
  squaredDistancesList.push(distTwoThree);

  const distTwoFour = calculateSquaredDistance(p2, p4);
  squaredDistancesList.push(distTwoFour);

  const distThreeFour = calculateSquaredDistance(p3, p4);
  squaredDistancesList.push(distThreeFour);

  if (
    distOneTwo === 0 ||
    distOneThree === 0 ||
    distOneFour === 0 ||
    distTwoThree === 0 ||
    distTwoFour === 0 ||
    distThreeFour === 0
  ) {
    return false;
  }

  squaredDistancesList.sort((valA, valB) => valA - valB);

  const checkFirstFourEqual =
    squaredDistancesList[0] === squaredDistancesList[1] &&
    squaredDistancesList[1] === squaredDistancesList[2] &&
    squaredDistancesList[2] === squaredDistancesList[3];

  const checkLastTwoEqual = squaredDistancesList[4] === squaredDistancesList[5];

  const checkDiagonalRelation =
    squaredDistancesList[4] === 2 * squaredDistancesList[0];

  return checkFirstFourEqual && checkLastTwoEqual && checkDiagonalRelation;
};
