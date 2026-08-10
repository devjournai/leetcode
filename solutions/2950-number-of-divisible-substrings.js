/**
 * Number Of Divisible Substrings
 * Intuition: The core condition is `Sum(substring_values) % substring_length == 0`.
 * Since each character maps to a digit between 1 and 9, the average value of characters in any substring must also be between 1 and 9.
 * If `Sum(substring_values) % substring_length == 0`, then `Sum(substring_values) / substring_length` must be an integer quotient.
 * This quotient must also be an integer from 1 to 9.
 * Thus, the problem reduces to counting substrings where `Sum(substring_values) / substring_length = q` for each `q` from 1 to 9.
 * This is equivalent to `Sum(substring_values) - substring_length * q = 0`.
 * This can be efficiently solved using a prefix sum approach for each possible quotient `q`.
 * Approach:
 * 1. Initialize a counter `totalDivisibleSubstrings` to zero.
 * 2. Iterate through `possibleQuotient` from 1 to 9 (inclusive). This `possibleQuotient` represents the target average value for a substring.
 * 3. For each `possibleQuotient`:
 *    a. Initialize `currentRunningSum` to zero.
 *    b. Create a `Map` named `sumOccurrences` to store frequencies of `currentRunningSum` values encountered so far. Initialize `sumOccurrences` with `(0, 1)` to account for substrings starting from the beginning of the `word`.
 *    c. Iterate through each character `charValue` in the input `word` string.
 *       i. Convert `charValue` to its corresponding digit using the formula: `characterDigit = 9 - Math.floor((122 - charValue.charCodeAt(0)) / 3)`.
 *       ii. Update `currentRunningSum`: `currentRunningSum += characterDigit - possibleQuotient`.
 *       iii. Add the count of `currentRunningSum` from `sumOccurrences` to `totalDivisibleSubstrings`. This accounts for all substrings ending at the current position whose sum of `(characterDigit - possibleQuotient)` is zero.
 *       iv. Increment the count for `currentRunningSum` in `sumOccurrences`.
 * 4. Return `totalDivisibleSubstrings`.
 * Dry Run: word = "aba"
 * ('a' -> 1, 'b' -> 1)
 *
 * totalDivisibleSubstrings = 0
 *
 * For possibleQuotient = 1:
 *   currentRunningSum = 0
 *   sumOccurrences = {0: 1}
 *
 *   charValue = 'a' (index 0):
 *     characterDigit = 1
 *     currentRunningSum = 0 + (1 - 1) = 0
 *     totalDivisibleSubstrings += sumOccurrences.get(0) (which is 1) => totalDivisibleSubstrings = 1
 *     sumOccurrences.set(0, 2) => {0: 2}
 *   charValue = 'b' (index 1):
 *     characterDigit = 1
 *     currentRunningSum = 0 + (1 - 1) = 0
 *     totalDivisibleSubstrings += sumOccurrences.get(0) (which is 2) => totalDivisibleSubstrings = 1 + 2 = 3
 *     sumOccurrences.set(0, 3) => {0: 3}
 *   charValue = 'a' (index 2):
 *     characterDigit = 1
 *     currentRunningSum = 0 + (1 - 1) = 0
 *     totalDivisibleSubstrings += sumOccurrences.get(0) (which is 3) => totalDivisibleSubstrings = 3 + 3 = 6
 *     sumOccurrences.set(0, 4) => {0: 4}
 *
 * For possibleQuotient = 2 to 9:
 *   (The characterDigits for 'a' and 'b' are 1. So `characterDigit - possibleQuotient` will be negative.
 *   `currentRunningSum` will never be 0 again unless the initial `currentRunningSum` was `0` and `characterDigit - possibleQuotient` was `0`.
 *   Since `characterDigit` is always 1, `1 - possibleQuotient` is 0 only if `possibleQuotient` is 1.
 *   Thus, no new substrings will be found for `possibleQuotient` > 1.)
 *
 * Final totalDivisibleSubstrings = 6.
 * Substrings are: "a", "b", "a", "ab", "ba", "aba". All have average value 1.
 *
 * Time Complexity: O(K * N)
 * Space Complexity: O(N)
 */
var countDivisibleSubstrings = function (word) {
  let totalDivisibleSubstrings = 0;

  for (let possibleQuotient = 1; possibleQuotient <= 9; possibleQuotient++) {
    const sumOccurrences = new Map();
    sumOccurrences.set(0, 1);
    let currentRunningSum = 0;

    for (const charInstance of word) {
      const charCodeValue = charInstance.charCodeAt(0);
      const characterDigit = 9 - Math.floor((122 - charCodeValue) / 3);
      currentRunningSum += characterDigit - possibleQuotient;

      totalDivisibleSubstrings += sumOccurrences.get(currentRunningSum) || 0;
      sumOccurrences.set(
        currentRunningSum,
        (sumOccurrences.get(currentRunningSum) || 0) + 1,
      );
    }
  }

  return totalDivisibleSubstrings;
};
