/**
 * Minimize Max Distance To Gas Station
 * Time Complexity: O(N log(M/epsilon))
 * Space Complexity: O(N)
 */
var minmaxGasDist = function (stations, k) {
  const distanceSegments = [];
  for (let stationIndex = 1; stationIndex < stations.length; stationIndex++) {
    distanceSegments.push(stations[stationIndex] - stations[stationIndex - 1]);
  }

  let searchRangeLow = 0;
  let searchRangeHigh = Math.max(...distanceSegments);

  while (searchRangeHigh - searchRangeLow > 1e-6) {
    const candidateDistance = (searchRangeLow + searchRangeHigh) / 2;

    let totalInsertionsRequired = 0;
    for (const currentSegmentLength of distanceSegments) {
      totalInsertionsRequired += Math.floor(
        currentSegmentLength / candidateDistance,
      );
    }

    if (totalInsertionsRequired <= k) {
      searchRangeHigh = candidateDistance;
    } else {
      searchRangeLow = candidateDistance;
    }
  }

  return searchRangeHigh;
};
