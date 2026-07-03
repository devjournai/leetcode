/**
 * Network Recovery Pathways
 * Intuition: The problem asks for the maximum of a minimum value (max path score, where path score is min edge-cost). This structure is a classic hint for binary search on the answer.
 * Approach:
 * 1. Define a `check(minEdgeScore)` function: This function determines if there exists at least one valid path from node 0 to node n-1 such that all edges on the path have a cost greater than or equal to `minEdgeScore`, and the total path cost does not exceed `k`.
 * 2. Implement `check(minEdgeScore)`:
 *    a. Create a subgraph containing only edges whose costs are `>= minEdgeScore`.
 *    b. Additionally, an edge `(u, v)` can only be used if `v` is a valid node to land on. A node `v` is valid if `v` is the target node `n-1` or if `online[v]` is `true`. (Node 0 is always online, and its status is handled by `dist[0] = 0`). Any path through an intermediate offline node is invalid.
 *    c. Since the graph is a DAG, we can find the shortest path in this filtered subgraph using dynamic programming with a topological sort (Kahn's algorithm).
 *       i. Initialize `dist[i] = Infinity` for all nodes `i`, and `dist[0] = 0`.
 *       ii. Compute in-degrees for all nodes based on the filtered edges (`currentAdj`).
 *       iii. Initialize a queue with all nodes that have an in-degree of 0.
 *       iv. Process nodes from the queue: For each `u` dequeued, if `dist[u]` is `Infinity`, it means `u` is unreachable from 0 or is an intermediate offline node, so we cannot extend paths from it, but still decrement in-degrees of its neighbors for topological sort completion. Otherwise, for each neighbor `v` of `u` (via an edge `(u, v, cost)` from `currentAdj`), update `dist[v] = min(dist[v], dist[u] + cost)`. Decrement `inDegree[v]`, and if `inDegree[v]` becomes 0, enqueue `v`.
 *       v. Finally, return `dist[n-1] <= k`.
 * 3. Binary Search: The possible range for `minEdgeScore` is `[0, 10^9]` (min and max possible edge costs). Perform a binary search in this range.
 *    a. If `check(mid)` is true, it means `mid` is a possible answer, so we store `mid` and try for a higher score (`left = mid + 1`).
 *    b. If `check(mid)` is false, `mid` is too high, so we need to reduce the score (`right = mid - 1`).
 * 4. Return the maximum `minEdgeScore` found, or -1 if no valid path exists (ans remains -1).
 *
 * Time Complexity: O((N + M) * log(MAX_COST))
 * Space Complexity: O(N + M)
 */
var findMaxPathScore = function (edges, online, k) {
  const n = online.length;

  const graph = Array.from({ length: n }, () => []);

  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
  }

  let left = 0;
  let right = 1000000000;
  let answer = -1;

  const check = (limit) => {
    const indegree = new Int32Array(n);
    const dist = new Float64Array(n);

    for (let i = 0; i < n; i++) {
      dist[i] = Infinity;
    }

    dist[0] = 0;

    for (let u = 0; u < n; u++) {
      for (const [v, w] of graph[u]) {
        if (w >= limit && (v === n - 1 || online[v])) {
          indegree[v]++;
        }
      }
    }

    const queue = new Int32Array(n);
    let head = 0;
    let tail = 0;

    for (let i = 0; i < n; i++) {
      if (indegree[i] === 0) {
        queue[tail++] = i;
      }
    }

    while (head < tail) {
      const u = queue[head++];

      for (const [v, w] of graph[u]) {
        if (w < limit) continue;
        if (v !== n - 1 && !online[v]) continue;

        if (dist[u] !== Infinity) {
          const nd = dist[u] + w;
          if (nd < dist[v]) {
            dist[v] = nd;
          }
        }

        indegree[v]--;

        if (indegree[v] === 0) {
          queue[tail++] = v;
        }
      }
    }

    return dist[n - 1] <= k;
  };

  while (left <= right) {
    const mid = (left + right) >> 1;

    if (check(mid)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
};
