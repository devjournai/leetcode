/**
 * Minimum Cost to Buy Apples II
 * Intuition: Buy locally or travel empty then return carrying apples with tax on the return. That is min over j of dist_empty(i,j)+dist_loaded(j,i)+prices[j].
 * Approach: 1. Dijkstra from every shop with empty weights (cost) and with loaded weights (cost*tax). 2. ans[i] = min_j empty[i][j]+loaded[j][i]+prices[j].
 * Dry Run: Input: n = 2, prices = [8,3], roads = [[0,1,1,2]]. Output: [6,3].
 * Time Complexity: O(N^2 log N + N M log N)
 * Space Complexity: O(N^2)
 */
var minCost = function (n, prices, roads) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v, c, t] of roads) {
    g[u].push([v, c, t]);
    g[v].push([u, c, t]);
  }
  const dijk = (src, loaded) => {
    const dist = Array(n).fill(Infinity);
    dist[src] = 0;
    const used = Array(n).fill(false);
    for (let it = 0; it < n; it++) {
      let u = -1;
      for (let i = 0; i < n; i++)
        if (!used[i] && (u < 0 || dist[i] < dist[u])) u = i;
      if (u < 0 || dist[u] === Infinity) break;
      used[u] = true;
      for (const [v, c, t] of g[u]) {
        const w = loaded ? c * t : c;
        if (dist[v] > dist[u] + w) dist[v] = dist[u] + w;
      }
    }
    return dist;
  };
  const empty = Array.from({ length: n }, (_, i) => dijk(i, false));
  const loaded = Array.from({ length: n }, (_, i) => dijk(i, true));
  const ans = Array(n);
  for (let i = 0; i < n; i++) {
    let best = prices[i];
    for (let j = 0; j < n; j++)
      best = Math.min(best, empty[i][j] + loaded[j][i] + prices[j]);
    ans[i] = best;
  }
  return ans;
};
