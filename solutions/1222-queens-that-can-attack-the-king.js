/**
 * Queens That Can Attack The King
 * Time Complexity: O(Q + B)
 * Space Complexity: O(Q)
 */
var queensAttacktheKing = function (
  allQueenPositions,
  kingLocationCoordinates,
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
