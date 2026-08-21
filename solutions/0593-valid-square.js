/**
 * Valid Square
 * Intuition: Four distinct points form a square iff the six pairwise squared distances are four equal sides plus two equal diagonals, and each diagonal squared equals twice a side squared.
 * Approach: 1. `calculateSquaredDistance` returns dx²+dy² for each of the six pairs into `squaredDistancesList`. 2. Any zero distance (duplicate points) returns false. 3. Sort distances. 4. Require first four equal (`checkFirstFourEqual`), last two equal (`checkLastTwoEqual`), and `squaredDistancesList[4] === 2 * squaredDistancesList[0]`.
 * Dry Run: p1=[0,0], p2=[1,1], p3=[1,0], p4=[0,1].
 *   - Distances: four 1s and two 2s (sorted). Diagonal 2 === 2*1. Return true.
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
