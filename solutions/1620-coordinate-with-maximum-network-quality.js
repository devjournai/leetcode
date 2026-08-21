/**
 * Coordinate With Maximum Network Quality
 * Intuition: Coordinates are in 0..50, so brute-force every integer point. Quality is the sum of floor(q/(1+d)) for towers within radius. Ties take the lexicographically smallest (x,y).
 * Approach: 1. For x,y in 0..50, accumulate signal from each in-range tower. 2. If quality is strictly better, take this point. 3. If equal, keep the smaller (x,y) in dictionary order. 4. Return the best point (or [0,0] if all qualities are 0).
 * Dry Run: towers=[[1,2,5],[2,1,7],[3,1,9]], radius=2.
 *   - Point (2,1) yields the unique maximum quality.
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
          towerLocationY
        );

        if (calculatedDistance <= radius) {
          const signalContribution = Math.floor(
            towerPower / (1 + calculatedDistance)
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
