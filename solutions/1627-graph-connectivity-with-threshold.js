/**
 * Graph Connectivity With Threshold
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
        cityConnections[nodeIdentifier],
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
