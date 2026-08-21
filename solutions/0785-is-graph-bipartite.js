/**
 * Is Graph Bipartite
 * Intuition: Color vertices with 0/1 via DFS so every edge joins opposite colors. A neighbor already in `assignedPartition` is an odd cycle.
 * Approach: 1. `nodePartition` starts at -1. 2. `checkBipartiteDfs` assigns `assignedPartition`, then for each neighbor: uncolored → recurse with `1 - assignedPartition`; same color → false. 3. For every uncolored `nodeIdentifier`, start DFS with color 0. Return true if all components succeed.
 * Dry Run: adjacencyList = [[1,3],[0,2],[1,3],[0,2]].
 *   - 0 color 0, 1 color 1, 2 color 0, 3 color 1. No same-color edge. Return true.
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
    partitionMap
  ) => {
    partitionMap[currentVertex] = assignedPartition;

    for (const connectedVertex of graphStructure[currentVertex]) {
      if (partitionMap[connectedVertex] === -1) {
        if (
          !checkBipartiteDfs(
            connectedVertex,
            1 - assignedPartition,
            graphStructure,
            partitionMap
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
