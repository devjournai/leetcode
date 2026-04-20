/**
 * Shortest Distance To Target Color
 * Time Complexity: O(N + Q log N)
 * Space Complexity: O(N + Q)
 */
var shortestDistanceColor = function (colors, queries) {
  const colorStoreMap = { 1: [], 2: [], 3: [] };

  colors.forEach((currentColorValue, currentArrayIndex) => {
    colorStoreMap[currentColorValue].push(currentArrayIndex);
  });

  const queryResults = [];
  const totalQueries = queries.length;

  for (let queryIdx = 0; queryIdx < totalQueries; queryIdx++) {
    const currentQueryEntry = queries[queryIdx];
    const targetQueryIndex = currentQueryEntry[0];
    const targetQueryColor = currentQueryEntry[1];
    queryResults.push(
      findClosestPositionDelta(
        targetQueryIndex,
        colorStoreMap[targetQueryColor],
      ),
    );
  }

  return queryResults;

  function findClosestPositionDelta(queryLocation, colorPositions) {
    const positionsLength = colorPositions.length;
    if (positionsLength === 0) {
      return -1;
    }

    if (queryLocation <= colorPositions[0]) {
      return colorPositions[0] - queryLocation;
    }
    if (queryLocation >= colorPositions[positionsLength - 1]) {
      return queryLocation - colorPositions[positionsLength - 1];
    }

    let lowBoundary = 0;
    let highBoundary = positionsLength - 1;
    let searchResultIndex = 0;

    while (lowBoundary < highBoundary) {
      const midPoint = Math.floor((lowBoundary + highBoundary) / 2);
      if (colorPositions[midPoint] < queryLocation) {
        lowBoundary = midPoint + 1;
      } else {
        highBoundary = midPoint;
      }
    }
    searchResultIndex = lowBoundary;

    const distanceOne = colorPositions[searchResultIndex] - queryLocation;
    const distanceTwo = queryLocation - colorPositions[searchResultIndex - 1];

    return Math.min(distanceOne, distanceTwo);
  }
};
