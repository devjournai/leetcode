/**
 * Shortest Path in a Weighted Tree
 * Intuition: Euler-tour the tree so a subtree is a contiguous in-time range. Distances from the root sit in a lazy segment tree; edge-weight updates add a delta to that subtree.
 * Approach: 1. Build the tree, DFS in/out times, parent, and root distances. 2. Point-set those distances in a range-add segment tree. 3. Type 1: add (new-old) weight on the child subtree. Type 2: query the current distance of x.
 * Dry Run: n=3, edges 1-2 w=2, 1-3 w=4. Query node 2 → 2. Update 1-2 to 5, query 2 → 5.
 * Time Complexity: O(N + Q log N)
 * Space Complexity: O(N + Q)
 */
var treeQueries = function (n, edges, queries) {
  class LazySegmentTree {
    constructor(size) {
      this.n = size;
      this.tree = new Array(4 * size).fill(0);
      this.lazy = new Array(4 * size).fill(0);
    }
    push(treeIndex, lo, hi) {
      if (this.lazy[treeIndex] === 0) return;
      this.tree[treeIndex] += this.lazy[treeIndex];
      if (lo !== hi) {
        this.lazy[2 * treeIndex + 1] += this.lazy[treeIndex];
        this.lazy[2 * treeIndex + 2] += this.lazy[treeIndex];
      }
      this.lazy[treeIndex] = 0;
    }
    addRange(l, r, val) {
      const rec = (treeIndex, lo, hi) => {
        this.push(treeIndex, lo, hi);
        if (r < lo || l > hi) return;
        if (l <= lo && hi <= r) {
          this.lazy[treeIndex] += val;
          this.push(treeIndex, lo, hi);
          return;
        }
        const mid = Math.floor((lo + hi) / 2);
        rec(2 * treeIndex + 1, lo, mid);
        rec(2 * treeIndex + 2, mid + 1, hi);
      };
      rec(0, 0, this.n - 1);
    }
    query(i) {
      const rec = (treeIndex, lo, hi) => {
        this.push(treeIndex, lo, hi);
        if (lo === hi) return this.tree[treeIndex];
        const mid = Math.floor((lo + hi) / 2);
        if (i <= mid) return rec(2 * treeIndex + 1, lo, mid);
        return rec(2 * treeIndex + 2, mid + 1, hi);
      };
      return rec(0, 0, this.n - 1);
    }
  }

  const tree = new LazySegmentTree(n);
  const answer = [];
  const graph = Array.from({ length: n + 1 }, () => []);
  const edgeWeights = new Map();
  const edgeKey = (u, v) => `${Math.min(u, v)},${Math.max(u, v)}`;

  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
    edgeWeights.set(edgeKey(u, v), w);
  }

  const inTime = new Array(n + 1).fill(0);
  const outTime = new Array(n + 1).fill(0);
  const dist = new Array(n + 1).fill(0);
  const parent = new Array(n + 1).fill(0);
  let time = 0;

  const dfs = (u, prev) => {
    inTime[u] = time++;
    for (const [v, w] of graph[u]) {
      if (v === prev) continue;
      dist[v] = dist[u] + w;
      parent[v] = u;
      dfs(v, u);
    }
    outTime[u] = time - 1;
  };

  dfs(1, -1);
  for (let i = 1; i <= n; i++) {
    tree.addRange(inTime[i], inTime[i], dist[i]);
  }

  for (const query of queries) {
    if (query[0] === 1) {
      const u = query[1];
      const v = query[2];
      const newWeight = query[3];
      const key = edgeKey(u, v);
      const oldWeight = edgeWeights.get(key);
      const delta = newWeight - oldWeight;
      edgeWeights.set(key, newWeight);
      const child = parent[v] === u ? v : u;
      tree.addRange(inTime[child], outTime[child], delta);
    } else {
      const x = query[1];
      answer.push(tree.query(inTime[x]));
    }
  }

  return answer;
};
