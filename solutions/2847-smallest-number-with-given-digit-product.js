/**
 * Smallest Number With Given Digit Product
 * Intuition: To construct the smallest number from a given product, we want to minimize the number of digits used. This is achieved by using larger prime factors (9, 8, 7...) whenever possible. Among numbers with the same digit count, the one with smaller digits in the higher place values (leftmost) is smaller. Therefore, the collected digits should be arranged in ascending order to form the final number.
 * Approach: 1. Handle base cases where the input `n` is a single digit (1-9). 2. Initialize an empty array to store the digits of the result and convert `n` to a `BigInt` for large product handling. 3. Iterate greedily from the largest possible single digit (9) down to 2. For each digit, repeatedly divide the `BigInt` product if it's divisible, adding the digit to our collection, until it's no longer divisible. This ensures we use the largest factors first. 4. After factorization, if the `BigInt` product is not 1, it means `n` could not be fully factored into single digits (2-9), so return "-1". 5. Otherwise, reverse the collected digits (as they were collected in descending order) to arrange them in ascending order, then join them into a string.
 * Dry Run: For n = 48:
 * 1. `inputNumber = 48`. Not `< 10`.
 * 2. `assembledDigits = []`. `processingValue = 48n`.
 * 3. `divisorCandidate = 9`: `48n % 9n` is `3n`. No division.
 * 4. `divisorCandidate = 8`: `48n % 8n === 0n`.
 *    - `assembledDigits.push(8)`. `assembledDigits = [8]`.
 *    - `processingValue = 48n / 8n = 6n`.
 *    - `6n % 8n` is `6n`. Inner loop ends.
 * 5. `divisorCandidate = 7`: `6n % 7n` is `6n`. No division.
 * 6. `divisorCandidate = 6`: `6n % 6n === 0n`.
 *    - `assembledDigits.push(6)`. `assembledDigits = [8, 6]`.
 *    - `processingValue = 6n / 6n = 1n`.
 *    - `1n % 6n` is `1n`. Inner loop ends.
 * 7. `divisorCandidate = 5`: Loop condition `processingValue > 1n` (i.e., `1n > 1n`) is false. Outer loop terminates.
 * 8. `processingValue` is `1n`. Not `!== 1n`.
 * 9. `assembledDigits.reverse()` -> `[6, 8]`.
 * 10. `assembledDigits.join('')` -> `"68"`.
 * 11. Return `"68"`.
 * Time Complexity: O(log N * D^2)
 * Space Complexity: O(log N)
 */
var smallestNumber = function (n) {
  if (n < 10) {
    return n.toString();
  }

  const assembledDigits = [];
  let processingValue = BigInt(n);

  for (
    let divisorCandidate = 9;
    divisorCandidate > 1 && processingValue > 1n;
    divisorCandidate--
  ) {
    const bigDivisorCandidate = BigInt(divisorCandidate);
    while (processingValue % bigDivisorCandidate === 0n) {
      assembledDigits.push(divisorCandidate);
      processingValue /= bigDivisorCandidate;
    }
  }

  if (processingValue !== 1n) {
    return "-1";
  }

  return assembledDigits.reverse().join("");
};
