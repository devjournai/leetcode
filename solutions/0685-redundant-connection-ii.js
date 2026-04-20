/**
 * Redundant Connection II
 * Time Complexity: O(N * α(N))
 * Space Complexity: O(N)
 */
var findRedundantDirectedConnection = function (edges) {
  const edgeCount = edges.length;

  const dsuRepresentatives = Array.from(
    { length: edgeCount + 1 },
    (_, indexValue) => indexValue,
  );
  const dsuRanks = new Uint32Array(edgeCount + 1);
  const nodeParents = new Int32Array(edgeCount + 1).fill(-1);

  let duplicateParentEdgeIndex = -1;
  let cycleFormingEdgeIndex = -1;

  function findRoot(nodeValue) {
    if (dsuRepresentatives[nodeValue] === nodeValue) {
      return nodeValue;
    }
    dsuRepresentatives[nodeValue] = findRoot(dsuRepresentatives[nodeValue]);
    return dsuRepresentatives[nodeValue];
  }

  function unionSets(nodeA, nodeB) {
    const rootA = findRoot(nodeA);
    const rootB = findRoot(nodeB);

    if (rootA === rootB) {
      return false;
    }

    if (dsuRanks[rootA] < dsuRanks[rootB]) {
      dsuRepresentatives[rootA] = rootB;
    } else if (dsuRanks[rootA] > dsuRanks[rootB]) {
      dsuRepresentatives[rootB] = rootA;
    } else {
      dsuRepresentatives[rootB] = rootA;
      dsuRanks[rootA]++;
    }
    return true;
  }

  edges.forEach(([sourceNode, targetNode], currentEdgeIndex) => {
    if (nodeParents[targetNode] !== -1) {
      duplicateParentEdgeIndex = currentEdgeIndex;
    } else {
      nodeParents[targetNode] = sourceNode;
      if (!unionSets(sourceNode, targetNode)) {
        cycleFormingEdgeIndex = currentEdgeIndex;
      }
    }
  });

  if (duplicateParentEdgeIndex === -1) {
    return edges[cycleFormingEdgeIndex];
  } else {
    if (cycleFormingEdgeIndex === -1) {
      return edges[duplicateParentEdgeIndex];
    } else {
      const conflictingTargetNode = edges[duplicateParentEdgeIndex][1];
      return [nodeParents[conflictingTargetNode], conflictingTargetNode];
    }
  }
};
