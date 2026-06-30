/**
 * Add Edges to Make Degrees of All Nodes Even
 * Intuition:
 * Adding one edge changes the parity (odd/even) of exactly two nodes because the
 * degree of both endpoints increases by one. Therefore:
 * - If there are more than 4 odd-degree nodes, it is impossible.
 * - If there are 0 odd-degree nodes, the graph already satisfies the condition.
 * - If there are 2 odd-degree nodes, either connect them directly or connect both
 *   to some third node.
 * - If there are 4 odd-degree nodes, check whether two new edges can pair them
 *   without creating duplicate edges.
 *
 * Approach:
 * 1. Build an adjacency list using a HashSet for every node.
 * 2. Compute the degree of every node and collect all nodes having odd degree.
 * 3. Handle the following cases:
 *
 *    Case 1:
 *      If there are 0 odd-degree nodes,
 *      return true.
 *
 *    Case 2:
 *      If there are more than 4 odd-degree nodes,
 *      return false.
 *
 *    Case 3:
 *      If there are exactly 2 odd-degree nodes:
 *      a. Let them be u and v.
 *      b. If edge (u, v) doesn't exist, one edge fixes both.
 *      c. Otherwise, try every node i from 1 to n.
 *         If neither (u, i) nor (v, i) exists,
 *         then add:
 *             (u, i)
 *             (v, i)
 *         Return true.
 *      d. Otherwise return false.
 *
 *    Case 4:
 *      If there are exactly 4 odd-degree nodes:
 *      Let them be a, b, c, d.
 *      Check these three pairings:
 *
 *         (a,b) & (c,d)
 *         (a,c) & (b,d)
 *         (a,d) & (b,c)
 *
 *      If any pairing has both edges absent,
 *      return true.
 *
 * 4. Otherwise return false.
 *
 * Dry Run:
 *
 * Input:
 * n = 4
 * edges = [[1,2],[3,4]]
 *
 * Degrees:
 * 1 -> 1 (odd)
 * 2 -> 1 (odd)
 * 3 -> 1 (odd)
 * 4 -> 1 (odd)
 *
 * oddNodes = [1,2,3,4]
 *
 * Try pairing:
 *
 * (1,2) & (3,4)
 * Already exist ❌
 *
 * (1,3) & (2,4)
 * Neither edge exists ✅
 *
 * Add:
 * 1-3
 * 2-4
 *
 * Degrees become:
 *
 * 1 -> 2
 * 2 -> 2
 * 3 -> 2
 * 4 -> 2
 *
 * Return true.
 *
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */

var isPossible = function (n, edges) {
  const graph = Array.from({ length: n + 1 }, () => new Set());

  for (const [u, v] of edges) {
    graph[u].add(v);
    graph[v].add(u);
  }

  const oddNodes = [];

  for (let i = 1; i <= n; i++) {
    if (graph[i].size % 2 === 1) {
      oddNodes.push(i);
    }
  }

  if (oddNodes.length === 0) {
    return true;
  }

  if (oddNodes.length > 4 || oddNodes.length % 2 === 1) {
    return false;
  }

  const canConnect = (u, v) => !graph[u].has(v);

  if (oddNodes.length === 2) {
    const [u, v] = oddNodes;

    if (canConnect(u, v)) {
      return true;
    }

    for (let i = 1; i <= n; i++) {
      if (i !== u && i !== v && canConnect(u, i) && canConnect(v, i)) {
        return true;
      }
    }

    return false;
  }

  const [a, b, c, d] = oddNodes;

  if (canConnect(a, b) && canConnect(c, d)) {
    return true;
  }

  if (canConnect(a, c) && canConnect(b, d)) {
    return true;
  }

  if (canConnect(a, d) && canConnect(b, c)) {
    return true;
  }

  return false;
};
