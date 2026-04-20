/**
 * Maximize Number Of Nice Divisors
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
