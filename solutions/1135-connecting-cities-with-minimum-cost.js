/**
 * Connecting Cities With Minimum Cost
 * Time Complexity: O(E log E)
 * Space Complexity: O(N + E)
 */
var minimumCost = function (n, connections) {
  const totalCities = n;
  const allConnections = connections;

  const parentArray = Array.from(
    { length: totalCities + 1 },
    (_, initialValue) => initialValue,
  );

  const findRepresentative = (nodeIdentifier) => {
    if (parentArray[nodeIdentifier] === nodeIdentifier) {
      return nodeIdentifier;
    }
    parentArray[nodeIdentifier] = findRepresentative(
      parentArray[nodeIdentifier],
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
