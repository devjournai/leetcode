/**
 * Design Graph With Shortest Path Calculator
 *
 * Intuition:
 * Since:
 *
 *      n ≤ 100
 *
 * we can preprocess the shortest distance between every pair of vertices
 * using the Floyd-Warshall algorithm.
 *
 * When a new edge is added, instead of recomputing Floyd-Warshall from scratch,
 * we update every shortest path that can improve by passing through the new edge.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * Constructor:
 *
 * 1. Create a distance matrix.
 *
 *      dist[i][j]
 *
 *      Initialize:
 *
 *          Infinity
 *
 *      and
 *
 *          dist[i][i] = 0
 *
 * 2. Insert every edge.
 *
 * 3. Run Floyd-Warshall.
 *
 *      For every intermediate node k:
 *
 *          dist[i][j] =
 *              min(
 *                  dist[i][j],
 *                  dist[i][k] + dist[k][j]
 *              )
 *
 * -----------------------------------------------------------------------
 *
 * addEdge(edge):
 *
 * Suppose the new edge is:
 *
 *      u → v
 *
 *      cost = w
 *
 * Every improved shortest path must use this new edge exactly once.
 *
 * Therefore update:
 *
 *      dist[i][j]
 *      =
 *      min(
 *          dist[i][j],
 *          dist[i][u] + w + dist[v][j]
 *      )
 *
 * for every pair (i,j).
 *
 * -----------------------------------------------------------------------
 *
 * shortestPath(node1,node2):
 *
 * Return:
 *
 *      dist[node1][node2]
 *
 * If unreachable,
 * return -1.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 4
 *
 * edges:
 *
 * 0→2 (5)
 * 0→1 (2)
 * 1→2 (1)
 * 3→0 (3)
 *
 * Floyd-Warshall computes:
 *
 * 3→2
 *
 * =
 *
 * 3→0→1→2
 *
 * =
 *
 * 6
 *
 * Add:
 *
 * 1→3 (4)
 *
 * Update:
 *
 * 0→3
 *
 * =
 *
 * 0→1→3
 *
 * =
 *
 * 6
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(1)
 * Space Complexity: O(N²)
 */

var Graph = function (n, edges) {
  this.n = n;

  this.dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    this.dist[i][i] = 0;
  }

  for (const [u, v, w] of edges) {
    this.dist[u][v] = w;
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (this.dist[i][k] === Infinity || this.dist[k][j] === Infinity) {
          continue;
        }

        this.dist[i][j] = Math.min(
          this.dist[i][j],
          this.dist[i][k] + this.dist[k][j]
        );
      }
    }
  }
};

Graph.prototype.addEdge = function (edge) {
  const [u, v, w] = edge;

  if (w >= this.dist[u][v]) {
    return;
  }

  this.dist[u][v] = w;

  const n = this.n;

  for (let i = 0; i < n; i++) {
    if (this.dist[i][u] === Infinity) {
      continue;
    }

    for (let j = 0; j < n; j++) {
      if (this.dist[v][j] === Infinity) {
        continue;
      }

      this.dist[i][j] = Math.min(
        this.dist[i][j],
        this.dist[i][u] + w + this.dist[v][j]
      );
    }
  }
};

Graph.prototype.shortestPath = function (node1, node2) {
  return this.dist[node1][node2] === Infinity ? -1 : this.dist[node1][node2];
};
