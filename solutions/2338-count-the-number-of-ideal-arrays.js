/**
 * Count The Number Of Ideal Arrays
 * Intuition: The problem requires counting arrays `arr` of length `n` where each `arr[i]` is between 1 and `maxValue`, and `arr[i-1]` divides `arr[i]`. The divisibility condition implies that for any prime `q`, the sequence of exponents `v_q(arr[0]), v_q(arr[1]), ..., v_q(arr[n-1])` must be non-decreasing. The total count can be found by summing up the number of valid ideal arrays starting with each possible `arr[0]` from 1 to `maxValue`. For a fixed `arr[0] = x`, the problem can be decomposed into independent subproblems for each prime factor `q` of `x`. If `v_q(x)` (the exponent of prime `q` in `x`) is `p`, the number of ways to choose the subsequent `n-1` exponents for prime `q` such that the sequence remains non-decreasing is given by the stars and bars combinatorial formula `C(n + p - 1, p)`. This formula effectively counts non-decreasing sequences of `n` exponents where the first exponent is `p`. The total count for a fixed `arr[0]` is the product of these combinatorial counts across all its prime factors. The final answer is the sum of these products, modulo 10^9 + 7. The `maxValue` constraint is handled by iterating `arr[0]` up to `maxValue`, and the combinatorial formula implicitly covers the cases where `arr[i]` might exceed `maxValue` because such `arr[i]` could not have `arr[0]` as their root.
 * Approach:
 * 1. Initialize constants: `modulusValue` (10^9 + 7), `maxPrimePowerExponent` (a safe upper bound for any prime's exponent up to `maxValue`), `maxSieveValue` (a buffer for `maxValue`).
 * 2. Precompute `pascalCombinations` (binomial coefficients `C(k, r)`) using Pascal's identity. `C(i, j) = (C(i-1, j) + C(i-1, j-1)) % modulusValue`. The maximum `k` needed for `C(n + p - 1, p)` is `n + maxPrimePowerExponent - 1`, and `r` is `maxPrimePowerExponent`.
 * 3. Initialize `smallestPrimeFactors` array using a variation of the Sieve of Eratosthenes. `smallestPrimeFactors[k]` will store the smallest prime factor of `k`.
 * 4. Create `primeExponentLists`, an array where `primeExponentLists[k]` stores a list of prime exponents for `k`. For example, if `k = 12 = 2^2 * 3^1`, `primeExponentLists[12]` would store `[2, 1]`. This is populated by repeatedly dividing `k` by its `smallestPrimeFactors[k]` until `k` becomes 1.
 * 5. Initialize `totalIdealArrays` to 0 (as a BigInt to prevent overflow before modulo).
 * 6. Iterate `currentNumberValue` from 1 to `maxElementValue` (representing `arr[0]`).
 *    a. Initialize `currentProductMultiplier` to 1n (BigInt).
 *    b. Retrieve the list of prime exponents for `currentNumberValue` from `primeExponentLists`. For `currentNumberValue = 1`, this list is empty.
 *    c. For each `currentPrimeExponent` in the list:
 *       `currentProductMultiplier = (currentProductMultiplier * BigInt(pascalCombinations[arrayLength + currentPrimeExponent - 1][currentPrimeExponent])) % BigInt(modulusValue)`.
 *    d. Add `currentProductMultiplier` to `totalIdealArrays`, taking modulo `modulusValue`.
 * 7. Convert `totalIdealArrays` to a Number and return it.
 * Dry Run:
 * n = 2, maxValue = 3
 * modulusValue = 1e9 + 7
 * maxPrimePowerExponent = 15
 * maxSieveValue = 8 (maxValue + some_buffer)
 * comboLimit = 22 (n + maxPrimePowerExponent + some_buffer)
 *
 * 1. Precompute pascalCombinations:
 *    pascalCombinations[0][0]=1
 *    pascalCombinations[1][0]=1, pascalCombinations[1][1]=1
 *    pascalCombinations[2][0]=1, pascalCombinations[2][1]=2, pascalCombinations[2][2]=1
 *    ... up to pascalCombinations[16][15]
 *
 * 2. Sieve smallestPrimeFactors:
 *    spf[0]=0, spf[1]=0, spf[2]=2, spf[3]=3, spf[4]=2, spf[5]=5, spf[6]=2, spf[7]=7
 *
 * 3. Populate primeExponentLists:
 *    pel[1] = []
 *    pel[2] = [1] (2^1)
 *    pel[3] = [1] (3^1)
 *    pel[4] = [2] (2^2)
 *    pel[5] = [1] (5^1)
 *    pel[6] = [1, 1] (2^1 * 3^1)
 *    pel[7] = [1] (7^1)
 *
 * 4. totalIdealArrays = 0n
 *
 * 5. Iterate currentNumberValue from 1 to 3:
 *    - currentNumberValue = 1:
 *      currentProductMultiplier = 1n
 *      exponents = []
 *      totalIdealArrays = (0n + 1n) % modulusValue = 1n
 *      (Represents ideal array `[1,1]` or `[1,2]` or `[1,3]`. For `arr[0]=1`, `p=0` for all primes. `C(2+0-1,0) = C(1,0)=1`. This counts 1 way to form the exponent sequence for each prime. Product is 1.)
 *
 *    - currentNumberValue = 2:
 *      currentProductMultiplier = 1n
 *      exponents = pel[2] = [1] (for prime 2, exponent is 1)
 *      currentPrimeExponent = 1
 *      currentProductMultiplier = (1n * BigInt(pascalCombinations[2 + 1 - 1][1])) % BigInt(modulusValue)
 *                               = (1n * BigInt(pascalCombinations[2][1])) % BigInt(modulusValue) = (1n * 2n) % modulusValue = 2n
 *      totalIdealArrays = (1n + 2n) % modulusValue = 3n
 *      (For `arr[0]=2`, `p=1` for prime 2. `C(2+1-1,1) = C(2,1)=2`. This implies 2 ways to choose sequences of exponents for prime 2.
 *       Example sequences: `(v2(arr[0]), v2(arr[1]))` could be `(1,1)` or `(1,2)`.
 *       Combined with other primes, e.g., for `arr[0]=2`, the only valid array ending <= 3 is `[2,2]`.
 *       The combinatorial formula `C(n+p-1, p)` covers all `arr[i]` where `arr[i-1]|arr[i]`, and the `maxValue` constraint is satisfied by the selection of `arr[0]` values.)
 *
 *    - currentNumberValue = 3:
 *      currentProductMultiplier = 1n
 *      exponents = pel[3] = [1] (for prime 3, exponent is 1)
 *      currentPrimeExponent = 1
 *      currentProductMultiplier = (1n * BigInt(pascalCombinations[2 + 1 - 1][1])) % BigInt(modulusValue)
 *                               = (1n * BigInt(pascalCombinations[2][1])) % BigInt(modulusValue) = (1n * 2n) % modulusValue = 2n
 *      totalIdealArrays = (3n + 2n) % modulusValue = 5n
 *      (For `arr[0]=3`, `p=1` for prime 3. `C(2+1-1,1)=C(2,1)=2`. Valid array `[3,3]`.)
 *
 * Final `totalIdealArrays` = 5n.
 *
 * Time Complexity: O(maxElementValue * log(log(maxElementValue)) + maxElementValue * log(maxElementValue) + (arrayLength + maxPrimePowerExponent) * maxPrimePowerExponent).
 * Space Complexity: O(maxElementValue * log(maxElementValue) + arrayLength * maxPrimePowerExponent)
 */
var idealArrays = function (arrayLength, maxElementValue) {
  const modulusValue = 1e9 + 7;
  const maxPrimePowerExponent = 15;
  const maxSieveValue = maxElementValue + 1;
  const comboLimitRow = arrayLength + maxPrimePowerExponent;
  const comboLimitCol = maxPrimePowerExponent + 1;

  const pascalCombinations = Array.from({ length: comboLimitRow }, () =>
    new Array(comboLimitCol).fill(0)
  );
  const smallestPrimeFactors = new Array(maxSieveValue).fill(0);
  const primeExponentLists = Array.from({ length: maxSieveValue }, () => []);

  let combineRowIndex = 0;
  while (combineRowIndex < comboLimitRow) {
    pascalCombinations[combineRowIndex][0] = 1;
    let combineColIndex = 1;
    while (
      combineColIndex <= Math.min(combineRowIndex, maxPrimePowerExponent)
    ) {
      pascalCombinations[combineRowIndex][combineColIndex] =
        (pascalCombinations[combineRowIndex - 1][combineColIndex] +
          pascalCombinations[combineRowIndex - 1][combineColIndex - 1]) %
        modulusValue;
      combineColIndex++;
    }
    combineRowIndex++;
  }

  let primeCheckValue = 2;
  while (primeCheckValue < maxSieveValue) {
    if (smallestPrimeFactors[primeCheckValue] === 0) {
      let primeMultiple = primeCheckValue;
      while (primeMultiple < maxSieveValue) {
        if (smallestPrimeFactors[primeMultiple] === 0) {
          smallestPrimeFactors[primeMultiple] = primeCheckValue;
        }
        primeMultiple += primeCheckValue;
      }
    }
    primeCheckValue++;
  }

  let numberForFactors = 2;
  while (numberForFactors < maxSieveValue) {
    let temporaryValue = numberForFactors;
    let currentPrimeExponents = [];
    while (temporaryValue > 1) {
      const primeVal = smallestPrimeFactors[temporaryValue];
      let factorExponent = 0;
      while (temporaryValue % primeVal === 0) {
        temporaryValue = Math.floor(temporaryValue / primeVal);
        factorExponent++;
      }
      currentPrimeExponents.push(factorExponent);
    }
    primeExponentLists[numberForFactors] = currentPrimeExponents;
    numberForFactors++;
  }

  let totalIdealArrays = 0n;
  let currentNumberValue = 1;
  while (currentNumberValue <= maxElementValue) {
    let currentProductMultiplier = 1n;
    const currentNumberExponents = primeExponentLists[currentNumberValue] || [];

    for (const currentExponentCount of currentNumberExponents) {
      currentProductMultiplier =
        (currentProductMultiplier *
          BigInt(
            pascalCombinations[arrayLength + currentExponentCount - 1][
              currentExponentCount
            ]
          )) %
        BigInt(modulusValue);
    }
    totalIdealArrays =
      (totalIdealArrays + currentProductMultiplier) % BigInt(modulusValue);
    currentNumberValue++;
  }

  return Number(totalIdealArrays);
};
