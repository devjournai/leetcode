/**
 * Find Number of Coins to Place in Tree Nodes
 *
 * Intuition:
 *
 * For every node, we need the maximum product of 3 distinct
 * values inside its subtree.
 *
 * A maximum product of 3 numbers can only come from:
 *
 *     1. The three largest positive numbers.
 *
 * or:
 *
 *     2. The largest positive number multiplied by the two
 *        smallest negative numbers.
 *
 * Example:
 *
 *     [-10, -8, 5, 6]
 *
 * The best product is:
 *
 *     (-10) * (-8) * 6 = 480
 *
 * rather than:
 *
 *     5 * 6 * (-8)
 *
 * ------------------------------------------------------------
 *
 * Therefore, for every subtree, we only need:
 *
 *     - 3 largest values
 *     - 2 smallest values
 *
 * We do NOT need to store every value in the subtree.
 *
 * ------------------------------------------------------------
 *
 * Approach: Iterative DFS from 0 records parent/order. Bottom-up merge each subtree's 2 smallest and 3 largest costs. If subtree size < 3, coin=1; else max of three largest product vs two smallest * largest, or 0 if that product is not positive.
 *
 * DFS:
 *
 * We root the tree at node 0.
 *
 * For every node:
 *
 *     1. Process all children.
 *     2. Merge their important values with the current node.
 *     3. Keep only:
 *
 *        - 3 largest values
 *        - 2 smallest values
 *
 *     4. Calculate the maximum product of 3 values.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * cost = [1,4,2,3,5,7,8,-4,2]
 *
 * For node 1, its subtree contains:
 *
 *     [4,3,5,7]
 *
 * Three largest:
 *
 *     7,5,4
 *
 * Product:
 *
 *     7 * 5 * 4 = 140
 *
 * Therefore:
 *
 *     coin[1] = 140
 *
 * ------------------------------------------------------------
 *
 * For node 2, its subtree contains:
 *
 *     [2,8,-4,2]
 *
 * Three largest:
 *
 *     8,2,2
 *
 * Product:
 *
 *     8 * 2 * 2 = 32
 *
 * The two smallest are:
 *
 *     -4,2
 *
 * There are not two negative values, so the negative-negative
 * combination cannot improve the answer.
 *
 * Therefore:
 *
 *     coin[2] = 32
 *
 * ------------------------------------------------------------
 *
 * Important:
 *
 * The product can be as large as approximately:
 *
 *     10^4 * 10^4 * 10^4 = 10^12
 *
 * JavaScript Number can safely represent this integer because
 * it is below 2^53.
 *
 * ------------------------------------------------------------
 *
 * Iterative DFS is used instead of recursive DFS because n can
 * be 20,000 and a tree can be a long chain.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

var placedCoins = function (edges, cost) {
  const n = cost.length;

  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const parent = new Array(n).fill(-1);
  const order = [];

  const stack = [0];
  parent[0] = -2;

  while (stack.length > 0) {
    const node = stack.pop();

    order.push(node);

    for (const neighbor of graph[node]) {
      if (neighbor === parent[node]) {
        continue;
      }

      parent[neighbor] = node;
      stack.push(neighbor);
    }
  }

  const smallest = Array.from({ length: n }, () => []);

  const largest = Array.from({ length: n }, () => []);

  const coins = new Array(n).fill(1);

  for (let index = n - 1; index >= 0; index--) {
    const node = order[index];

    smallest[node].push(cost[node]);
    largest[node].push(cost[node]);

    for (const child of graph[node]) {
      if (parent[child] !== node) {
        continue;
      }

      for (const value of smallest[child]) {
        smallest[node].push(value);
      }

      for (const value of largest[child]) {
        largest[node].push(value);
      }
    }

    smallest[node].sort((a, b) => a - b);

    if (smallest[node].length > 2) {
      smallest[node].length = 2;
    }

    largest[node].sort((a, b) => b - a);

    if (largest[node].length > 3) {
      largest[node].length = 3;
    }
  }

  const subtreeSize = new Array(n).fill(1);

  for (let index = n - 1; index > 0; index--) {
    const node = order[index];

    subtreeSize[parent[node]] += subtreeSize[node];
  }

  for (let node = 0; node < n; node++) {
    if (subtreeSize[node] < 3) {
      coins[node] = 1;
      continue;
    }

    const big = largest[node];

    let bestProduct = big[0] * big[1] * big[2];
    const small = smallest[node];

    if (small.length >= 2 && big.length >= 1) {
      bestProduct = Math.max(bestProduct, small[0] * small[1] * big[0]);
    }
    coins[node] = bestProduct > 0 ? bestProduct : 0;
  }

  return coins;
};
