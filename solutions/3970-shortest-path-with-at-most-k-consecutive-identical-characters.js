/**
 * Shortest Path With At Most K Consecutive Identical Characters
 * Intuition: Dijkstra on (node, runLength of current label).
 * Approach: State (u, run) min weight. Transition to v: if labels equal run+1 else 1, skip if run>k.
 * Dry Run: Input: n=3, labels=aab, k=1. Output: 3.
 * Time Complexity: O((N K + M K) log)
 * Space Complexity: O(N K)
 */
var shortestPath = function (n, edges, labels, k) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) g[u].push([v, w]);
  const inf = 1e18;
  const dist = Array.from({ length: n }, () => Array(k + 2).fill(inf));
  dist[0][1] = 0;
  const pq = [[0, 0, 1]];
  const push = (d, u, r) => {
    pq.push([d, u, r]);
    let i = pq.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (pq[p][0] <= pq[i][0]) break;
      [pq[p], pq[i]] = [pq[i], pq[p]];
      i = p;
    }
  };
  const pop = () => {
    const t = pq[0];
    const last = pq.pop();
    if (pq.length) {
      pq[0] = last;
      let i = 0;
      while (true) {
        let s = i,
          l = i * 2 + 1,
          r = l + 1;
        if (l < pq.length && pq[l][0] < pq[s][0]) s = l;
        if (r < pq.length && pq[r][0] < pq[s][0]) s = r;
        if (s === i) break;
        [pq[s], pq[i]] = [pq[i], pq[s]];
        i = s;
      }
    }
    return t;
  };
  pq.length = 0;
  push(0, 0, 1);
  while (pq.length) {
    const [d, u, run] = pop();
    if (d !== dist[u][run]) continue;
    if (u === n - 1) return d;
    for (const [v, w] of g[u]) {
      const nr = labels[v] === labels[u] ? run + 1 : 1;
      if (nr > k) continue;
      if (dist[v][nr] > d + w) {
        dist[v][nr] = d + w;
        push(d + w, v, nr);
      }
    }
  }
  return -1;
};
