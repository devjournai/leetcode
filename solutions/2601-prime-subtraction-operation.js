/**
 * Prime Subtraction Operation
 * Intuition: The core idea is to process the array from left to right, making greedy choices. For each element `nums[i]`, we want to make it as small as possible while ensuring it's strictly greater than the modified `nums[i-1]`. This allows maximum 'room' for subsequent elements. To achieve this, we subtract the largest possible prime `p` such that `nums[i] - p` meets the strictly increasing condition.
 * Approach: 1. Generate all prime numbers up to the maximum possible value of `nums[i]` (e.g., 1000) using the Sieve of Eratosthenes. 2. Initialize `previousElementValue` to 0. 3. Create a mutable copy of the input `nums` array. 4. Iterate through this mutable array from the first element to the last. For each `currentOriginalValue` at `elementIndex`: a. Find the `greatestApplicablePrime`. This prime must be strictly less than `currentOriginalValue` and `currentOriginalValue - greatestApplicablePrime` must be strictly greater than `previousElementValue`. Iterate through the pre-generated primes in increasing order, and the last prime satisfying these conditions will be our `greatestApplicablePrime`. b. Apply the subtraction: update the current element in the mutable array to `currentOriginalValue - greatestApplicablePrime`. c. Let `modifiedCurrentValue` be this new value of the current element. d. If `modifiedCurrentValue` is not strictly greater than `previousElementValue`, it's impossible to make the array strictly increasing, so return `false`. e. Update `previousElementValue = modifiedCurrentValue` for the next iteration. 5. If the loop completes without returning `false`, it means the array can be made strictly increasing, so return `true`.
 * Dry Run: nums = [10, 8]
 *   Primes generated (up to 1000): `collectedPrimes = [2, 3, 5, 7, 11, ...]`
 *   `previousElementValue = 0`
 *   `mutableNumbers = [10, 8]` (copy of `nums`)
 *
 *   `elementIndex = 0`:
 *     `currentOriginalElement = mutableNumbers[0]` which is `10`.
 *     `greatestApplicablePrime = 0`.
 *     Iterate `primeIterator` in `collectedPrimes`:
 *       - `primeIterator = 2`: `2 < 10` is true. `10 - 2 = 8`. `8 > previousElementValue (0)` is true. `greatestApplicablePrime` becomes `2`.
 *       - `primeIterator = 3`: `3 < 10` is true. `10 - 3 = 7`. `7 > previousElementValue (0)` is true. `greatestApplicablePrime` becomes `3`.
 *       - `primeIterator = 5`: `5 < 10` is true. `10 - 5 = 5`. `5 > previousElementValue (0)` is true. `greatestApplicablePrime` becomes `5`.
 *       - `primeIterator = 7`: `7 < 10` is true. `10 - 7 = 3`. `3 > previousElementValue (0)` is true. `greatestApplicablePrime` becomes `7`.
 *       - `primeIterator = 11`: `11 >= 10` is true. Break the inner loop.
 *     Modify `mutableNumbers[0]`: `mutableNumbers[0] = 10 - 7 = 3`. Now `mutableNumbers` is `[3, 8]`.
 *     `modifiedCurrentValue = mutableNumbers[0]` which is `3`.
 *     Check: `modifiedCurrentValue (3) <= previousElementValue (0)` is false.
 *     Update `previousElementValue = modifiedCurrentValue (3)`.
 *
 *   `elementIndex = 1`:
 *     `currentOriginalElement = mutableNumbers[1]` which is `8`.
 *     `greatestApplicablePrime = 0`.
 *     Iterate `primeIterator` in `collectedPrimes`:
 *       - `primeIterator = 2`: `2 < 8` is true. `8 - 2 = 6`. `6 > previousElementValue (3)` is true. `greatestApplicablePrime` becomes `2`.
 *       - `primeIterator = 3`: `3 < 8` is true. `8 - 3 = 5`. `5 > previousElementValue (3)` is true. `greatestApplicablePrime` becomes `3`.
 *       - `primeIterator = 5`: `5 < 8` is true. `8 - 5 = 3`. `3 > previousElementValue (3)` is false (not strictly greater).
 *       - `primeIterator = 7`: `7 < 8` is true. `8 - 7 = 1`. `1 > previousElementValue (3)` is false.
 *       - `primeIterator = 11`: `11 >= 8` is true. Break the inner loop.
 *     Modify `mutableNumbers[1]`: `mutableNumbers[1] = 8 - 3 = 5`. Now `mutableNumbers` is `[3, 5]`.
 *     `modifiedCurrentValue = mutableNumbers[1]` which is `5`.
 *     Check: `modifiedCurrentValue (5) <= previousElementValue (3)` is false.
 *     Update `previousElementValue = modifiedCurrentValue (5)`.
 *
 *   End of array traversal. Return `true`.
 * Time Complexity: O(M log log M + N * (M / log M))
 * Space Complexity: O(M + N)
 */
var primeSubOperation = function (nums) {
  const sieveMaximum = 1000;
  const isPrimeIndicator = new Array(sieveMaximum + 1).fill(true);
  isPrimeIndicator[0] = false;
  isPrimeIndicator[1] = false;

  const collectedPrimes = [];

  for (
    let currentNumberCheck = 2;
    currentNumberCheck <= sieveMaximum;
    ++currentNumberCheck
  ) {
    if (isPrimeIndicator[currentNumberCheck]) {
      collectedPrimes.push(currentNumberCheck);
      for (
        let multipleIndex = currentNumberCheck * currentNumberCheck;
        multipleIndex <= sieveMaximum;
        multipleIndex += currentNumberCheck
      ) {
        isPrimeIndicator[multipleIndex] = false;
      }
    }
  }

  const mutableNumbers = [...nums];
  let previousElementValue = 0;

  for (
    let elementIndex = 0;
    elementIndex < mutableNumbers.length;
    ++elementIndex
  ) {
    const currentOriginalElement = mutableNumbers[elementIndex];
    let greatestApplicablePrime = 0;

    for (let primeIterator of collectedPrimes) {
      if (primeIterator >= currentOriginalElement) {
        break;
      }
      if (currentOriginalElement - primeIterator > previousElementValue) {
        greatestApplicablePrime = primeIterator;
      }
    }

    mutableNumbers[elementIndex] -= greatestApplicablePrime;
    const modifiedCurrentValue = mutableNumbers[elementIndex];

    if (modifiedCurrentValue <= previousElementValue) {
      return false;
    }
    previousElementValue = modifiedCurrentValue;
  }

  return true;
};
