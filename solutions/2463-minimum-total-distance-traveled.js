/**
 * Minimum Total Distance Traveled
 * Intuition: After sorting, each factory should repair a contiguous segment of robots. DP tries skipping a factory or assigning the next k robots to it.
 * Approach: 1. Sort robots and factories by position. 2. dp(robot i, factory j) = min of skipping factory j, or assigning the next 1..limit robots to factory j plus dp of the remainder. 3. Memoize on (robot index, factory index).
 * Dry Run: robots = [0,4,6], factories = [[2,2],[6,2]]. Skip vs assign: factory at 2 can take robots 0 and 4 (cost 2+2), factory at 6 takes 6 (cost 0). Total 4.
 * Time Complexity: O(N * M * L)
 * Space Complexity: O(N * M)
 */
var minimumTotalDistance = function (robotPositions, factoryData) {
  robotPositions.sort((a, b) => a - b);
  factoryData.sort((a, b) => a[0] - b[0]);

  const totalRobots = robotPositions.length;
  const totalFactories = factoryData.length;
  const memoGrid = Array.from({ length: totalRobots + 1 }, () =>
    Array(totalFactories + 1).fill(Infinity)
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
      factoryCurrentIndex + 1
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
          factoryLocation
      );
      minOverallDistance = Math.min(
        minOverallDistance,
        currentCumulativeCost +
          solveMinPath(
            robotCurrentIndex + robotsServicedCount + 1,
            factoryCurrentIndex + 1
          )
      );
      robotsServicedCount++;
    }

    memoGrid[robotCurrentIndex][factoryCurrentIndex] = minOverallDistance;
    return minOverallDistance;
  };

  return solveMinPath(0, 0);
};
