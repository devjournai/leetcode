/**
 * Maximize Sum of Weights after Edge Removals
 * Intuition: Degree of every node must be ≤ k. For each node we may keep at most k child edges. Keeping edge `(u,v)` of weight `w` is worth `w + (child with k-1 slots) - (child with k slots)`; take the best such gains.
 * Approach: 1. Build the undirected weighted tree. 2. DFS returns `[sumWithAtMostKMinus1, sumWithAtMostK]`. 3. Always take each child's k-budget sum, then add the top `k` (or `k-1`) nonnegative keep-gains. 4. Answer is the k-budget sum at the root.
 * Dry Run: Star of 3 edges weights 1,2,3 and k=1. Root keeps only the 3, children keep nothing extra. Answer 3.
 * Time Complexity: O(N log K)
 * Space Complexity: O(N)
 */
var maximizeSumOfWeights = function (edges, k) {
  const nodeCount = edges.length + 1;
  const graph = Array.from({ length: nodeCount }, () => []);
  for (const [nodeU, nodeV, weight] of edges) {
    graph[nodeU].push([nodeV, weight]);
    graph[nodeV].push([nodeU, weight]);
  }

  const dfs = (node, parent) => {
    let weightSum = 0;
    const keepGains = [];

    for (const [neighbor, edgeWeight] of graph[node]) {
      if (neighbor === parent) {
        continue;
      }
      const [childKMinus1, childK] = dfs(neighbor, node);
      weightSum += childK;
      keepGains.push(Math.max(0, childKMinus1 - childK + edgeWeight));
    }

    keepGains.sort((gainA, gainB) => gainB - gainA);
    let topKMinus1 = 0;
    let topK = 0;
    for (let index = 0; index < keepGains.length && index < k; index++) {
      if (index < k - 1) {
        topKMinus1 += keepGains[index];
      }
      topK += keepGains[index];
    }

    return [weightSum + topKMinus1, weightSum + topK];
  };

  return dfs(0, -1)[1];
};
