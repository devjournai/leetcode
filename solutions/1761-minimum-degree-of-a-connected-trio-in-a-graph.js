/**
 * Minimum Degree Of A Connected Trio In A Graph
 * Intuition: A connected trio is a triangle. Its external degree is the sum of the three node degrees minus 6, because the triangle's three edges contribute 6 to that sum.
 * Approach: 1. Fill `networkAdjacency` sets and `nodeConnectivityCounts` from `edgeSet`. 2. For each `currentNodeA`, walk neighbors `currentNodeB` and their neighbors `currentNodeC`. 3. If C is adjacent to A, take `sumOfDegrees - 6` and keep `minimumTrioDegreeValue`. 4. Return -1 if none, else the minimum.
 * Dry Run: n = 6, edges = [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]].
 *   - Trio 1-2-3 has degrees 3,3,3 → 9-6=3. Return 3.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N + M)
 */
var minTrioDegree = function (n, edges) {
  const totalNodes = n;
  const edgeSet = edges;

  const networkAdjacency = Array.from(
    { length: totalNodes + 1 },
    () => new Set()
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
            currentTrioExternalDegree
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
