/**
 * Minimum Moves to Balance Circular Array II
 * Intuition: Let n be the length of balance. If the sum of all balances is negative, it is impossible to make everyone's balance non-negative, so we return -1 directly.
 * Approach: Let n be the length of balance. If the sum of all balances is negative, it is impossible to make everyone's balance non-negative, so we return -1 directly. Otherwise, we model the problem as a minimum cost flow problem: - Create a source s and a sink t; - For each person i with balance[i] > 0 (a surplus), add an edge from s to i with capacity balance[i] and unit cost 0; - For each person i with balance[i] < 0 (a deficit), add an edge from i to t with capacity -balance[i] and unit cost 0; - For each i, add an edge from i to each of its two neighbors with infinite capacity and unit cost 1, representing that transferring 1 unit of balance to a neighbor takes 1 move.
 * Dry Run: Input: balance = [-1,2,-1]. Output: 2.
 * Time Complexity: O(n^3)
 * Space Complexity: O(n)
 */
class Edge {
  constructor(to, cap, cost, rev) {
    this.to = to;
    this.cap = cap;
    this.cost = cost;
    this.rev = rev;
  }
}

class MinCostMaxFlow {
  static INF = 1e9;

  constructor(n) {
    this.n = n;
    this.graph = Array.from({ length: n }, () => []);
  }

  addEdge(u, v, cap, cost) {
    this.graph[u].push(new Edge(v, cap, cost, this.graph[v].length));

    this.graph[v].push(new Edge(u, 0, -cost, this.graph[u].length - 1));
  }

  minCostFlow(source, sink, maxFlow) {
    let totalCost = 0;
    let currentFlow = 0;

    while (currentFlow < maxFlow) {
      const dist = new Array(this.n).fill(MinCostMaxFlow.INF);

      const parentNode = new Array(this.n).fill(-1);

      const parentEdge = new Array(this.n).fill(-1);

      const inQueue = new Array(this.n).fill(false);

      const queue = [];

      queue.push(source);
      dist[source] = 0;
      inQueue[source] = true;

      let head = 0;

      while (head < queue.length) {
        const u = queue[head++];
        inQueue[u] = false;

        for (let i = 0; i < this.graph[u].length; i++) {
          const e = this.graph[u][i];

          if (e.cap > 0 && dist[e.to] > dist[u] + e.cost) {
            dist[e.to] = dist[u] + e.cost;
            parentNode[e.to] = u;
            parentEdge[e.to] = i;

            if (!inQueue[e.to]) {
              inQueue[e.to] = true;
              queue.push(e.to);
            }
          }
        }
      }

      if (dist[sink] === MinCostMaxFlow.INF) {
        return -1;
      }

      let pushFlow = maxFlow - currentFlow;

      for (let cur = sink; cur !== source; cur = parentNode[cur]) {
        const e = this.graph[parentNode[cur]][parentEdge[cur]];
        pushFlow = Math.min(pushFlow, e.cap);
      }

      for (let cur = sink; cur !== source; cur = parentNode[cur]) {
        const p = parentNode[cur];
        const idx = parentEdge[cur];

        const e = this.graph[p][idx];

        e.cap -= pushFlow;
        this.graph[cur][e.rev].cap += pushFlow;
      }

      currentFlow += pushFlow;
      totalCost += pushFlow * dist[sink];
    }

    return totalCost;
  }
}

var minMoves = function (balance) {
  let totalBalance = 0;
  let totalDeficit = 0;

  for (const x of balance) {
    totalBalance += x;
    if (x < 0) {
      totalDeficit += -x;
    }
  }

  if (totalBalance < 0) {
    return -1;
  }

  if (totalDeficit === 0) {
    return 0;
  }

  const n = balance.length;

  const source = n;
  const sink = n + 1;

  const mcmf = new MinCostMaxFlow(n + 2);

  for (let i = 0; i < n; i++) {
    if (balance[i] > 0) {
      mcmf.addEdge(source, i, balance[i], 0);
    } else if (balance[i] < 0) {
      mcmf.addEdge(i, sink, -balance[i], 0);
    }

    mcmf.addEdge(i, (i + 1) % n, MinCostMaxFlow.INF, 1);

    mcmf.addEdge(i, (i - 1 + n) % n, MinCostMaxFlow.INF, 1);
  }

  return mcmf.minCostFlow(source, sink, totalDeficit);
};
