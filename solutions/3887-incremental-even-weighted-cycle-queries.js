/**
 * Incremental Even-Weighted Cycle Queries
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: n = 3, edges = [[0,1,1],[1,2,1],[0,2,1]] => Output: 2
 * Time Complexity: O(E α(N))
 * Space Complexity: O(N)
 */
var maxNumEdges = function (n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const parity = new Array(n).fill(0);
  const find = (x) => {
    if (parent[x] !== x) {
      const p = parent[x];
      parent[x] = find(p);
      parity[x] ^= parity[p];
    }
    return parent[x];
  };
  let ans = 0;
  for (const [u, v, w] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru === rv) {
      if ((parity[u] ^ parity[v]) === w) ans++;
    } else {
      parent[rv] = ru;
      parity[rv] = parity[u] ^ parity[v] ^ w;
      ans++;
    }
  }
  return ans;
};
