/**
 * Maximize Number Of Nice Divisors
 * Intuition: Splitting primeFactors into parts whose product is maximized uses mostly 3s (avoid a leftover 1 by using 2+2 instead of 3+1), then modular exponentiation.
 * Approach: 1. If n≤3 return n. 2. `countThrees = floor(n/3)`, remainder n%3. 3. Remainder 0 → 3^k; remainder 1 → 3^(k-1)*4; remainder 2 → 3^k*2. 4. `calculatePower` does fast pow mod 1e9+7.
 * Dry Run: primeFactors = 5.
 *   - 5=3+2 → 3^1*2=6.
 * Time Complexity: O(log(primeFactors))
 * Space Complexity: O(1)
 */
var maxNiceDivisors = function (primeFactors) {
  const modValue = 1000000007;

  if (primeFactors <= 3) {
    return primeFactors;
  }

  const countThrees = Math.floor(primeFactors / 3);
  const factorRemainder = primeFactors % 3;

  function calculatePower(expBase, expPower) {
    let powerAccumulator = BigInt(1);
    let currentBaseValue = BigInt(expBase);
    const currentModulus = BigInt(modValue);
    let powerIterator = expPower;

    while (powerIterator > 0) {
      if (powerIterator % 2 !== 0) {
        powerAccumulator =
          (powerAccumulator * currentBaseValue) % currentModulus;
      }
      currentBaseValue = (currentBaseValue * currentBaseValue) % currentModulus;
      powerIterator = Math.floor(powerIterator / 2);
    }
    return Number(powerAccumulator);
  }

  if (factorRemainder === 0) {
    return calculatePower(3, countThrees);
  }

  if (factorRemainder === 1) {
    return (calculatePower(3, countThrees - 1) * 4) % modValue;
  }

  return (calculatePower(3, countThrees) * 2) % modValue;
};
