/**
 * Count Visited Nodes in a Directed Graph
 *
 * Intuition:
 * Every node has exactly one outgoing edge.
 *
 * Such a graph is called a Functional Graph.
 *
 * Every connected component consists of:
 *
 *      Trees → Cycle
 *
 * Every walk eventually reaches exactly one cycle.
 *
 * Therefore:
 *
 * • Every node inside a cycle visits exactly:
 *
 *      cycleSize
 *
 * nodes.
 *
 * • Every tree node visits:
 *
 *      1 + answer[next]
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * Step 1:
 * Remove every tree node using Topological Sort.
 *
 * Compute indegree of every node.
 *
 * Nodes with indegree 0 cannot belong to a cycle.
 *
 * Remove them using BFS.
 *
 * Remaining nodes belong to cycles.
 *
 * -----------------------------------------------------------------------
 *
 * Step 2:
 * Find every cycle.
 *
 * Traverse every remaining cycle.
 *
 * Let
 *
 *      cycle length = L
 *
 * Every node inside that cycle has answer = L.
 *
 * -----------------------------------------------------------------------
 *
 * Step 3:
 * DFS from removed nodes.
 *
 * Since
 *
 *      answer[node]
 *          =
 *      answer[next] + 1
 *
 * compute answers recursively.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * edges =
 *
 * [1,2,0,0]
 *
 * Cycle:
 *
 *      0 → 1 → 2 → 0
 *
 * length = 3
 *
 * answer:
 *
 *      0 = 3
 *      1 = 3
 *      2 = 3
 *
 * Node 3:
 *
 *      3 → 0
 *
 * answer =
 *
 *      3 + 1 = 4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var countVisitedNodes = function (edges) {
  const n = edges.length;

  const indegree = new Array(n).fill(0);

  for (const next of edges) {
    indegree[next]++;
  }

  const removed = new Array(n).fill(false);

  const queue = [];

  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    const node = queue.shift();

    removed[node] = true;

    const next = edges[node];

    indegree[next]--;

    if (indegree[next] === 0) {
      queue.push(next);
    }
  }

  const answer = new Array(n).fill(0);

  const visited = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    if (removed[i] || visited[i]) continue;

    let cur = i;
    const cycle = [];

    while (!visited[cur]) {
      visited[cur] = true;
      cycle.push(cur);
      cur = edges[cur];
    }

    const size = cycle.length;

    for (const node of cycle) {
      answer[node] = size;
    }
  }

  const dfs = (node) => {
    if (answer[node] !== 0) {
      return answer[node];
    }

    answer[node] = dfs(edges[node]) + 1;

    return answer[node];
  };

  for (let i = 0; i < n; i++) {
    dfs(i);
  }

  return answer;
};
