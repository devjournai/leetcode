/**
 * Unit Conversion I
 * Intuition: Conversions form a tree rooted at unit 0; BFS multiplies factors along unique paths modulo 1e9+7.
 * Approach: 1. Build adjacency list u → (v, factor). 2. BFS from 0 with ans[0]=1. 3. ans[v] = ans[u] * factor % MOD.
 * Dry Run: conversions = [[0,1,2],[0,2,3]]. ans = [1, 2, 3].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var baseUnitConversions = function (conversions) {
  const MOD = 1000000007;
  const n = conversions.length + 1;
  const answer = new Array(n).fill(0);
  answer[0] = 1;
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v, factor] of conversions) {
    graph[u].push([v, factor]);
  }

  const queue = [0];
  for (let qi = 0; qi < queue.length; qi++) {
    const u = queue[qi];
    for (const [v, factor] of graph[u]) {
      answer[v] = Number((BigInt(answer[u]) * BigInt(factor)) % BigInt(MOD));
      queue.push(v);
    }
  }

  return answer;
};
