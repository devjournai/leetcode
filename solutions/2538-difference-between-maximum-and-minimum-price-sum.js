/**
 * Difference Between Maximum and Minimum Price Sum
 *
 * Intuition:
 * For a chosen root, the minimum price sum is always the price of the root itself
 * because the shortest path starting from the root is the path containing only
 * the root.
 *
 * Therefore, the cost becomes:
 *
 *      Maximum Root-to-Node Path Sum − price[root]
 *
 * We reroot the tree using two DFS traversals.
 *
 * For every node we maintain:
 *
 * 1. down[node]
 *      Maximum path sum starting from this node and going only into its subtree.
 *
 * 2. up[node]
 *      Maximum path sum reaching this node from its parent side.
 *
 * The answer for every possible root is:
 *
 *      max(down[root], up[root]) - price[root]
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build the adjacency list of the tree.
 *
 * 2. First DFS (Bottom-Up):
 *
 *      Compute:
 *
 *      down[node]
 *          = price[node]
 *            + maximum(down of children)
 *
 * 3. Second DFS (Top-Down):
 *
 *      For every child,
 *      compute the best value coming from its parent.
 *
 *      Maintain the largest and second-largest child contributions
 *      so every child knows the best path excluding itself.
 *
 *      up[child]
 *          =
 *          price[child]
 *          +
 *          max(
 *              up[parent],
 *              price[parent],
 *              price[parent] + bestOtherChild
 *          )
 *
 * 4. For every node:
 *
 *      answer =
 *      max(answer,
 *          max(down[node], up[node]) - price[node]
 *      )
 *
 * 5. Return the maximum answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 3
 *
 * edges:
 * 0-1
 * 1-2
 *
 * price:
 * [1,1,1]
 *
 * DFS-1:
 *
 * down[2]=1
 *
 * down[1]=2
 *
 * down[0]=3
 *
 * DFS-2:
 *
 * up[0]=1
 *
 * up[1]=2
 *
 * up[2]=3
 *
 * Costs:
 *
 * node0:
 * 3-1=2
 *
 * node1:
 * 2-1=1
 *
 * node2:
 * 3-1=2
 *
 * Maximum = 2
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var maxOutput = function (n, edges, price) {
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const down = new Array(n).fill(0);
  const up = new Array(n).fill(0);

  const dfs1 = (node, parent) => {
    down[node] = price[node];

    for (const next of graph[node]) {
      if (next === parent) continue;

      dfs1(next, node);

      down[node] = Math.max(down[node], price[node] + down[next]);
    }
  };

  const dfs2 = (node, parent) => {
    let best1 = 0;
    let best2 = 0;

    for (const next of graph[node]) {
      if (next === parent) continue;

      if (down[next] > best1) {
        best2 = best1;
        best1 = down[next];
      } else if (down[next] > best2) {
        best2 = down[next];
      }
    }

    for (const next of graph[node]) {
      if (next === parent) continue;

      let use = best1;

      if (down[next] === best1) {
        use = best2;
      }

      up[next] =
        price[next] + Math.max(up[node], price[node], price[node] + use);

      dfs2(next, node);
    }
  };

  dfs1(0, -1);

  up[0] = price[0];

  dfs2(0, -1);

  let answer = 0;

  for (let i = 0; i < n; i++) {
    answer = Math.max(answer, Math.max(down[i], up[i]) - price[i]);
  }

  return answer;
};
