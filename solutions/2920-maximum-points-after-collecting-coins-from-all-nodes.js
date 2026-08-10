/**
 * Maximum Points After Collecting Coins From All Nodes
 *
 * Intuition:
 * The important observation is that choosing the second method at a node
 * divides the coins of EVERY node in its subtree by 2.
 *
 * Therefore, when we are processing a node, we only need to know:
 *
 *     How many times have the coins been divided by 2
 *     by its ancestors?
 *
 * Let `shift` represent this number.
 *
 * The current value of coins at node `u` is:
 *
 *     floor(coins[u] / 2^shift)
 *
 * At every node we have two choices:
 *
 * ------------------------------------------------------------
 *
 * Choice 1: Collect normally
 *
 * Points:
 *
 *     currentCoins - k
 *
 * Since this operation does not divide the subtree, children
 * continue with the same `shift`.
 *
 *     option1 =
 *         currentCoins - k
 *         + sum(dp[child][shift])
 *
 * ------------------------------------------------------------
 *
 * Choice 2: Collect after dividing by 2
 *
 * Points:
 *
 *     floor(currentCoins / 2)
 *
 * This also divides every coin in the subtree by 2.
 * Therefore, every child now has one additional division.
 *
 *     option2 =
 *         floor(currentCoins / 2)
 *         + sum(dp[child][shift + 1])
 *
 * ------------------------------------------------------------
 *
 * Therefore:
 *
 *     dp[u][shift] =
 *         max(option1, option2)
 *
 * ------------------------------------------------------------
 *
 * Why is the number of states small?
 *
 * coins[i] <= 10^4.
 *
 * Repeatedly dividing by 2 quickly reaches zero:
 *
 *     10000
 *       ↓
 *     5000
 *       ↓
 *     2500
 *       ↓
 *     ...
 *       ↓
 *     0
 *
 * After around 14-15 divisions, the value is always 0.
 *
 * So we only need O(log(max(coins))) states per node.
 *
 * ------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build the tree using an adjacency list.
 *
 * 2. Root the tree at node 0.
 *
 * 3. Since n can be 10^5, avoid recursive DFS in JavaScript
 *    because it can cause a call-stack overflow.
 *
 * 4. Use an iterative DFS to generate a parent array and
 *    traversal order.
 *
 * 5. Process nodes in reverse traversal order.
 *    This gives us a postorder traversal, so all children are
 *    already processed when calculating a node.
 *
 * 6. For every node and every possible `shift`:
 *
 *       currentCoins = floor(coins[node] / 2^shift)
 *
 *    Calculate both choices.
 *
 * 7. Store the maximum.
 *
 * 8. Return dp[0][0].
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * edges = [[0,1],[1,2],[2,3]]
 * coins = [10,10,3,3]
 * k = 5
 *
 * Tree:
 *
 *       0
 *       |
 *       1
 *       |
 *       2
 *       |
 *       3
 *
 * At node 0:
 *
 * Option 1:
 *
 *     10 - 5 = 5
 *
 * No division is applied to children.
 *
 * At node 1:
 *
 *     10 - 5 = 5
 *
 * At node 2, choose option 2:
 *
 *     floor(3 / 2) = 1
 *
 * Therefore node 3 receives:
 *
 *     floor(3 / 2) = 1
 *
 * At node 3:
 *
 *     floor(1 / 2) = 0
 *
 * But the better choice is to collect normally:
 *
 *     1 - 5 = -4
 *
 * or divide:
 *
 *     floor(1 / 2) = 0
 *
 * So node 3 contributes 0.
 *
 * Total:
 *
 *     5 + 5 + 1 + 0 = 11
 *
 * Answer = 11.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n * log(max(coins)))
 * Space Complexity: O(n * log(max(coins)))
 */
var maximumPoints = function (edges, coins, k) {
  const n = coins.length;
  const MAX_SHIFT = 15;

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

  const dp = Array.from({ length: n }, () => new Array(MAX_SHIFT + 1).fill(0));

  for (let index = n - 1; index >= 0; index--) {
    const node = order[index];

    for (let shift = 0; shift <= MAX_SHIFT; shift++) {
      const currentCoins = Math.floor(coins[node] / Math.pow(2, shift));
      let option1 = currentCoins - k;
      let option2 = Math.floor(currentCoins / 2);

      for (const child of graph[node]) {
        if (parent[child] !== node) {
          continue;
        }

        option1 += dp[child][shift];
        if (shift < MAX_SHIFT) {
          option2 += dp[child][shift + 1];
        }
      }

      dp[node][shift] = Math.max(option1, option2);
    }
  }

  return dp[0][0];
};
