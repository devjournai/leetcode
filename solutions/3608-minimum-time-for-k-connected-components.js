/**
 * Minimum Time for K Connected Components
 * Intuition: After time t, edges with time <= t are gone. The smallest t that leaves at least k components is the first edge (by increasing time, Kruskal in reverse) whose inclusion would drop the component count below k.
 * Approach: 1. Sort edges by time. 2. Union from latest to earliest starting with n components. 3. When a union would make components < k, return that edge's time. 4. If the graph already has >= k components, return 0.
 * Dry Run: n = 2, edges [[0,1,3]], k = 2. The only edge's time 3 is the moment the graph splits.
 * Time Complexity: O(m log m)
 * Space Complexity: O(n)
 */
var minTime = function (n, edges, k) {
  edges.sort((left, right) => left[2] - right[2]);

  const parent = Array.from({ length: n }, (_, index) => index);
  const size = Array(n).fill(1);

  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  const union = (left, right) => {
    let rootLeft = find(left);
    let rootRight = find(right);
    if (rootLeft === rootRight) {
      return false;
    }
    if (size[rootLeft] > size[rootRight]) {
      parent[rootRight] = rootLeft;
      size[rootLeft] += size[rootRight];
    } else {
      parent[rootLeft] = rootRight;
      size[rootRight] += size[rootLeft];
    }
    return true;
  };

  let components = n;
  for (let index = edges.length - 1; index >= 0; index--) {
    const [from, to, time] = edges[index];
    if (union(from, to)) {
      if (--components < k) {
        return time;
      }
    }
  }

  return 0;
};
