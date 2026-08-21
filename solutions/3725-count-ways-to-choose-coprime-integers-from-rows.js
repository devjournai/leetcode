/**
 * Count Ways To Choose Coprime Integers From Rows
 * Intuition: Track the GCD of the chosen prefix. After each row, newGcd = gcd(oldGcd, chosen). The answer is the number of ways the final GCD is 1.
 * Approach: Map gcd → ways, starting at gcd 0 with 1 way. For each row, combine every previous gcd with every value. Return ways[1].
 * Dry Run: mat = [[1, 2], [3, 4]] yields three coprime pairs → 3.
 * Time Complexity: O(R * C * M log M)
 * Space Complexity: O(M)
 */
var countCoprime = function (mat) {
  const MOD = 1e9 + 7;
  const gcd = (a, b) => {
    while (b) {
      const rest = a % b;
      a = b;
      b = rest;
    }
    return a;
  };

  let waysByGcd = new Map([[0, 1]]);
  for (const row of mat) {
    const nextWays = new Map();
    for (const value of row) {
      for (const [prevGcd, ways] of waysByGcd) {
        const nextGcd = gcd(prevGcd, value);
        nextWays.set(nextGcd, ((nextWays.get(nextGcd) || 0) + ways) % MOD);
      }
    }
    waysByGcd = nextWays;
  }
  return waysByGcd.get(1) || 0;
};
