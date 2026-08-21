/**
 * Find The City With The Smallest Number Of Neighbors At A Threshold Distance
 * Intuition: Need all-pairs shortest paths vs a threshold. Floyd–Warshall, then pick the city with fewest reachable others (largest id on ties).
 * Approach: 1. Init dist[i][i]=0 and undirected edge weights. 2. Triple loop relax via k. 3. Count neighbors with dist ≤ threshold. 4. Track min count and max city id.
 * Dry Run: n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], threshold=4. City 3 reaches 2 others — fewest (tie-break 3).
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var findTheCity = function (n, edges, distanceThreshold) {
  const graphDistances = Array.from({ length: n }, () =>
    Array(n).fill(Infinity)
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
                graphDistances[intermediateVertex][currentDestinationVertex]
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
      }
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
