/**
 * Minimum Skips To Arrive At Meeting On Time
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var minSkips = function (dist, speed, hoursBefore) {
  const totalRoadCount = dist.length;
  const dpTable = Array.from({ length: totalRoadCount + 1 }, () =>
    new Array(totalRoadCount + 1).fill(Infinity),
  );
  dpTable[0][0] = 0;

  for (
    let roadIteration = 1;
    roadIteration <= totalRoadCount;
    roadIteration++
  ) {
    for (let skipCount = 0; skipCount <= roadIteration; skipCount++) {
      if (skipCount < roadIteration) {
        const previousAccumulatedTimeScaled =
          dpTable[roadIteration - 1][skipCount];
        if (previousAccumulatedTimeScaled !== Infinity) {
          const timeForCurrentCalculation =
            previousAccumulatedTimeScaled + dist[roadIteration - 1];
          const timeAfterRestApplied =
            Math.ceil(timeForCurrentCalculation / speed) * speed;
          dpTable[roadIteration][skipCount] = Math.min(
            dpTable[roadIteration][skipCount],
            timeAfterRestApplied,
          );
        }
      }

      if (skipCount > 0) {
        const previousAccumulatedTimeScaledWithOneLessSkip =
          dpTable[roadIteration - 1][skipCount - 1];
        if (previousAccumulatedTimeScaledWithOneLessSkip !== Infinity) {
          const totalTimeWithoutRest =
            previousAccumulatedTimeScaledWithOneLessSkip +
            dist[roadIteration - 1];
          dpTable[roadIteration][skipCount] = Math.min(
            dpTable[roadIteration][skipCount],
            totalTimeWithoutRest,
          );
        }
      }
    }
  }

  const targetTimeScaled = hoursBefore * speed;
  for (
    let minimumSkipsRequired = 0;
    minimumSkipsRequired <= totalRoadCount;
    minimumSkipsRequired++
  ) {
    if (dpTable[totalRoadCount][minimumSkipsRequired] <= targetTimeScaled) {
      return minimumSkipsRequired;
    }
  }

  return -1;
};
