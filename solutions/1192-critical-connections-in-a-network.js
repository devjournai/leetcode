/**
 * Critical Connections In A Network
 * Intuition: A bridge is an edge whose child cannot reach an ancestor except through that edge (Tarjan low-link).
 * Approach: 1. Build the undirected graph. 2. DFS assigning discovery time and low[v]. 3. After recursing a child, if low[child] > disc[u] the edge is critical. 4. Back-edges update low with the neighbor's discovery time.
 * Dry Run: n=4, edges [[0,1],[1,2],[2,0],[1,3]]. Cycle 0-1-2 has no bridges; 1-3 has low[3]>disc[1] → [[1,3]].
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
          lowestReachTimes[adjacentNode]
        );

        if (lowestReachTimes[adjacentNode] > nodeDiscoveryTimes[currentNode]) {
          foundCriticalConnections.push([currentNode, adjacentNode]);
        }
      } else {
        lowestReachTimes[currentNode] = Math.min(
          lowestReachTimes[currentNode],
          nodeDiscoveryTimes[adjacentNode]
        );
      }
    }
  }
};
