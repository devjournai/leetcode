/**
 * Minimum Total Distance Traveled
 * Time Complexity: O(N * M * L)
 * Space Complexity: O(N * M)
 */
var minimumTotalDistance = function (robotPositions, factoryData) {
  robotPositions.sort((a, b) => a - b);
  factoryData.sort((a, b) => a[0] - b[0]);

  const totalRobots = robotPositions.length;
  const totalFactories = factoryData.length;
  const memoGrid = Array.from({ length: totalRobots + 1 }, () =>
    Array(totalFactories + 1).fill(Infinity),
  );

  const solveMinPath = (robotCurrentIndex, factoryCurrentIndex) => {
    if (robotCurrentIndex === totalRobots) {
      return 0;
    }
    if (factoryCurrentIndex === totalFactories) {
      return Infinity;
    }

    if (memoGrid[robotCurrentIndex][factoryCurrentIndex] !== Infinity) {
      return memoGrid[robotCurrentIndex][factoryCurrentIndex];
    }

    let minOverallDistance = solveMinPath(
      robotCurrentIndex,
      factoryCurrentIndex + 1,
    );

    let currentCumulativeCost = 0;
    let robotsServicedCount = 0;
    const factoryCapacity = factoryData[factoryCurrentIndex][1];
    const factoryLocation = factoryData[factoryCurrentIndex][0];

    while (
      robotsServicedCount < factoryCapacity &&
      robotCurrentIndex + robotsServicedCount < totalRobots
    ) {
      currentCumulativeCost += Math.abs(
        robotPositions[robotCurrentIndex + robotsServicedCount] -
          factoryLocation,
      );
      minOverallDistance = Math.min(
        minOverallDistance,
        currentCumulativeCost +
          solveMinPath(
            robotCurrentIndex + robotsServicedCount + 1,
            factoryCurrentIndex + 1,
          ),
      );
      robotsServicedCount++;
    }

    memoGrid[robotCurrentIndex][factoryCurrentIndex] = minOverallDistance;
    return minOverallDistance;
  };

  return solveMinPath(0, 0);
};
