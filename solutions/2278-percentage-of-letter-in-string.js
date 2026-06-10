/**
 * Percentage Of Letter In String
 * Intuition: To determine the percentage of a specific character within a string, we first need to count how many times that character appears. This count is then divided by the total number of characters in the string, and the resulting ratio is multiplied by 100 to express it as a percentage. Finally, the problem requires rounding this percentage down to the nearest whole number.
 * Approach: 1. Initialize a numerical counter, `letterOccurrences`, to zero, which will track the frequency of the target character. 2. Determine the total length of the input string `s` and store it in `totalStringLength`. 3. Implement a standard `for` loop to iterate through the string, with `currentIdx` ranging from 0 up to `totalStringLength - 1`. 4. Inside the loop, extract the character at `currentIdx` as `charAtIndex`. 5. Compare `charAtIndex` with the provided `letter`. If they are identical, increment `letterOccurrences`. 6. After the loop completes, calculate the `unroundedPercent` by dividing `letterOccurrences` by `totalStringLength` and multiplying the result by 100. 7. Use `Math.floor()` on `unroundedPercent` to obtain `finalRoundedPercent`, ensuring it is rounded down to the nearest whole number. 8. Return `finalRoundedPercent`.
 * Dry Run: s = "hello", letter = "l"
 *   1. Initialize `letterOccurrences = 0`.
 *   2. `totalStringLength = 5` (length of "hello").
 *   3. Begin `for` loop:
 *      - `currentIdx = 0`: `charAtIndex = 'h'`. 'h' !== 'l'. `letterOccurrences` remains 0.
 *      - `currentIdx = 1`: `charAtIndex = 'e'`. 'e' !== 'l'. `letterOccurrences` remains 0.
 *      - `currentIdx = 2`: `charAtIndex = 'l'`. 'l' === 'l'. `letterOccurrences` increments to 1.
 *      - `currentIdx = 3`: `charAtIndex = 'l'`. 'l' === 'l'. `letterOccurrences` increments to 2.
 *      - `currentIdx = 4`: `charAtIndex = 'o'`. 'o' !== 'l'. `letterOccurrences` remains 2.
 *   4. Loop finishes. `letterOccurrences` is 2.
 *   5. Calculate `unroundedPercent = (2 / 5) * 100 = 0.4 * 100 = 40`.
 *   6. Calculate `finalRoundedPercent = Math.floor(40) = 40`.
 *   7. Return 40.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var percentageLetter = function (s, letter) {
  let letterOccurrences = 0;
  let totalStringLength = s.length;

  for (let currentIdx = 0; currentIdx < totalStringLength; currentIdx++) {
    let charAtIndex = s[currentIdx];
    if (charAtIndex === letter) {
      letterOccurrences++;
    }
  }

  let unroundedPercent = (letterOccurrences / totalStringLength) * 100;
  let finalRoundedPercent = Math.floor(unroundedPercent);

  return finalRoundedPercent;
};
