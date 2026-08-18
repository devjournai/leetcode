/**
 * Minimum Cost Walk In Weighted Graph
 * Intuition: The cost of a walk is the bitwise AND of all edge weights traversed. Since adding more edges can only decrease or maintain the bitwise AND value (X & Y <= X), the minimum cost between two nodes in the same connected component is the bitwise AND of *all* edge weights present within that component. We can always construct a walk that effectively "includes" any edge within the component.
 * Approach: 1. Initialize a Disjoint Set Union (DSU) structure to track connected components and a value for each component representing the bitwise AND of all edges encountered so far within it. Each node initially belongs to its own component, with an "all bits set" initial cost (e.g., -1 or ~0 in JS for 32-bit AND). 2. Iterate through each edge: find the roots of the two connected nodes. If they are in different components, merge them by updating one's parent and ANDing their current component costs with the edge weight to get the new combined component cost. If they are already in the same component, simply AND the component's existing cost with the new edge weight. 3. After processing all edges, perform a final pass of path compression on all nodes to ensure `dsuParents[i]` points directly to the ultimate root of `i`'s component, making component cost lookups efficient. 4. For each query, check if the source and target nodes belong to the same connected component by comparing their final roots. If they are the same, return the stored minimum AND cost for that component; otherwise, return -1. For queries where source and target are the same node, the cost is 0.
 * Dry Run:
 * n = 3, edges = [[0, 1, 5], [1, 2, 3]], query = [[0, 2]]
 *
 * 1. Initialization:
 *    dsuParents = [0, 1, 2]
 *    componentAndCosts = [-1, -1, -1] (using ~0, which is -1 for 32-bit integer operations)
 *
 * 2. Process edge [0, 1, 5]:
 *    - findRoot(0) -> 0
 *    - findRoot(1) -> 1
 *    - Roots 0 and 1 are different.
 *    - dsuParents[0] = 1 (node 0's component merges into node 1's)
 *    - newCombinedCost = componentAndCosts[0] & componentAndCosts[1] & 5 = (-1) & (-1) & 5 = 5
 *    - componentAndCosts[1] = 5
 *    - componentAndCosts[0] = 5
 *    - State after edge 1:
 *      dsuParents = [1, 1, 2]
 *      componentAndCosts = [5, 5, -1]
 *
 * 3. Process edge [1, 2, 3]:
 *    - findRoot(1) -> 1
 *    - findRoot(2) -> 2
 *    - Roots 1 and 2 are different.
 *    - dsuParents[1] = 2 (node 1's component merges into node 2's)
 *    - newCombinedCost = componentAndCosts[1] & componentAndCosts[2] & 3 = (5) & (-1) & 3 = 1
 *    - componentAndCosts[2] = 1
 *    - componentAndCosts[1] = 1
 *    - State after edge 2:
 *      dsuParents = [1, 2, 2]
 *      componentAndCosts = [5, 1, 1]
 *
 * 4. Final Path Compression:
 *    - For nodeIndex = 0: dsuParents[0] = findRoot(0)
 *      - findRoot(0) calls findRoot(1), which calls findRoot(2). findRoot(2) returns 2.
 *      - findRoot(1) sets dsuParents[1]=2, returns 2.
 *      - findRoot(0) sets dsuParents[0]=2, returns 2.
 *    - For nodeIndex = 1: dsuParents[1] = findRoot(1) -> 2
 *    - For nodeIndex = 2: dsuParents[2] = findRoot(2) -> 2
 *    - Final dsuParents = [2, 2, 2]
 *
 * 5. Process query [0, 2]:
 *    - sourceNode = 0, targetNode = 2
 *    - sourceNode != targetNode (0 != 2)
 *    - sourceRoot = dsuParents[0] = 2
 *    - targetRoot = dsuParents[2] = 2
 *    - sourceRoot === targetRoot (2 === 2). They are connected.
 *    - Return componentAndCosts[sourceRoot] which is componentAndCosts[2] = 1.
 * Result: [1]
 *
 * Time Complexity: O((N + E + Q) * α(N))
 * Space Complexity: O(N)
 */
var minimumCost = function (n, edges, query) {
  const dsuParents = new Array(n)
    .fill(0)
    .map((_, initialIndex) => initialIndex);
  const componentAndCosts = new Array(n).fill(~0);

  function findRoot(vertexId) {
    if (dsuParents[vertexId] === vertexId) {
      return vertexId;
    }
    dsuParents[vertexId] = findRoot(dsuParents[vertexId]);
    return dsuParents[vertexId];
  }

  for (const edgeEntry of edges) {
    const [nodeA, nodeB, edgeWeightVal] = edgeEntry;
    const rootA = findRoot(nodeA);
    const rootB = findRoot(nodeB);

    if (rootA !== rootB) {
      dsuParents[rootA] = rootB;
      const newCombinedCost =
        componentAndCosts[rootA] & componentAndCosts[rootB] & edgeWeightVal;
      componentAndCosts[rootB] = newCombinedCost;
      componentAndCosts[rootA] = newCombinedCost;
    } else {
      componentAndCosts[rootA] = componentAndCosts[rootA] & edgeWeightVal;
    }
  }

  for (let nodeIndex = 0; nodeIndex < n; nodeIndex++) {
    dsuParents[nodeIndex] = findRoot(nodeIndex);
  }

  const queryResults = query.map((singleQuery) => {
    const [sourceNode, targetNode] = singleQuery;
    if (sourceNode === targetNode) {
      return 0;
    }

    const sourceRoot = dsuParents[sourceNode];
    const targetRoot = dsuParents[targetNode];

    if (sourceRoot === targetRoot) {
      return componentAndCosts[sourceRoot];
    } else {
      return -1;
    }
  });

  return queryResults;
};
