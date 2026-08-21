/**
 * Shortest Distance To Target Color
 * Intuition: Store every index of each color, then for a query binary-search the nearest stored index of the requested color.
 * Approach: 1. Bucket indices of colors 1, 2, and 3. 2. For each query (i, c), binary-search the first index ≥ i in that bucket. 3. Return min distance to that index and the previous one, or -1 if the color never appears.
 * Dry Run: colors = [1,1,2,1,3], query [2,1]. Bucket 1 = [0,1,3]. First index ≥ 2 is 3; neighbors 3 and 1; min(|3-2|, |2-1|) = 1.
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
        colorStoreMap[targetQueryColor]
      )
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
