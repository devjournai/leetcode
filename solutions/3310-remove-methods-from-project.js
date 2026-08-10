/**
 * Remove Methods From Project
 * Intuition: The problem involves identifying a transitive closure (suspicious methods) in a directed graph and then checking a global condition on the edges. If the condition fails, no methods are removed.
 * Approach:
 * 1. Build an adjacency list `adj` to represent the invocation graph, where `adj[u]` contains methods invoked by `u`.
 * 2. Perform a graph traversal (iterative DFS or BFS) starting from method `k` to identify all methods that are directly or indirectly invoked by `k`. Mark these methods as suspicious using a boolean array `isSuspicious`.
 * 3. Iterate through all original `invocations`. For each invocation `[ai, bi]`, check if `bi` (the invoked method) is suspicious AND `ai` (the invoker) is NOT suspicious. If such an invocation is found, it means a non-suspicious method invokes a suspicious one, violating the removal condition. Set a `removalBlocked` flag to true and stop checking.
 * 4. Based on the `removalBlocked` flag:
 *    - If `removalBlocked` is true, return an array containing all methods from `0` to `n-1`.
 *    - If `removalBlocked` is false, return an array containing only the methods that are NOT marked as suspicious.
 * Dry Run:
 * Input: n = 4, k = 1, invocations = [[1,2],[0,1],[3,2]]
 * 1. `adj` creation:
 *    `adj = {0: [1], 1: [2], 2: [], 3: [2]}`
 * 2. Identify suspicious (k=1):
 *    `isSuspicious = [F,F,F,F]` (F=false)
 *    Stack = `[1]`, `isSuspicious[1] = T`. `isSuspicious = [F,T,F,F]` (T=true)
 *    Pop 1. Neighbors of 1: `[2]`.
 *      `isSuspicious[2]` is F. Mark `isSuspicious[2]=T`. Push 2. `isSuspicious = [F,T,T,F]`
 *    Stack = `[2]`
 *    Pop 2. Neighbors of 2: `[]`.
 *    Stack = `[]`
 *    Suspicious methods: `[1, 2]`
 * 3. Check removal condition:
 *    `removalBlocked = false`
 *    Invocation `[1,2]`: `isSuspicious[2]` (T) && `!isSuspicious[1]` (F). Condition fails.
 *    Invocation `[0,1]`: `isSuspicious[1]` (T) && `!isSuspicious[0]` (T). Condition matches! Set `removalBlocked = true`. Break.
 * 4. Construct result:
 *    `removalBlocked` is true. Return `[0,1,2,3]`.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var remainingMethods = function (n, k, invocations) {
  const adj = Array(n)
    .fill(null)
    .map(() => []);
  for (const [invoker, invoked] of invocations) {
    adj[invoker].push(invoked);
  }

  const isSuspicious = Array(n).fill(false);
  const stack = [k];
  isSuspicious[k] = true;

  while (stack.length > 0) {
    const currentMethod = stack.pop();

    for (const neighbor of adj[currentMethod]) {
      if (!isSuspicious[neighbor]) {
        isSuspicious[neighbor] = true;
        stack.push(neighbor);
      }
    }
  }

  let removalBlocked = false;
  for (const [invoker, invoked] of invocations) {
    if (isSuspicious[invoked] && !isSuspicious[invoker]) {
      removalBlocked = true;
      break;
    }
  }

  const remaining = [];
  if (removalBlocked) {
    for (let i = 0; i < n; i++) {
      remaining.push(i);
    }
  } else {
    for (let i = 0; i < n; i++) {
      if (!isSuspicious[i]) {
        remaining.push(i);
      }
    }
  }

  return remaining;
};
