/**
 * Count Collisions of Monkeys on a Polygon
 *
 * Intuition:
 * Every monkey has exactly two choices:
 * - Move clockwise.
 * - Move counterclockwise.
 *
 * Therefore, the total number of possible movements is:
 *
 *      2^n
 *
 * The only ways in which no collision occurs are:
 *
 * 1. Every monkey moves clockwise.
 * 2. Every monkey moves counterclockwise.
 *
 * In both cases, every monkey simply shifts to the adjacent vertex without
 * meeting another monkey on a vertex or crossing an edge.
 *
 * Hence,
 *
 *      Collision Ways
 *      = Total Ways − Non-Collision Ways
 *      = 2^n − 2
 *
 * Since n can be as large as 10^9, compute 2^n using Fast Modular
 * Exponentiation.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute:
 *
 *      totalWays = 2^n mod (10^9+7)
 *
 *    using Binary Exponentiation.
 *
 * 2. Subtract the two collision-free cases:
 *
 *      answer = totalWays − 2
 *
 * 3. Add MOD before taking modulo to avoid a negative result.
 *
 * 4. Return the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * Input:
 * n = 3
 *
 * Total movements:
 *
 * 2^3 = 8
 *
 * Collision-free movements:
 *
 * Clockwise:
 * →
 * →
 * →
 *
 * Counterclockwise:
 * ←
 * ←
 * ←
 *
 * Total = 2
 *
 * Collision movements:
 *
 * 8 − 2 = 6
 *
 * Return 6.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

var monkeyMove = function (n) {
  const MOD = 1000000007n;

  const modPow = (base, exponent) => {
    let result = 1n;
    let b = BigInt(base);
    let e = BigInt(exponent);

    while (e > 0n) {
      if (e & 1n) {
        result = (result * b) % MOD;
      }

      b = (b * b) % MOD;
      e >>= 1n;
    }

    return result;
  };

  const totalWays = modPow(2, n);

  return Number((totalWays - 2n + MOD) % MOD);
};
