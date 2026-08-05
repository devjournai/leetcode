/**
 * Count Valid Paths in a Tree
 *
 * Intuition:
 * A valid path must contain exactly one prime node.
 *
 * Think of every prime node as the "center" of valid paths.
 *
 * If we remove all prime nodes from the tree, the remaining non-prime nodes
 * form several connected components.
 *
 * For every prime node:
 *
 *      • It can form a valid path with every non-prime node in each adjacent
 *        component.
 *
 *      • It can also connect one node from one component with another node
 *        from a different component.
 *
 * Thus we only need the sizes of the neighboring non-prime components.
 *
 * -----------------------------------------------------------------------
 *
 * Observation:
 *
 * Let the neighboring component sizes be
 *
 *      s1, s2, s3 ...
 *
 * Then valid paths through this prime are:
 *
 * 1. Prime itself:
 *
 *      +1
 *
 * 2. Prime ↔ Non-prime
 *
 *      s1 + s2 + ...
 *
 * 3. Between two different components
 *
 *      s1*s2 + s1*s3 + s2*s3 + ...
 *
 * We compute the pair contribution incrementally.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build adjacency list.
 *
 * 2. Compute prime numbers using the Sieve of Eratosthenes.
 *
 * 3. Find every connected component consisting only of non-prime nodes.
 *
 *      Store:
 *
 *          componentId[node]
 *          componentSize[id]
 *
 * 4. For every prime node:
 *
 *      Visit each neighboring component only once.
 *
 *      Maintain:
 *
 *          sum = total nodes processed so far.
 *
 *      For every component of size sz:
 *
 *          answer += sz              // prime ↔ component
 *          answer += sum * sz        // between components
 *
 *          sum += sz
 *
 *      Finally:
 *
 *          answer += 1               // prime itself
 *
 * 5. Return answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 *      1
 *     / \
 *    2   3
 *   / \
 *  4   5
 *
 * Prime = 2
 *
 * Components:
 *
 *      {1}
 *      {4}
 *
 * Sizes:
 *
 *      1,1
 *
 * Contribution:
 *
 *      prime itself      = 1
 *      prime-component   = 2
 *      between comps     = 1
 *
 * Total = 4.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var countPaths = function (n, edges) {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (!isPrime[i]) continue;
    for (let j = i * i; j <= n; j += i) {
      isPrime[j] = false;
    }
  }

  const componentId = new Array(n + 1).fill(-1);
  const componentSize = [];
  let id = 0;

  for (let i = 1; i <= n; i++) {
    if (isPrime[i] || componentId[i] !== -1) continue;

    let size = 0;
    const stack = [i];
    componentId[i] = id;

    while (stack.length) {
      const node = stack.pop();
      size++;

      for (const next of graph[node]) {
        if (!isPrime[next] && componentId[next] === -1) {
          componentId[next] = id;
          stack.push(next);
        }
      }
    }
    componentSize[id++] = size;
  }

  let answer = 0;

  for (let prime = 1; prime <= n; prime++) {
    if (!isPrime[prime]) continue;

    let sum = 0;

    for (const next of graph[prime]) {
      if (isPrime[next]) continue;

      const cid = componentId[next];
      const sz = componentSize[cid];
      answer += sz;
      answer += sum * sz;

      sum += sz;
    }
  }

  return answer;
};
