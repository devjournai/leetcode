/**
 * Minimize Max Distance To Gas Station
 * Intuition: Binary-search the smallest max gap `d` such that filling the existing gaps needs at most `k` extra stations. A gap of length L needs `floor(L/d)` insertions.
 * Approach: 1. Build `distanceSegments` between consecutive `stations`. 2. Search `[0, max(segment)]` while high-low > 1e-6. 3. Mid `candidateDistance`: sum `floor(segment / candidate)` as `totalInsertionsRequired`. 4. If that is ≤ `k`, lower `searchRangeHigh`; else raise `searchRangeLow`. Return `searchRangeHigh`.
 * Dry Run: stations = [1,2,3,4,5,6,7,8,9,10], k = 9.
 *   - All segments are 1. Mid around 0.5 needs 9 insertions → feasible, high shrinks toward 0.5.
 *   - Result ≈ 0.5.
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
        currentSegmentLength / candidateDistance
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
