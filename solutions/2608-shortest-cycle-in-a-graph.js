/**
 * Shortest Cycle in a Graph
 *
 * Intuition:
 * Since the graph is unweighted, Breadth-First Search (BFS) gives the shortest
 * distance from a starting vertex to every other vertex.
 *
 * Run BFS from every vertex.
 *
 * During BFS, whenever we encounter an already visited neighbor that is not
 * the parent of the current node, we have found a cycle.
 *
 * The length of that cycle is:
 *
 *      distance[current]
 *      +
 *      distance[neighbor]
 *      +
 *      1
 *
 * Keep the minimum over all BFS traversals.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build the adjacency list.
 *
 * 2. Initialize:
 *
 *      answer = Infinity
 *
 * 3. For every vertex:
 *
 *      a. Run BFS.
 *
 *      b. Maintain:
 *
 *          distance[]
 *          parent[]
 *
 *      c. Initialize:
 *
 *          distance[start] = 0
 *
 *      d. While processing neighbors:
 *
 *          If neighbor is unvisited:
 *
 *              Set distance.
 *              Set parent.
 *              Push into queue.
 *
 *          Else if neighbor is not the parent:
 *
 *              A cycle is found.
 *
 *              cycleLength =
 *
 *                  distance[current]
 *                  +
 *                  distance[neighbor]
 *                  +
 *                  1
 *
 *              Update answer.
 *
 * 4. If answer is still Infinity,
 *      return -1.
 *
 * 5. Otherwise,
 *      return answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 3
 *
 * edges =
 *
 * [
 *  [0,1],
 *  [1,2],
 *  [2,0]
 * ]
 *
 * BFS from 0
 *
 * distance:
 *
 * 0 → 0
 * 1 → 1
 * 2 → 1
 *
 * While exploring:
 *
 * 1 → 2
 *
 * Already visited
 * Not parent
 *
 * Cycle:
 *
 * 1 + 1 + 1
 *
 * = 3
 *
 * Answer = 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × (N + E))
 * Space Complexity: O(N + E)
 */

var findShortestCycle = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  let answer = Infinity;

  for (let start = 0; start < n; start++) {
    const distance = new Array(n).fill(-1);
    const parent = new Array(n).fill(-1);

    const queue = [start];

    distance[start] = 0;

    let head = 0;

    while (head < queue.length) {
      const current = queue[head++];

      for (const next of graph[current]) {
        if (distance[next] === -1) {
          distance[next] = distance[current] + 1;

          parent[next] = current;

          queue.push(next);
        } else if (parent[current] !== next) {
          answer = Math.min(answer, distance[current] + distance[next] + 1);
        }
      }
    }
  }

  return answer === Infinity ? -1 : answer;
};
