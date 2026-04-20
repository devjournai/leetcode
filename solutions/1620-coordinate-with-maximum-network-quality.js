/**
 * Coordinate With Maximum Network Quality
 * Time Complexity: O(W * H * N)
 * Space Complexity: O(1)
 */
var bestCoordinate = function (towers, radius) {
  let highestNetworkQuality = 0;
  let bestLocationCandidate = [0, 0];

  function calculateEuclideanDistance(coordA_X, coordA_Y, coordB_X, coordB_Y) {
    const deltaX = coordB_X - coordA_X;
    const deltaY = coordB_Y - coordA_Y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  for (let scanXPoint = 0; scanXPoint <= 50; ++scanXPoint) {
    for (let scanYPoint = 0; scanYPoint <= 50; ++scanYPoint) {
      let currentTotalSignal = 0;

      for (let towerIdx = 0; towerIdx < towers.length; ++towerIdx) {
        const towerDetails = towers[towerIdx];
        const towerLocationX = towerDetails[0];
        const towerLocationY = towerDetails[1];
        const towerPower = towerDetails[2];

        const calculatedDistance = calculateEuclideanDistance(
          scanXPoint,
          scanYPoint,
          towerLocationX,
          towerLocationY,
        );

        if (calculatedDistance <= radius) {
          const signalContribution = Math.floor(
            towerPower / (1 + calculatedDistance),
          );
          currentTotalSignal += signalContribution;
        }
      }

      if (currentTotalSignal > highestNetworkQuality) {
        highestNetworkQuality = currentTotalSignal;
        bestLocationCandidate = [scanXPoint, scanYPoint];
      } else if (currentTotalSignal === highestNetworkQuality) {
        if (
          scanXPoint < bestLocationCandidate[0] ||
          (scanXPoint === bestLocationCandidate[0] &&
            scanYPoint < bestLocationCandidate[1])
        ) {
          bestLocationCandidate = [scanXPoint, scanYPoint];
        }
      }
    }
  }

  return bestLocationCandidate;
};
