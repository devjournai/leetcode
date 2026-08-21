/**
 * Distinct Gate Paths to LCA
 * Intuition: Count gate sequences from a node to LCA independently then multiply. XOR answers. Use binary lifting for LCA and product of gate choices along the path with card color DP (2 states).
 * Approach: 1. Binary lifting + depth. 2. For each query, LCA, multiply ways Alice * ways Bob along unique gates with color transitions: red stays with red, white flips. 3. XOR.
 * Dry Run: Queries of start nodes and cards.
 * Time Complexity: O(N log N + Q log N)
 * Space Complexity: O(N log N)
 */
var xorGateWays = function (parent, gates, queries) {
  const MOD = 1000000007n;
  const n = parent.length;
  const depth = Array(n).fill(0);
  for (let i = 1; i < n; i++) depth[i] = depth[parent[i]] + 1;
  const LOG = 12;
  const up = Array.from({ length: n }, () => Array(LOG).fill(-1));
  for (let i = 0; i < n; i++) up[i][0] = parent[i];
  for (let j = 1; j < LOG; j++)
    for (let i = 0; i < n; i++) {
      const p = up[i][j - 1];
      up[i][j] = p < 0 ? -1 : up[p][j - 1];
    }
  const lca = (a, b) => {
    if (depth[a] < depth[b]) [a, b] = [b, a];
    let dh = depth[a] - depth[b];
    for (let j = 0; j < LOG; j++) if ((dh >> j) & 1) a = up[a][j];
    if (a === b) return a;
    for (let j = LOG - 1; j >= 0; j--)
      if (up[a][j] !== up[b][j]) {
        a = up[a][j];
        b = up[b][j];
      }
    return parent[a];
  };
  const waysTo = (u, anc, card) => {
    if (u === anc) return 1n;
    let ways = 1n,
      c = card;
    while (u !== anc) {
      const [red, blue, white] = gates[u];
      const stay = c === 1 ? red : blue;
      const choices = stay + white;
      if (choices === 0) return 0n;
      ways = (ways * BigInt(choices)) % MOD;
      u = parent[u];
    }
    return ways;
  };
  let xor = 0n;
  for (const [aNode, aCard, bNode, bCard] of queries) {
    const L = lca(aNode, bNode);
    const w = (waysTo(aNode, L, aCard) * waysTo(bNode, L, bCard)) % MOD;
    xor ^= w;
  }
  return Number(xor);
};
