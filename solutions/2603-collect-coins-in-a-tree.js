/**
 * Collect Coins in a Tree
 *
 * Intuition:
 * We only need to traverse edges that are necessary for collecting coins.
 *
 * Since coins can be collected from vertices within distance 2, we can remove
 * unnecessary leaves in two phases:
 *
 * 1. Remove every leaf that contains no coin.
 *    Such leaves never contribute to the answer.
 *
 * 2. After only useful vertices remain, remove leaves twice.
 *    These two rounds correspond to the free collection distance of 2.
 *
 * The remaining edges must be traversed twice
 * (go and return), so the answer is:
 *
 *      remainingEdges × 2
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build the adjacency list and degree of every node.
 *
 * 2. Remove all leaves with no coin.
 *
 *      Use a queue.
 *
 *      Whenever a leaf is removed,
 *      its neighbor may become a new useless leaf.
 *
 * 3. Push every remaining leaf into the queue.
 *
 * 4. Perform exactly two rounds.
 *
 *      Remove every current leaf.
 *
 *      After removing them,
 *      their neighbors may become new leaves
 *      for the next round.
 *
 * 5. Count the remaining vertices.
 *
 *      Remaining edges:
 *
 *          remainingVertices - 1
 *
 *      If no edge remains,
 *      answer is 0.
 *
 *      Otherwise:
 *
 *          answer =
 *              (remainingVertices - 1) × 2
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * coins =
 * [1,0,0,0,0,1]
 *
 * Tree:
 *
 * 0-1-2-3-4-5
 *
 * ----------------
 * Remove useless leaves:
 *
 * none
 *
 * ----------------
 * First trimming:
 *
 * remove
 * 0
 * 5
 *
 * Tree:
 *
 * 1-2-3-4
 *
 * ----------------
 * Second trimming:
 *
 * remove
 * 1
 * 4
 *
 * Tree:
 *
 * 2-3
 *
 * Remaining vertices:
 *
 * 2
 *
 * Remaining edges:
 *
 * 1
 *
 * Answer:
 *
 * 2
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var collectTheCoins = function (coins, edges) {
  const n = coins.length;

  const graph = Array.from({ length: n }, () => []);

  const degree = new Array(n).fill(0);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
    degree[u]++;
    degree[v]++;
  }

  const queue = [];

  let head = 0;

  for (let i = 0; i < n; i++) {
    if (degree[i] === 1 && coins[i] === 0) {
      queue.push(i);
    }
  }

  while (head < queue.length) {
    const node = queue[head++];

    degree[node] = 0;

    for (const next of graph[node]) {
      if (degree[next] === 0) {
        continue;
      }

      degree[next]--;

      if (degree[next] === 1 && coins[next] === 0) {
        queue.push(next);
      }
    }
  }

  const leaves = [];

  for (let i = 0; i < n; i++) {
    if (degree[i] === 1) {
      leaves.push(i);
    }
  }

  for (let round = 0; round < 2; round++) {
    const size = leaves.length;

    for (let i = 0; i < size; i++) {
      const node = leaves.shift();

      degree[node] = 0;

      for (const next of graph[node]) {
        if (degree[next] === 0) {
          continue;
        }

        degree[next]--;

        if (degree[next] === 1) {
          leaves.push(next);
        }
      }
    }
  }

  let remainingVertices = 0;

  for (let i = 0; i < n; i++) {
    if (degree[i] > 0) {
      remainingVertices++;
    }
  }

  if (remainingVertices <= 1) {
    return 0;
  }

  return (remainingVertices - 1) * 2;
};
