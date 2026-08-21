/**
 * Unit Conversion II
 * Intuition: Precompute each unit as a factor from unit 0 (as in 3528). Query u→v is units[v] * inv(units[u]) modulo 1e9+7 by Fermat.
 * Approach: 1. BFS multiply conversion factors from 0. 2. For each query, ans = units[v] * modPow(units[u], MOD-2) % MOD.
 * Dry Run: conversions [[0,1,2]], query [1,0] → 2 * inv(2) = 1.
 * Time Complexity: O(N + Q log MOD)
 * Space Complexity: O(N + Q)
 */
var queryConversions = function (conversions, queries) {
  const MOD = 1000000007n;

  const baseUnitConversions = (conversionsList) => {
    const n = conversionsList.length + 1;
    const result = Array(n).fill(0n);
    result[0] = 1n;
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v, factor] of conversionsList) {
      graph[u].push([v, BigInt(factor)]);
    }
    const queue = [0];
    for (let i = 0; i < queue.length; i++) {
      const u = queue[i];
      for (const [v, factor] of graph[u]) {
        result[v] = (result[u] * factor) % MOD;
        queue.push(v);
      }
    }
    return result;
  };

  const modPow = (x, n) => {
    if (n === 0n) return 1n;
    if (n % 2n === 1n) return (x * modPow(x % MOD, n - 1n)) % MOD;
    return modPow((x * x) % MOD, n / 2n);
  };

  const units = baseUnitConversions(conversions);
  return queries.map(([u, v]) =>
    Number((units[v] * modPow(units[u], MOD - 2n)) % MOD)
  );
};
