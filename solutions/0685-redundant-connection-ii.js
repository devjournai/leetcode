/**
 * Redundant Connection II
 * Intuition: A rooted tree plus one extra directed edge either creates two parents, a cycle, or both. Skip union on the later two-parent edge; then pick that edge, the cycle edge, or the earlier parent of the two-parent node.
 * Approach: 1. Track `nodeParents`. 2. If a node already has a parent, set `duplicateParentEdgeIndex` and skip union; else union and set `cycleFormingEdgeIndex` on failure. 3. No duplicate → cycle edge. Duplicate and no cycle → that later edge. Both → `[nodeParents[target], target]` of the duplicate.
 * Dry Run: edges=[[1,2],[1,3],[2,3]]. Node 3 gets a second parent at index 2; unions of first two succeed. cycle=-1 → return [2,3].
 * Time Complexity: O(N * α(N))
 * Space Complexity: O(N)
 */
var findRedundantDirectedConnection = function (edges) {
  const edgeCount = edges.length;

  const dsuRepresentatives = Array.from(
    { length: edgeCount + 1 },
    (_, indexValue) => indexValue
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
