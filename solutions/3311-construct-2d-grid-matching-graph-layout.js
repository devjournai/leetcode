/**
 * Construct 2D Grid Matching Graph Layout
 * Intuition: The graph is a grid. Corners have the smallest degree. Build the shortest first row from a corner by always taking the unused neighbor with smallest degree among edge-compatible nodes, then fill later rows from the node above.
 * Approach: 1. Build adjacency lists. 2. Pick a min-degree node as a corner. 3. Extend the first row until the opposite corner. 4. cols = row length, rows = n / cols. 5. For each later cell, take the unseen neighbor of the cell above.
 * Dry Run: n = 4, edges = [[0,1],[0,2],[1,3],[2,3]]
 *   - Corner 0 (deg 2), first row [0,1], second row [2,3] (or a rotation/reflection)
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var constructGridLayout = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  let corner = 0;
  for (let i = 1; i < n; i++) {
    if (graph[i].length < graph[corner].length) {
      corner = i;
    }
  }

  const seen = Array(n).fill(false);
  seen[corner] = true;

  const getFirstRow = () => {
    const cornerDegree = graph[corner].length;
    const row = [corner];
    while (
      row.length === 1 ||
      graph[row[row.length - 1]].length === cornerDegree + 1
    ) {
      const neighbors = graph[row[row.length - 1]];
      neighbors.sort((a, b) => graph[a].length - graph[b].length);
      for (const v of neighbors) {
        if (
          !seen[v] &&
          (graph[v].length === cornerDegree ||
            graph[v].length === cornerDegree + 1)
        ) {
          row.push(v);
          seen[v] = true;
          break;
        }
      }
    }
    return row;
  };

  const firstRow = getFirstRow();
  const cols = firstRow.length;
  const rows = n / cols;
  const ans = Array.from({ length: rows }, () => Array(cols).fill(0));
  ans[0] = firstRow;

  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (const v of graph[ans[i - 1][j]]) {
        if (!seen[v]) {
          ans[i][j] = v;
          seen[v] = true;
          break;
        }
      }
    }
  }

  return ans;
};
