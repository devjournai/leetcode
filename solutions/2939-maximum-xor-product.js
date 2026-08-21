/**
 * Maximum Xor Product
 *
 * Intuition:
 *
 * We need to maximize:
 *
 *     (a XOR x) * (b XOR x)
 *
 * where:
 *
 *     0 <= x < 2^n
 *
 * Since x can choose each of its n bits independently, we can
 * decide what happens at every bit position.
 *
 * ------------------------------------------------------------
 *
 * Let:
 *
 *     A = a XOR x
 *     B = b XOR x
 *
 * At each bit:
 *
 * Case 1:
 *     aBit === bBit
 *
 * If both bits are equal, XORing both with the same x bit keeps
 * them equal.
 *
 * We should make both bits as large as possible.
 *
 * Therefore, choose xBit so that both become 1.
 *
 * Example:
 *
 *     aBit = 0
 *     bBit = 0
 *
 * Choose:
 *
 *     xBit = 1
 *
 * Then:
 *
 *     0 XOR 1 = 1
 *     0 XOR 1 = 1
 *
 *
 * Case 2:
 *     aBit !== bBit
 *
 * No matter what xBit we choose, the resulting bits will still
 * be different:
 *
 *     0 XOR xBit
 *     1 XOR xBit
 *
 * They will become either:
 *
 *     (0,1)
 *
 * or:
 *
 *     (1,0)
 *
 * We need to decide which number should receive the larger bit.
 *
 * The best strategy is to make the currently smaller number
 * larger.
 *
 * ------------------------------------------------------------
 *
 * Important Observation:
 *
 * For two positive numbers with a fixed sum, their product is
 * maximized when they are as close as possible.
 *
 * So:
 *
 *     Make A and B as balanced as possible.
 *
 * ------------------------------------------------------------
 *
 * We can first process the bits where a and b are different.
 *
 * Suppose at a differing bit:
 *
 *     aBit = 1
 *     bBit = 0
 *
 * We want the number that is currently smaller to receive the 1.
 *
 * Because we process from the highest bit to the lowest bit,
 * once one number becomes larger at a high bit, that determines
 * which number is currently larger.
 *
 * ------------------------------------------------------------
 *
 * Approach: Work in BigInt. For bit n-1..0, if A and B have the same bit, OR the mask onto both. Else give the 1-bit to the currently smaller of A and B (AND-clear the other). Return (A*B) % 1e9+7.
 *
 * Simpler Strategy:
 *
 * Start with:
 *
 *     A = a
 *     B = b
 *
 * For each bit from n - 1 down to 0:
 *
 * If aBit === bBit:
 *
 *     Set both resulting bits to 1.
 *
 * If aBit !== bBit:
 *
 *     The larger bit is already present in one number.
 *
 *     We want the smaller resulting number to get the 1.
 *
 * This creates the maximum possible balanced pair.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * a = 12
 * b = 5
 * n = 4
 *
 * Binary:
 *
 *     a = 1100
 *     b = 0101
 *
 * We can choose x = 0010.
 *
 * Then:
 *
 *     1100 XOR 0010 = 1110 = 14
 *     0101 XOR 0010 = 0111 = 7
 *
 * Product:
 *
 *     14 × 7 = 98
 *
 * ------------------------------------------------------------
 *
 * JavaScript Important Note:
 *
 * n can be 50.
 *
 * JavaScript's normal Number uses 53-bit integer precision,
 * but multiplication of these values can exceed that safe range.
 *
 * Therefore, we use BigInt.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximumXorProduct = function (a, b, n) {
  const MOD = 1000000007n;

  let A = BigInt(a);
  let B = BigInt(b);

  for (let bit = n - 1; bit >= 0; bit--) {
    const mask = 1n << BigInt(bit);

    const aBit = (A & mask) !== 0n;
    const bBit = (B & mask) !== 0n;

    if (aBit === bBit) {
      A |= mask;
      B |= mask;
    } else {
      if (A < B) {
        A |= mask;
        B &= ~mask;
      } else {
        B |= mask;
        A &= ~mask;
      }
    }
  }

  return Number((A * B) % MOD);
};
