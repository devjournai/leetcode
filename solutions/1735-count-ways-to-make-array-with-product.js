/**
 * Count Ways To Make Array With Product
 * Intuition: Fill an array of length n whose product is k. Factor k; for each prime p^e, distribute e indistinguishable exponents into n positions: C(e+n-1, e). Multiply over primes.
 * Approach: 1. Precompute factorials and inverse factorials mod 1e9+7. 2. For each query, factor `targetProduct`; for each exponent compute combinations via `calculateCombinations`. 3. k=1 → 1 way. 4. Push Number of the product of combinations.
 * Dry Run: queries = [[2,6]]
 * 6=2*3, each exponent 1 → C(1+2-1,1)^2 = C(2,1)^2 = 4.
 * Time Complexity: O(MAX_COMBINATION_INPUT + Q * sqrt(k_max))
 * Space Complexity: O(MAX_COMBINATION_INPUT + Q)
 */
var waysToFillArray = function (queries) {
  const MODULUS_VAL = 1000000007n;
  const MAX_COMBINATION_INPUT = 20000;

  const factorialValues = new Array(MAX_COMBINATION_INPUT + 1).fill(1n);
  const inverseFactorialValues = new Array(MAX_COMBINATION_INPUT + 1).fill(1n);

  for (
    let currentNumber = 1;
    currentNumber <= MAX_COMBINATION_INPUT;
    currentNumber++
  ) {
    factorialValues[currentNumber] =
      (factorialValues[currentNumber - 1] * BigInt(currentNumber)) %
      MODULUS_VAL;
  }

  const powerModulo = (baseVal, exponentVal, modulusVal) => {
    let resultVal = 1n;
    let baseBigInt = baseVal;
    let exponentBigInt = exponentVal;

    while (exponentBigInt > 0n) {
      if (exponentBigInt % 2n === 1n) {
        resultVal = (resultVal * baseBigInt) % modulusVal;
      }
      baseBigInt = (baseBigInt * baseBigInt) % modulusVal;
      exponentBigInt = exponentBigInt / 2n;
    }
    return resultVal;
  };

  inverseFactorialValues[MAX_COMBINATION_INPUT] = powerModulo(
    factorialValues[MAX_COMBINATION_INPUT],
    MODULUS_VAL - 2n,
    MODULUS_VAL
  );
  for (
    let currentIdx = MAX_COMBINATION_INPUT - 1;
    currentIdx >= 0;
    currentIdx--
  ) {
    inverseFactorialValues[currentIdx] =
      (inverseFactorialValues[currentIdx + 1] * BigInt(currentIdx + 1)) %
      MODULUS_VAL;
  }

  const calculateCombinations = (totalItems, chooseItems) => {
    if (chooseItems < 0 || chooseItems > totalItems) {
      return 0n;
    }
    if (chooseItems === 0 || chooseItems === totalItems) {
      return 1n;
    }

    let numeratorPart = factorialValues[totalItems];
    let denominatorPartOne = inverseFactorialValues[chooseItems];
    let denominatorPartTwo = inverseFactorialValues[totalItems - chooseItems];

    let combinationResult = (numeratorPart * denominatorPartOne) % MODULUS_VAL;
    combinationResult = (combinationResult * denominatorPartTwo) % MODULUS_VAL;
    return combinationResult;
  };

  const findPrimeFactorCounts = (targetNumber) => {
    const factorMap = new Map();
    let currentDivisor = 2;
    let tempNumber = targetNumber;

    while (currentDivisor * currentDivisor <= tempNumber) {
      while (tempNumber % currentDivisor === 0) {
        factorMap.set(currentDivisor, (factorMap.get(currentDivisor) || 0) + 1);
        tempNumber /= currentDivisor;
      }
      currentDivisor++;
    }
    if (tempNumber > 1) {
      factorMap.set(tempNumber, (factorMap.get(tempNumber) || 0) + 1);
    }
    return factorMap;
  };

  const finalAnswers = [];
  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    const currentQuery = queries[queryIndex];
    const arraySize = currentQuery[0];
    const targetProduct = currentQuery[1];

    if (targetProduct === 1) {
      finalAnswers.push(1);
      continue;
    }

    const primeFactorExponents = findPrimeFactorCounts(targetProduct);
    let currentQueryWays = 1n;

    for (const exponentValue of primeFactorExponents.values()) {
      const starsCount = BigInt(exponentValue);
      const binsNumber = BigInt(arraySize);
      const totalPositions = starsCount + binsNumber - 1n;

      currentQueryWays =
        (currentQueryWays *
          calculateCombinations(Number(totalPositions), Number(starsCount))) %
        MODULUS_VAL;
    }
    finalAnswers.push(Number(currentQueryWays));
  }

  return finalAnswers;
};
