/**
 * Queens That Can Attack The King
 * Intuition: A queen attacks the king if she is first on one of the eight rays from the king.
 * Approach: 1. Put queen coordinates in a Set. 2. From the king, walk each of 8 directions until the board edge. 3. Record the first queen on that ray.
 * Dry Run: king at [0,0], queen at [0,4] → ray east hits [0,4].
 * Time Complexity: O(Q + B)
 * Space Complexity: O(Q)
 */
var queensAttacktheKing = function (
  allQueenPositions,
  kingLocationCoordinates
) {
  const kingXCoord = kingLocationCoordinates[0];
  const kingYCoord = kingLocationCoordinates[1];

  const queenPositionMap = new Set();
  for (const queenIndividualPosition of allQueenPositions) {
    const queenRow = queenIndividualPosition[0];
    const queenCol = queenIndividualPosition[1];
    queenPositionMap.add(`${queenRow},${queenCol}`);
  }

  const foundAttackingQueens = [];
  const searchDirections = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const directionVector of searchDirections) {
    const deltaXStep = directionVector[0];
    const deltaYStep = directionVector[1];

    let currentScanX = kingXCoord + deltaXStep;
    let currentScanY = kingYCoord + deltaYStep;

    while (
      currentScanX >= 0 &&
      currentScanX < 8 &&
      currentScanY >= 0 &&
      currentScanY < 8
    ) {
      const currentPositionKey = `${currentScanX},${currentScanY}`;
      if (queenPositionMap.has(currentPositionKey)) {
        foundAttackingQueens.push([currentScanX, currentScanY]);
        break;
      }
      currentScanX += deltaXStep;
      currentScanY += deltaYStep;
    }
  }

  return foundAttackingQueens;
};
