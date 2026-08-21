/**
 * Graph Connectivity With Threshold
 * Intuition: Cities a,b are connected when gcd(a,b) > threshold. Union all multiples of each factor f > threshold so those cities share a component, then answer queries with find.
 * Approach: 1. Union-Find on 1..n. 2. For every factor f from threshold+1 to n, union f with 2f, 3f, ... 3. For each query, push whether the two cities have the same root.
 * Dry Run: n=6, threshold=2, query [1,4].
 *   - Factors 3,4,5,6 union 3-6 and 4. 1 stays isolated → false.
 * Time Complexity: O(N log N + Q)
 * Space Complexity: O(N + Q)
 */
var areConnected = function (cityCount, divisorThreshold, connectionQueries) {
  const cityConnections = new Array(cityCount + 1);
  for (let indexValue = 0; indexValue <= cityCount; indexValue++) {
    cityConnections[indexValue] = indexValue;
  }

  function retrieveRepresentative(nodeIdentifier) {
    if (cityConnections[nodeIdentifier] !== nodeIdentifier) {
      cityConnections[nodeIdentifier] = retrieveRepresentative(
        cityConnections[nodeIdentifier]
      );
    }
    return cityConnections[nodeIdentifier];
  }

  function uniteComponents(firstNode, secondNode) {
    let rootOne = retrieveRepresentative(firstNode);
    let rootTwo = retrieveRepresentative(secondNode);
    if (rootOne !== rootTwo) {
      cityConnections[rootOne] = rootTwo;
    }
  }

  let factorIter = divisorThreshold + 1;
  while (factorIter <= cityCount) {
    let currentCityMultiple = factorIter;
    while (currentCityMultiple <= cityCount) {
      uniteComponents(currentCityMultiple, factorIter);
      currentCityMultiple += factorIter;
    }
    factorIter++;
  }

  const resultList = [];
  let queryIndex = 0;
  while (queryIndex < connectionQueries.length) {
    const currentQuery = connectionQueries[queryIndex];
    const cityA = currentQuery[0];
    const cityB = currentQuery[1];
    const rootA = retrieveRepresentative(cityA);
    const rootB = retrieveRepresentative(cityB);
    resultList.push(rootA === rootB);
    queryIndex++;
  }

  return resultList;
};
