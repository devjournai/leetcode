/**
 * Minimum Non Zero Product Of The Array Elements
 * Intuition: The bit swapping operation allows for complete redistribution of bits across all numbers within the array. To achieve the minimum non-zero product, we aim to make as many numbers as possible equal to 1, while concentrating the "remaining value" into the fewest possible numbers. Analyzing the total count of '1' bits at each position across all numbers from 1 to 2^p - 1, we can deduce an optimal distribution. One number can be set to the maximum value, 2^p - 1 (all bits set to 1). The remaining 2^p - 2 numbers can be conceptually paired. For each pair of numbers (x, y) where x + y = 2^p - 1, we can use bit swaps to transform them into 1 and 2^p - 2. This strategy ensures all numbers are non-zero and minimizes the product by utilizing the available bits efficiently.
 * Approach: 1. Define the modulus `10^9 + 7`. 2. Calculate the largest number in the array, `2^p - 1`, using BigInt for `p` potentially up to 60. This value will be one of the factors in the product. 3. Determine the base for exponentiation, which is `2^p - 2`. 4. Calculate the count of times this base value will appear, which is `(2^p - 1 - 1) / 2 = 2^(p-1) - 1`. This represents the number of pairs that will be transformed into `1` and `2^p - 2`. 5. Implement a modular exponentiation helper function (binary exponentiation) to compute `(2^p - 2)^(2^(p-1) - 1)` modulo `MOD`. 6. Multiply the maximum value (`2^p - 1`) by the result of the modular exponentiation, and take the final modulo. Convert the final BigInt result back to a standard Number.
 * Dry Run: For p = 3:
 *   MODULUS = 1000000007n
 *   valuePBigInt = 3n
 *   highestValue = (1n << 3n) - 1n = 8n - 1n = 7n
 *   baseExponentiation = highestValue - 1n = 7n - 1n = 6n
 *   numberOfPairs = (highestValue - 1n) / 2n = (7n - 1n) / 2n = 6n / 2n = 3n
 *   Call powerCalculator(6n, 3n, 1000000007n):
 *     accumulatedResult = 1n
 *     currentBaseValue = 6n % 1000000007n = 6n
 *     currentExponent = 3n
 *     Loop 1 (currentExponent = 3n):
 *       (3n & 1n) is true. accumulatedResult = (1n * 6n) % MODULUS = 6n.
 *       currentBaseValue = (6n * 6n) % MODULUS = 36n.
 *       currentExponent = 3n >> 1n = 1n.
 *     Loop 2 (currentExponent = 1n):
 *       (1n & 1n) is true. accumulatedResult = (6n * 36n) % MODULUS = 216n.
 *       currentBaseValue = (36n * 36n) % MODULUS = 1296n % MODULUS = 289n.
 *       currentExponent = 1n >> 1n = 0n.
 *     Loop ends. Return 216n.
 *   powerResult = 216n
 *   finalProductCalculation = (highestValue * powerResult) % MODULUS = (7n * 216n) % 1000000007n = 1512n % 1000000007n = 1512n
 *   Return Number(1512n) = 1512.
 * Time Complexity: O(log p) due to the modular exponentiation function, where p is the input parameter.
 * Space Complexity: O(1) as only a few BigInt variables are used.
 */
var minNonZeroProduct = function (p) {
  const MODULUS = 1000000007n;

  function powerCalculator(baseVal, exponentVal, modulusVal) {
    let accumulatedResult = 1n;
    let currentBaseValue = baseVal % modulusVal;
    let currentExponent = exponentVal;

    while (currentExponent > 0n) {
      if (currentExponent & 1n) {
        accumulatedResult = (accumulatedResult * currentBaseValue) % modulusVal;
      }
      currentBaseValue = (currentBaseValue * currentBaseValue) % modulusVal;
      currentExponent >>= 1n;
    }
    return accumulatedResult;
  }

  const valuePBigInt = BigInt(p);
  const highestValue = (1n << valuePBigInt) - 1n;
  const baseExponentiation = highestValue - 1n;
  const numberOfPairs = (highestValue - 1n) / 2n;

  const powerResult = powerCalculator(
    baseExponentiation,
    numberOfPairs,
    MODULUS,
  );
  const finalProductCalculation = (highestValue * powerResult) % MODULUS;

  return Number(finalProductCalculation);
};
