/**
 * Modify Graph Edge Weights
 *
 * Intuition:
 * Only the edges with weight -1 can be modified.
 *
 * We first determine whether reaching the target is possible.
 *
 * Then, while processing the -1 edges, we gradually assign weights so that
 * the shortest path becomes exactly equal to the target.
 *
 * Dijkstra's algorithm is repeatedly used to verify the current shortest path.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Replace every -1 edge with INF.
 *
 * 2. Run Dijkstra.
 *
 *      If shortest distance < target,
 *      it is impossible because fixed edges already produce a path
 *      shorter than the target.
 *
 * 3. Replace every -1 edge with weight 1 one by one.
 *
 *      After changing an edge,
 *      run Dijkstra again.
 *
 *      If the shortest distance becomes <= target,
 *      increase this edge by
 *
 *          target - currentDistance
 *
 *      so that the shortest path becomes exactly target.
 *
 *      Mark the graph as finished.
 *
 * 4. After the target is achieved,
 *      set every remaining -1 edge to INF.
 *
 * 5. Verify using one final Dijkstra.
 *
 *      If shortest distance equals target,
 *      return the modified edges.
 *
 *      Otherwise return [].
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * Suppose
 *
 * target = 8
 *
 * First -1 edge becomes
 *
 * 1
 *
 * Dijkstra gives
 *
 * distance = 5
 *
 * Increase this edge by
 *
 * 8 - 5 = 3
 *
 * Final weight:
 *
 * 4
 *
 * Remaining -1 edges become INF.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(M × (N²))
 * Space Complexity: O(N + M)
 */
var modifiedGraphEdges = function (n, edges, source, destination, target) {
  const INF = 2000000000;
  const graph = Array.from({ length: n }, () => []);

  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    graph[u].push([v, i]);
    graph[v].push([u, i]);
  }

  const dist = new Array(n);
  const visited = new Array(n);

  const dijkstra = () => {
    dist.fill(Infinity);
    visited.fill(false);
    dist[source] = 0;

    for (let i = 0; i < n; i++) {
      let u = -1;

      for (let j = 0; j < n; j++) {
        if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
          u = j;
        }
      }

      if (u === -1 || dist[u] === Infinity) {
        break;
      }

      visited[u] = true;

      for (const [v, edgeIndex] of graph[u]) {
        const w = edges[edgeIndex][2];
        if (dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
        }
      }
    }

    return dist[destination];
  };

  const modifiable = [];
  for (let i = 0; i < edges.length; i++) {
    if (edges[i][2] === -1) {
      edges[i][2] = INF;
      modifiable.push(i);
    }
  }

  let distance = dijkstra();

  if (distance < target) {
    return [];
  }

  let finished = distance === target;

  for (const edgeIndex of modifiable) {
    if (finished) {
      continue;
    }

    edges[edgeIndex][2] = 1;
    distance = dijkstra();

    if (distance <= target) {
      edges[edgeIndex][2] += target - distance;
      finished = true;
    }
  }

  if (!finished) {
    return [];
  }

  return edges;
};
