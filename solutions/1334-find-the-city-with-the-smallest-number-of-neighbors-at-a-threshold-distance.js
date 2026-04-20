/**
 * Find The City With The Smallest Number Of Neighbors At A Threshold Distance
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var findTheCity = function (n, edges, distanceThreshold) {
  const graphDistances = Array.from({ length: n }, () =>
    Array(n).fill(Infinity),
  );

  let citySelfIndex = 0;
  while (citySelfIndex < n) {
    graphDistances[citySelfIndex][citySelfIndex] = 0;
    citySelfIndex++;
  }

  for (const [sourceCityNode, targetCityNode, pathWeight] of edges) {
    graphDistances[sourceCityNode][targetCityNode] = pathWeight;
    graphDistances[targetCityNode][sourceCityNode] = pathWeight;
  }

  for (
    let intermediateVertex = 0;
    intermediateVertex < n;
    intermediateVertex++
  ) {
    let currentSourceVertex = 0;
    while (currentSourceVertex < n) {
      let currentDestinationVertex = 0;
      while (currentDestinationVertex < n) {
        if (
          graphDistances[currentSourceVertex][intermediateVertex] !==
            Infinity &&
          graphDistances[intermediateVertex][currentDestinationVertex] !==
            Infinity
        ) {
          graphDistances[currentSourceVertex][currentDestinationVertex] =
            Math.min(
              graphDistances[currentSourceVertex][currentDestinationVertex],
              graphDistances[currentSourceVertex][intermediateVertex] +
                graphDistances[intermediateVertex][currentDestinationVertex],
            );
        }
        currentDestinationVertex++;
      }
      currentSourceVertex++;
    }
  }

  let minReachableCitiesCount = n + 1;
  let finalCityResult = -1;

  let cityToEvaluate = 0;
  do {
    let currentReachableCount = 0;
    graphDistances[cityToEvaluate].forEach(
      (individualDistance, neighborCityIndex) => {
        if (
          cityToEvaluate !== neighborCityIndex &&
          individualDistance <= distanceThreshold
        ) {
          currentReachableCount++;
        }
      },
    );

    if (currentReachableCount < minReachableCitiesCount) {
      minReachableCitiesCount = currentReachableCount;
      finalCityResult = cityToEvaluate;
    } else if (currentReachableCount === minReachableCitiesCount) {
      finalCityResult = Math.max(finalCityResult, cityToEvaluate);
    }

    cityToEvaluate++;
  } while (cityToEvaluate < n);

  return finalCityResult;
};
