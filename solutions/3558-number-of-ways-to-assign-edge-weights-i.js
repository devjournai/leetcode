/**
 * Number of Ways to Assign Edge Weights I
 * Intuition: The problem asks for the number of ways to assign weights (1 or 2) to edges on a specific path such that the total cost is odd. The path in question is from the root (node 1) to any node 'x' that is at the maximum depth in the tree. The wording "Select any one node x" suggests that the answer should be the same regardless of which maximum-depth node 'x' is chosen. This implies we only need the length of such a path, which is simply the maximum depth of the tree.
 * The parity of the sum of edge weights `w1 + w2 + ... + wL` is determined by the number of '1' weights. If `k` edges have weight 1 and `L-k` edges have weight 2, the sum is `k * 1 + (L-k) * 2`. Its parity is `k % 2`. To make the total cost odd, `k` must be an odd number. The number of ways to choose an odd number of edges to have weight 1 from `L` edges is `C(L, 1) + C(L, 3) + ...`, which is a well-known combinatorial identity equal to `2^(L-1)` for `L >= 1`.
 * Since `n >= 2`, the maximum depth `L` will always be at least 1. Thus, the solution boils down to finding the maximum depth of the tree and then computing `2^(maxDepth - 1)` modulo `10^9 + 7`.
 *
 * Approach:
 * 1. Determine `n`, the total number of nodes, from the `edges.length` (since `n = edges.length + 1`).
 * 2. Build an adjacency list representation of the tree from the `edges` array. Initialize an empty array for each node from 1 to `n`.
 * 3. Perform a Breadth-First Search (BFS) starting from node 1 (root) to find the depth of all reachable nodes. During BFS, keep track of the maximum depth encountered.
 *    - Initialize a queue with `[node 1, depth 0]`.
 *    - Initialize a `visited` set to keep track of visited nodes.
 *    - Initialize `maxDepth = 0`.
 *    - While the queue is not empty:
 *      - Dequeue `[currentNode, currentDepth]`.
 *      - Update `maxDepth = Math.max(maxDepth, currentDepth)`.
 *      - For each unvisited neighbor of `currentNode`:
 *        - Mark the neighbor as visited.
 *        - Enqueue `[neighbor, currentDepth + 1]`.
 * 4. After BFS completes, `maxDepth` will hold the maximum depth of the tree.
 * 5. Calculate `2^(maxDepth - 1)` using modular exponentiation to handle large results and apply the modulo `10^9 + 7`.
 *
 * Dry Run:
 * Input: `edges = [[1,2],[1,3],[3,4],[3,5]]`
 * 1. `nodeCount = edges.length + 1 = 4 + 1 = 5`.
 * 2. Adjacency List `adj`:
 *    `1: [2, 3]`
 *    `2: [1]`
 *    `3: [1, 4, 5]`
 *    `4: [3]`
 *    `5: [3]`
 * 3. BFS:
 *    - `queue = [[1, 0]]`, `visited = {1}`, `maxDepth = 0`
 *    - Pop `[1, 0]`. `maxDepth = 0`. Neighbors `2, 3`.
 *      - Enqueue `[2, 1]`, `visited = {1, 2}`.
 *      - Enqueue `[3, 1]`, `visited = {1, 2, 3}`.
 *      - `queue = [[2, 1], [3, 1]]`
 *    - Pop `[2, 1]`. `maxDepth = max(0, 1) = 1`. Neighbor `1` (visited).
 *      - `queue = [[3, 1]]`
 *    - Pop `[3, 1]`. `maxDepth = max(1, 1) = 1`. Neighbors `1` (visited), `4, 5`.
 *      - Enqueue `[4, 2]`, `visited = {1, 2, 3, 4}`.
 *      - Enqueue `[5, 2]`, `visited = {1, 2, 3, 4, 5}`.
 *      - `queue = [[4, 2], [5, 2]]`
 *    - Pop `[4, 2]`. `maxDepth = max(1, 2) = 2`. Neighbor `3` (visited).
 *      - `queue = [[5, 2]]`
 *    - Pop `[5, 2]`. `maxDepth = max(2, 2) = 2`. Neighbor `3` (visited).
 *      - `queue = []`
 *    - BFS ends. `maxDepth = 2`.
 * 4. Calculate `power(2, maxDepth - 1) = power(2, 2 - 1) = power(2, 1) = 2`.
 * 5. Return `2`. This matches Example 2 output.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var assignEdgeWeights = function (edges) {
  const MOD = 1000000007n;

  const power = (base, exp) => {
    let res = 1n;
    let b = BigInt(base) % MOD;
    let e = BigInt(exp);

    while (e > 0n) {
      if (e % 2n === 1n) {
        res = (res * b) % MOD;
      }
      b = (b * b) % MOD;
      e = e / 2n;
    }
    return Number(res);
  };

  const nodeCount = edges.length + 1;

  const adj = Array.from({ length: nodeCount + 1 }, () => []);

  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  let maxDepth = 0;
  const queue = [[1, 0]];
  const visited = new Uint8Array(nodeCount + 1);
  visited[1] = 1;

  let head = 0;

  while (head < queue.length) {
    const [currNode, currDepth] = queue[head++];

    if (currDepth > maxDepth) {
      maxDepth = currDepth;
    }

    for (const neighbor of adj[currNode]) {
      if (visited[neighbor] === 0) {
        visited[neighbor] = 1;
        queue.push([neighbor, currDepth + 1]);
      }
    }
  }

  return power(2, maxDepth - 1);
};
