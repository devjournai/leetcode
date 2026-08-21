/**
 * Connecting Cities With Minimum Cost
 * Intuition: Connect all n cities at min cost with Kruskal MST: sort edges by cost and union-find to skip cycles. Need n-1 unions or else impossible.
 * Approach: 1. Initialize parent[i]=i. 2. Sort connections by cost. 3. Union unused pairs and add cost until n-1 edges; path-compress finds. 4. Return cost or -1.
 * Dry Run: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]].
 *   - Sort: (2,3,1), (1,2,5), (1,3,6). Union 2-3 cost 1, union 1-2 cost 5. Two edges for 3 cities.
 *   - Answer 6.
 * Time Complexity: O(E log E)
 * Space Complexity: O(N + E)
 */
var minimumCost = function (n, connections) {
  const totalCities = n;
  const allConnections = connections;

  const parentArray = Array.from(
    { length: totalCities + 1 },
    (_, initialValue) => initialValue
  );

  const findRepresentative = (nodeIdentifier) => {
    if (parentArray[nodeIdentifier] === nodeIdentifier) {
      return nodeIdentifier;
    }
    parentArray[nodeIdentifier] = findRepresentative(
      parentArray[nodeIdentifier]
    );
    return parentArray[nodeIdentifier];
  };

  const uniteSets = (cityOneArg, cityTwoArg) => {
    const representativeA = findRepresentative(cityOneArg);
    const representativeB = findRepresentative(cityTwoArg);

    if (representativeA !== representativeB) {
      parentArray[representativeA] = representativeB;
      return true;
    }
    return false;
  };

  const connectionSorter = (itemA, itemB) => itemA[2] - itemB[2];
  allConnections.sort(connectionSorter);

  let currentMinCost = 0;
  let edgesFormed = 0;

  for (const currentConnectionEntry of allConnections) {
    const cityOneId = currentConnectionEntry[0];
    const cityTwoId = currentConnectionEntry[1];
    const connectionCost = currentConnectionEntry[2];

    if (uniteSets(cityOneId, cityTwoId)) {
      currentMinCost += connectionCost;
      edgesFormed++;

      if (edgesFormed === totalCities - 1) {
        return currentMinCost;
      }
    }
  }

  return -1;
};
