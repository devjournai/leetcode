/**
 * Optimize Water Distribution In A Village
 * Time Complexity: O((N + M) log (N + M))
 * Space Complexity: O(N + M)
 */
var minCostToSupplyWater = function (
  totalVillageHouses,
  wellInstallationCosts,
  pipeConfigurations,
) {
  const graphEdges = [];

  for (
    let currentHouseIndex = 0;
    currentHouseIndex < totalVillageHouses;
    currentHouseIndex++
  ) {
    graphEdges.push([
      0,
      currentHouseIndex + 1,
      wellInstallationCosts[currentHouseIndex],
    ]);
  }

  for (const currentPipeConnection of pipeConfigurations) {
    const [houseOneIdentifier, houseTwoIdentifier, pipeConnectionCost] =
      currentPipeConnection;
    graphEdges.push([
      houseOneIdentifier,
      houseTwoIdentifier,
      pipeConnectionCost,
    ]);
  }

  graphEdges.sort((edgeA, edgeB) => edgeA[2] - edgeB[2]);

  const parentArray = Array.from(
    { length: totalVillageHouses + 1 },
    (_, elementIndex) => elementIndex,
  );
  let totalMinimumCost = 0;
  let connectionsEstablished = 0;

  function findSetRepresentative(nodeIdentifier) {
    if (parentArray[nodeIdentifier] !== nodeIdentifier) {
      parentArray[nodeIdentifier] = findSetRepresentative(
        parentArray[nodeIdentifier],
      );
    }
    return parentArray[nodeIdentifier];
  }

  function unifySets(nodeAlpha, nodeBeta) {
    const rootAlpha = findSetRepresentative(nodeAlpha);
    const rootBeta = findSetRepresentative(nodeBeta);
    if (rootAlpha !== rootBeta) {
      parentArray[rootAlpha] = rootBeta;
      return true;
    }
    return false;
  }

  for (const currentEdgeCandidate of graphEdges) {
    const edgeStartNode = currentEdgeCandidate[0];
    const edgeEndNode = currentEdgeCandidate[1];
    const edgeWeight = currentEdgeCandidate[2];

    if (unifySets(edgeStartNode, edgeEndNode)) {
      totalMinimumCost += edgeWeight;
      connectionsEstablished++;
      if (connectionsEstablished === totalVillageHouses) {
        break;
      }
    }
  }

  return totalMinimumCost;
};
