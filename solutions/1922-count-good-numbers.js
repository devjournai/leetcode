/**
 * Count Good Numbers
 * Intuition: Even indices (0-based) may use 5 even digits and odd indices 4 primes. A length-`n` string therefore has `ceil(n/2)` even slots and `floor(n/2)` odd slots, so the count is `5^even * 4^odd` modulo 1e9+7.
 * Approach: 1. Set even/odd slot counts with `Math.ceil(n/2)` and `Math.floor(n/2)`. 2. Recursively compute modular exponentiation `powerModular(base, exp)` by squaring halves and multiplying in the base when `exp` is odd, using BigInt for the modulus. 3. Multiply the two powers modulo 1e9+7 and convert to Number.
 * Dry Run: n = 1 → even=1, odd=0.
 *   - 5^1 = 5, 4^0 = 1 → 5. (digits 0,2,4,6,8)
 * Dry Run: n = 4 → even=2, odd=2 → 5^2 * 4^2 = 25 * 16 = 400.
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
var countGoodNumbers = function (n) {
  const calculationModulus = 1000000007;
  const choicesForEvenPositions = 5;
  const choicesForOddPositions = 4;

  const totalEvenIndices = Math.ceil(n / 2);
  const totalOddIndices = Math.floor(n / 2);

  function powerModular(baseNumber, exponentValue) {
    if (exponentValue === 0) {
      return 1n;
    }
    let intermediateResult = powerModular(
      baseNumber,
      Math.floor(exponentValue / 2)
    );
    let squaredHalf =
      (intermediateResult * intermediateResult) % BigInt(calculationModulus);

    if (exponentValue % 2 === 1) {
      return (squaredHalf * BigInt(baseNumber)) % BigInt(calculationModulus);
    } else {
      return squaredHalf;
    }
  }

  const resultForEvenIndices = powerModular(
    choicesForEvenPositions,
    totalEvenIndices
  );
  const resultForOddIndices = powerModular(
    choicesForOddPositions,
    totalOddIndices
  );

  const finalAnswer =
    (resultForEvenIndices * resultForOddIndices) % BigInt(calculationModulus);

  return Number(finalAnswer);
};
