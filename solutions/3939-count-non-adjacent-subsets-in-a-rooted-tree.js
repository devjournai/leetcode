/**
 * Count Non Adjacent Subsets in a Rooted Tree
 * Intuition: Tree DP: for each subtree, count subsets by residue mod k, split into taking the root or not (if take, children cannot take their roots).
 * Approach: 1. Build children from parent. 2. DFS returning two arrays take/not of size k. 3. Combine with convolution. 4. Sum residues 0 excluding empty.
 * Dry Run: Input: parent = [-1,0,1], nums = [1,2,3], k = 3. Output: 1.
 * Time Complexity: O(N K^2)
 * Space Complexity: O(N K)
 */
var countValidSubsets = function (parent, nums, k) {
  const MOD = 1000000007;
  const n = parent.length;
  const g = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) g[parent[i]].push(i);
  const dfs = (u) => {
    let none = Array(k).fill(0);
    none[0] = 1;
    for (const v of g[u]) {
      const [ct, cn] = dfs(v);
      const child = ct.map((a, i) => (a + cn[i]) % MOD);
      const nxt = Array(k).fill(0);
      for (let a = 0; a < k; a++)
        if (none[a]) {
          for (let b = 0; b < k; b++)
            nxt[(a + b) % k] = (nxt[(a + b) % k] + none[a] * child[b]) % MOD;
        }
      none = nxt;
    }
    const take = Array(k).fill(0);
    const r = nums[u] % k;
    let takeNone = Array(k).fill(0);
    takeNone[0] = 1;
    for (const v of g[u]) {
      const [, cn] = dfs(v);
      const nxt = Array(k).fill(0);
      for (let a = 0; a < k; a++)
        if (takeNone[a]) {
          for (let b = 0; b < k; b++)
            nxt[(a + b) % k] = (nxt[(a + b) % k] + takeNone[a] * cn[b]) % MOD;
        }
      takeNone = nxt;
    }
    for (let a = 0; a < k; a++) take[(a + r) % k] = takeNone[a];
    return [take, none];
  };
  const cache = new Map();
  const dfsMemo = (u) => {
    if (cache.has(u)) return cache.get(u);
    let none = Array(k).fill(0);
    none[0] = 1;
    const childRes = g[u].map(dfsMemo);
    for (const [ct, cn] of childRes) {
      const child = Array(k);
      for (let i = 0; i < k; i++) child[i] = (ct[i] + cn[i]) % MOD;
      const nxt = Array(k).fill(0);
      for (let a = 0; a < k; a++)
        if (none[a]) {
          for (let b = 0; b < k; b++)
            if (child[b])
              nxt[(a + b) % k] = (nxt[(a + b) % k] + none[a] * child[b]) % MOD;
        }
      none = nxt;
    }
    let takeNone = Array(k).fill(0);
    takeNone[0] = 1;
    for (const [, cn] of childRes) {
      const nxt = Array(k).fill(0);
      for (let a = 0; a < k; a++)
        if (takeNone[a]) {
          for (let b = 0; b < k; b++)
            if (cn[b])
              nxt[(a + b) % k] = (nxt[(a + b) % k] + takeNone[a] * cn[b]) % MOD;
        }
      takeNone = nxt;
    }
    const take = Array(k).fill(0);
    const r = nums[u] % k;
    for (let a = 0; a < k; a++) take[(a + r) % k] = takeNone[a];
    const res = [take, none];
    cache.set(u, res);
    return res;
  };
  const [take, none] = dfsMemo(0);
  let ans = (take[0] + none[0] - 1) % MOD;
  if (ans < 0) ans += MOD;
  return ans;
};
