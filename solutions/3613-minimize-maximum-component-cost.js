/**
 * Minimize Maximum Component Cost
 * Intuition: Component cost is its heaviest remaining edge. To have at most k components, Kruskal-add cheapest edges until n-k unions happen; that last weight is the minimized max cost.
 * Approach: 1. If k === n return 0. 2. Sort edges by weight. 3. Union until the component count is <= k and return that edge's weight. 4. Isolated vertices cost 0.
 * Dry Run: n = 5, edges weights 2,3,4,6, k = 2. After keeping 2,3,4 we have 2 components and max cost 4.
 * Time Complexity: O(m log m)
 * Space Complexity: O(n)
 */
var minCost = function (n, edges, k) {
  if (k === n) {
    return 0;
  }

  const parent = Array.from({ length: n }, (_, index) => index);
  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  edges.sort((left, right) => left[2] - right[2]);
  let components = n;

  for (const [from, to, weight] of edges) {
    const rootFrom = find(from);
    const rootTo = find(to);
    if (rootFrom !== rootTo) {
      parent[rootFrom] = rootTo;
      if (--components <= k) {
        return weight;
      }
    }
  }

  return 0;
};
