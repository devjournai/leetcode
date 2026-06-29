/**
 * Maximum Star Sum of a Graph
 *
 * Intuition:
 * For every node, consider it as the center of a star graph. Since only positive
 * neighboring node values increase the total sum, ignore all non-positive values.
 * Among all positive neighbors, choose at most `k` largest values and add them to
 * the current node's value. The maximum such sum across all nodes is the answer.
 *
 * Approach:
 * 1. Let `n` be the number of nodes.
 * 2. Create an adjacency list `graph`, where each node stores its neighbors along
 *    with their corresponding values.
 * 3. Traverse every edge:
 *      - Add `(neighbor, neighborValue)` for both directions since the graph is
 *        undirected.
 * 4. Initialize `answer` as negative infinity.
 * 5. For every node:
 *      a. Collect all positive-valued neighbors.
 *      b. Sort them in descending order.
 *      c. Initialize `starSum` with the current node's value.
 *      d. Add the largest `k` positive neighbor values.
 *      e. Update the overall maximum answer.
 * 6. Return the maximum star sum.
 *
 * Dry Run:
 * Input:
 *    vals = [1,2,3,4,10,-10,-20]
 *    edges = [[0,1],[1,2],[1,3],[3,4],[3,5],[3,6]]
 *    k = 2
 *
 * Graph:
 *    0 -> [2]
 *    1 -> [1,3,4]
 *    2 -> [2]
 *    3 -> [2,10,-10,-20]
 *    4 -> [4]
 *    ...
 *
 * Node 0:
 *    starSum = 1
 *    Positive neighbors = [2]
 *    Take top 1 => 2
 *    Total = 3
 *    answer = 3
 *
 * Node 1:
 *    starSum = 2
 *    Positive neighbors = [4,3,1]
 *    Take top 2 => 4 + 3
 *    Total = 9
 *    answer = 9
 *
 * Node 2:
 *    starSum = 3
 *    Positive neighbors = [2]
 *    Total = 5
 *
 * Node 3:
 *    starSum = 4
 *    Positive neighbors = [10,2]
 *    Total = 16
 *    answer = 16
 *
 * Node 4:
 *    starSum = 10
 *    Positive neighbors = [4]
 *    Total = 14
 *
 * Final Answer:
 *    16
 *
 * Time Complexity: O(E + N * D log D)
 * Space Complexity: O(E)
 */
var maxStarSum = function (vals, edges, k) {
  const n = vals.length;
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(vals[v]);
    graph[v].push(vals[u]);
  }

  let answer = -Infinity;

  for (let i = 0; i < n; i++) {
    const positiveNeighbors = [];

    for (const value of graph[i]) {
      if (value > 0) positiveNeighbors.push(value);
    }

    positiveNeighbors.sort((a, b) => b - a);

    let starSum = vals[i];

    for (let j = 0; j < Math.min(k, positiveNeighbors.length); j++) {
      starSum += positiveNeighbors[j];
    }

    answer = Math.max(answer, starSum);
  }

  return answer;
};
