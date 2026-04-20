/**
 * Minimum Degree Of A Connected Trio In A Graph
 * Time Complexity: O(N^3)
 * Space Complexity: O(N + M)
 */
var minTrioDegree = function (n, edges) {
  const totalNodes = n;
  const edgeSet = edges;

  const networkAdjacency = Array.from(
    { length: totalNodes + 1 },
    () => new Set(),
  );
  const nodeConnectivityCounts = Array(totalNodes + 1).fill(0);

  for (let edgePointer = 0; edgePointer < edgeSet.length; edgePointer++) {
    const currentEdge = edgeSet[edgePointer];
    const firstEndPoint = currentEdge[0];
    const secondEndPoint = currentEdge[1];

    networkAdjacency[firstEndPoint].add(secondEndPoint);
    networkAdjacency[secondEndPoint].add(firstEndPoint);
    nodeConnectivityCounts[firstEndPoint]++;
    nodeConnectivityCounts[secondEndPoint]++;
  }

  let minimumTrioDegreeValue = Infinity;

  let currentNodeA = 1;
  while (currentNodeA <= totalNodes) {
    networkAdjacency[currentNodeA].forEach((currentNodeB) => {
      const neighborsOfCurrentB = Array.from(networkAdjacency[currentNodeB]);
      for (
        let neighborIndexForC = 0;
        neighborIndexForC < neighborsOfCurrentB.length;
        neighborIndexForC++
      ) {
        const currentNodeC = neighborsOfCurrentB[neighborIndexForC];

        if (networkAdjacency[currentNodeC].has(currentNodeA)) {
          const sumOfDegrees =
            nodeConnectivityCounts[currentNodeA] +
            nodeConnectivityCounts[currentNodeB] +
            nodeConnectivityCounts[currentNodeC];
          const currentTrioExternalDegree = sumOfDegrees - 6;

          minimumTrioDegreeValue = Math.min(
            minimumTrioDegreeValue,
            currentTrioExternalDegree,
          );
        }
      }
    });
    currentNodeA++;
  }

  if (minimumTrioDegreeValue === Infinity) {
    return -1;
  } else {
    return minimumTrioDegreeValue;
  }
};
