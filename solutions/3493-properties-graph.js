/**
 * Properties Graph
 * Intuition: Nodes are property arrays. An edge exists when the intersection of distinct values has size at least k. Connected components of that graph are the answer, so union-find on intersecting pairs is enough.
 * Approach: 1. Convert each property list to a set. 2. For every pair i < j, if |set_i ∩ set_j| >= k, union i and j. 3. Return the number of components.
 * Dry Run: properties = [[1,2],[2,3],[3,4]], k = 1.
 *   - 0-1 share 2, 1-2 share 3 → one component. k = 2 → no pair shares two values → 3 components.
 * Time Complexity: O(N^2 * M)
 * Space Complexity: O(N * M)
 */
var numberOfComponents = function (properties, k) {
  const n = properties.length;
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  let componentCount = n;

  const find = (u) => {
    if (parent[u] !== u) {
      parent[u] = find(parent[u]);
    }
    return parent[u];
  };

  const unionByRank = (u, v) => {
    const i = find(u);
    const j = find(v);
    if (i === j) {
      return;
    }
    if (rank[i] < rank[j]) {
      parent[i] = j;
    } else if (rank[i] > rank[j]) {
      parent[j] = i;
    } else {
      parent[i] = j;
      rank[j]++;
    }
    componentCount--;
  };

  const propertySets = properties.map((property) => new Set(property));

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let intersectionSize = 0;
      for (const value of propertySets[i]) {
        if (propertySets[j].has(value)) {
          intersectionSize++;
        }
      }
      if (intersectionSize >= k) {
        unionByRank(i, j);
      }
    }
  }

  return componentCount;
};
