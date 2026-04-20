/**
 * Is Graph Bipartite
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
var isBipartite = function (adjacencyList) {
  const totalNodes = adjacencyList.length;
  const nodePartition = new Array(totalNodes).fill(-1);

  const checkBipartiteDfs = (
    currentVertex,
    assignedPartition,
    graphStructure,
    partitionMap,
  ) => {
    partitionMap[currentVertex] = assignedPartition;

    for (const connectedVertex of graphStructure[currentVertex]) {
      if (partitionMap[connectedVertex] === -1) {
        if (
          !checkBipartiteDfs(
            connectedVertex,
            1 - assignedPartition,
            graphStructure,
            partitionMap,
          )
        ) {
          return false;
        }
      } else if (partitionMap[connectedVertex] === assignedPartition) {
        return false;
      }
    }
    return true;
  };

  for (let nodeIdentifier = 0; nodeIdentifier < totalNodes; nodeIdentifier++) {
    if (nodePartition[nodeIdentifier] === -1) {
      if (!checkBipartiteDfs(nodeIdentifier, 0, adjacencyList, nodePartition)) {
        return false;
      }
    }
  }

  return true;
};
