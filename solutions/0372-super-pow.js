/**
 * Super Pow
 * Intuition: For a digit array b, a^b = (((a^{d0})^10 * a^{d1})^10 * …) mod 1337, so walk digits left to right combining `result^10` and `a^digit` under modular exponentiation.
 * Approach: 1. Reduce a mod 1337. 2. Binary-exponentiate with BigInt: square the base and multiply in when the exponent bit is odd. 3. For each digit d, set result = (pow(result,10) * pow(a,d)) % 1337.
 * Dry Run: a = 2, b = [3]. result starts 1; digit 3 → (1^10 * 2^3) % 1337 = 8.
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
    modulusParameter
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
      primeModulus
    );
    let resultFromDigitPower = calculateModularExponentiation(
      baseValue,
      currentDigit,
      primeModulus
    );

    accumulatedResult =
      (resultFromTenPower * resultFromDigitPower) % primeModulus;
  }

  return accumulatedResult;
};
