/**
 * Super Pow
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var superPow = function (a, b) {
  const primeModulus = 1337;
  let accumulatedResult = 1;
  let baseValue = a;

  baseValue %= primeModulus;

  const calculateModularExponentiation = (
    baseParameter,
    exponentParameter,
    modulusParameter,
  ) => {
    let currentPowerAccumulator = 1n;
    let workingBase = BigInt(baseParameter);
    let workingExponent = BigInt(exponentParameter);
    let workingModulus = BigInt(modulusParameter);

    while (workingExponent > 0n) {
      if (workingExponent % 2n === 1n) {
        currentPowerAccumulator =
          (currentPowerAccumulator * workingBase) % workingModulus;
      }
      workingBase = (workingBase * workingBase) % workingModulus;
      workingExponent /= 2n;
    }
    return Number(currentPowerAccumulator);
  };

  for (let digitIterator = 0; digitIterator < b.length; digitIterator++) {
    let currentDigit = b[digitIterator];

    let resultFromTenPower = calculateModularExponentiation(
      accumulatedResult,
      10,
      primeModulus,
    );
    let resultFromDigitPower = calculateModularExponentiation(
      baseValue,
      currentDigit,
      primeModulus,
    );

    accumulatedResult =
      (resultFromTenPower * resultFromDigitPower) % primeModulus;
  }

  return accumulatedResult;
};
