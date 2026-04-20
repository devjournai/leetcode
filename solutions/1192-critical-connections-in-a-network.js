/**
 * Critical Connections In A Network
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var criticalConnections = function (totalNodes, serverConnections) {
  const adjacencyList = Array.from({ length: totalNodes }, () => []);
  const nodeDiscoveryTimes = new Array(totalNodes).fill(-1);
  const lowestReachTimes = new Array(totalNodes).fill(-1);
  const foundCriticalConnections = [];
  let currentTimeStep = 0;

  serverConnections.forEach(([connectionStart, connectionEnd]) => {
    adjacencyList[connectionStart].push(connectionEnd);
    adjacencyList[connectionEnd].push(connectionStart);
  });

  depthFirstSearch(0, -1);

  return foundCriticalConnections;

  function depthFirstSearch(currentNode, parentNode) {
    nodeDiscoveryTimes[currentNode] = lowestReachTimes[currentNode] =
      currentTimeStep++;

    for (const adjacentNode of adjacencyList[currentNode]) {
      if (adjacentNode === parentNode) {
        continue;
      }

      if (nodeDiscoveryTimes[adjacentNode] === -1) {
        depthFirstSearch(adjacentNode, currentNode);

        lowestReachTimes[currentNode] = Math.min(
          lowestReachTimes[currentNode],
          lowestReachTimes[adjacentNode],
        );

        if (lowestReachTimes[adjacentNode] > nodeDiscoveryTimes[currentNode]) {
          foundCriticalConnections.push([currentNode, adjacentNode]);
        }
      } else {
        lowestReachTimes[currentNode] = Math.min(
          lowestReachTimes[currentNode],
          nodeDiscoveryTimes[adjacentNode],
        );
      }
    }
  }
};
