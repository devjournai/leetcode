/**
 * Pythagorean Distance Nodes in a Tree
 * Intuition: We first construct an adjacency list $g$ based on the edges given in the problem, where $g[u]$ stores all nodes adjacent to node $u$. Next, we define a function $\text{bfs}(i)$ to calculate the distances from node $i$ to all other nodes. We use a queue to implement Breadth-First Search (BFS) and maintain a distance array $\text{dist}$, where $\text{dist}[j]$ represents the distance from node $i$ to node $j$. Initially, $\text{dist}[i] = 0$, and the distances to all other nodes are set to infinity. During the BFS process, we continuously update the distance array until all reachable nodes have been traversed. We call $\text{bfs}(x)$, $\text{bfs}(y)$, and $\text{bfs}(z)$ to calculate the distances from nodes $x$, $y$, and $z$ to all other nodes, obtaining three distance arrays $d_1$, $d_2$, and $d_3$ respectively. Finally, we iterate through all nodes $u$. For each node, we retrieve its di...
 * Approach: We first construct an adjacency list $g$ based on the edges given in the problem, where $g[u]$ stores all nodes adjacent to node $u$. Next, we define a function $\text{bfs}(i)$ to calculate the distances from node $i$ to all other nodes. We use a queue to implement Breadth-First Search (BFS) and maintain a distance array $\text{dist}$, where $\text{dist}[j]$ represents the distance from node $i$ to node $j$. Initially, $\text{dist}[i] = 0$, and the distances to all other nodes are set to infinity. During the BFS process, we continuously update the distance array until all reachable nodes have been traversed. We call $\text{bfs}(x)$, $\text{bfs}(y)$, and $\text{bfs}(z)$ to calculate the distances from nodes $x$, $y$, and $z$ to all other nodes, obtaining three distance arrays $d_1$, $d_2$, and $d_3$ respectively. Finally, we iterate through all nodes $u$. For each node, we retrieve its di...
 * Dry Run: Input: n = 4, edges = [[0,1],[0,2],[0,3]], x = 1, y = 2, z = 3 => Output: 3
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var specialNodes = function (n, edges, x, y, z) {
  const g = Array.from({ length }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    g[v].push(u);
  }

  const inf = 1e9;

  const bfs = (i) => {
    const dist = Array(n).fill(inf);
    let q = [i];
    dist[i] = 0;
    while (q.length) {
      const nq = [];
      for (const u of q) {
        for (const v of g[u]) {
          if (dist[v] > dist[u] + 1) {
            dist[v] = dist[u] + 1;
            nq.push(v);
          }
        }
      }
      q = nq;
    }
    return dist;
  };

  const d1 = bfs(x);
  const d2 = bfs(y);
  const d3 = bfs(z);

  let ans = 0;
  for (let i = 0; i < n; i++) {
    const a = [d1[i], d2[i], d3[i]];
    a.sort((p, q) => p - q);
    if (a[0] * a[0] + a[1] * a[1] === a[2] * a[2]) {
      ans++;
    }
  }
  return ans;
};
