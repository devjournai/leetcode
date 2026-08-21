/**
 * Number Of Connected Components In An Undirected Graph
 * Intuition: Start with n isolated nodes. Each edge that links two different roots merges components; the remaining root count is the answer. Path compression keeps finds cheap.
 * Approach: 1. parent[i] = i and numberOfComponents = n. 2. findRoot recurses to the root and compresses the path. 3. uniteSets links rootA to rootB and decrements the count when they differ. 4. Unite every edge; return numberOfComponents.
 * Dry Run: n = 5, edges = [[0, 1], [1, 2], [3, 4]].
 *   - Start 5. Unite 0-1 → 4, 1-2 → 3, 3-4 → 2.
 *   - Return 2.
 * Time Complexity: O(N + M * α(N))
 * Space Complexity: O(N)
 */
var countComponents = function (n, edges) {
  const parentCollection = new Array(n);
  let numberOfComponents = n;
  const totalNodes = n;

  for (let currentIdx = 0; currentIdx < totalNodes; ++currentIdx) {
    parentCollection[currentIdx] = currentIdx;
  }

  function findRoot(seekingNode) {
    if (parentCollection[seekingNode] === seekingNode) {
      return seekingNode;
    }
    parentCollection[seekingNode] = findRoot(parentCollection[seekingNode]);
    return parentCollection[seekingNode];
  }

  function uniteSets(nodeOne, nodeTwo) {
    const rootOfA = findRoot(nodeOne);
    const rootOfB = findRoot(nodeTwo);

    if (rootOfA !== rootOfB) {
      parentCollection[rootOfA] = rootOfB;
      numberOfComponents--;
    }
  }

  const graphConnections = edges;

  for (const [vertexA, vertexB] of graphConnections) {
    uniteSets(vertexA, vertexB);
  }

  return numberOfComponents;
};
