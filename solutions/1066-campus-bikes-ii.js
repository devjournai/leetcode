/**
 * Campus Bikes Ii
 * Time Complexity: O(N * M * 2^M)
 * Space Complexity: O(N * 2^M)
 */
var assignBikes = function (workers, bikes) {
  const numWorkers = workers.length;
  const numBikes = bikes.length;
  const dpCache = new Map();

  function calculateManhattanDistance(workerIdxValue, bikeIdxValue) {
    const workerPoint = workers[workerIdxValue];
    const bikePoint = bikes[bikeIdxValue];
    const coordDiffX = Math.abs(workerPoint[0] - bikePoint[0]);
    const coordDiffY = Math.abs(workerPoint[1] - bikePoint[1]);
    return coordDiffX + coordDiffY;
  }

  function solveAssignment(workerCurrentIndex, usedBikesBitmask) {
    if (workerCurrentIndex === numWorkers) {
      return 0;
    }

    const stateKey = `${workerCurrentIndex}_${usedBikesBitmask}`;
    if (dpCache.has(stateKey)) {
      return dpCache.get(stateKey);
    }

    let currentMinSum = Infinity;

    for (
      let bikeSearchIndex = 0;
      bikeSearchIndex < numBikes;
      bikeSearchIndex++
    ) {
      const bikeAvailabilityCheck = 1 << bikeSearchIndex;
      if ((usedBikesBitmask & bikeAvailabilityCheck) === 0) {
        const directDistance = calculateManhattanDistance(
          workerCurrentIndex,
          bikeSearchIndex,
        );
        const nextUsedBikesBitmask = usedBikesBitmask | bikeAvailabilityCheck;
        const remainingWorkersMinSum = solveAssignment(
          workerCurrentIndex + 1,
          nextUsedBikesBitmask,
        );
        const totalDistanceForThisPath =
          directDistance + remainingWorkersMinSum;
        currentMinSum = Math.min(currentMinSum, totalDistanceForThisPath);
      }
    }

    dpCache.set(stateKey, currentMinSum);
    return currentMinSum;
  }

  return solveAssignment(0, 0);
};
