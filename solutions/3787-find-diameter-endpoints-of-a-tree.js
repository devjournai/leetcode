/**
 * Find Diameter Endpoints of a Tree
 * Intuition: We first convert the array \text{edges} into an adjacency list representation of an undirected graph, where g[u] represents all nodes adjacent to node u.
 * Approach: Next, we can use Breadth-First Search (BFS) to find the diameter endpoints of the tree. The specific steps are as follows: 1. Starting from any node (e.g., node 0), use BFS to find the farthest node a from that node. 2. Starting from node a, use BFS again to find the farthest node b from node a, as well as the distance array \text{dist1} from node a to all other nodes. 3. Starting from node b, use BFS to find the distance array \text{dist2} from node b to all other nodes. 4. The diameter length of the tree is \text{dist1}[b]. For each node i, if \text{dist1}[i] or \text{dist2}[i] equals the diameter length, then node i is a special node. The time complexity is O(n), and the space complexity is O(n). Where n is the number of nodes.
 * Dry Run: Input n = 3, edges = [[0,1],[1,2]]. Output "101".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findSpecialNodes = function (n, edges) {
  const g = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    g[a].push(b);
    g[b].push(a);
  }

  const bfs = (start) => {
    const dist = new Array(n).fill(-1);
    dist[start] = 0;
    const q = [start];
    let far = start;

    for (const u of q) {
      if (dist[u] > dist[far]) {
        far = u;
      }
      for (const v of g[u]) {
        if (dist[v] === -1) {
          dist[v] = dist[u] + 1;
          q.push(v);
        }
      }
    }
    return [far, dist];
  };

  const [a] = bfs(0);
  const [b, dist1] = bfs(a);
  const [, dist2] = bfs(b);
  const d = dist1[b];

  const ans = new Array(n).fill("0");
  for (let i = 0; i < n; i++) {
    if (dist1[i] === d || dist2[i] === d) {
      ans[i] = "1";
    }
  }
  return ans.join("");
};
