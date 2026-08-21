/**
 * Optimize Water Distribution In A Village
 * Intuition: A virtual house 0 connected to every house i by an edge of well-cost[i] turns wells into ordinary edges. The MST of that graph is the cheapest way to give every house water.
 * Approach: 1. Add edges (0,i,wells[i-1]) and all pipes. 2. Sort by cost. 3. Kruskal union-find until n unions (n houses plus virtual node 0). 4. Return the total cost.
 * Dry Run: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]].
 *   - Cheapest: well at 1 (cost 1), pipes 1-2 and 2-3 (cost 1+1). Total 3.
 * Time Complexity: O((N + M) log (N + M))
 * Space Complexity: O(N + M)
 */
var minCostToSupplyWater = function (
  totalVillageHouses,
  wellInstallationCosts,
  pipeConfigurations
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
    (_, elementIndex) => elementIndex
  );
  let totalMinimumCost = 0;
  let connectionsEstablished = 0;

  function findSetRepresentative(nodeIdentifier) {
    if (parentArray[nodeIdentifier] !== nodeIdentifier) {
      parentArray[nodeIdentifier] = findSetRepresentative(
        parentArray[nodeIdentifier]
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
