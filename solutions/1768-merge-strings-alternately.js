/**
 * Merge Strings Alternately
 * Intuition: Emit one character from each string in lockstep, then append whichever string still has leftover characters.
 * Approach: 1. While both indices are in range, push `stringOne[indexOne]` then `stringTwo[indexTwo]`. 2. Drain remaining characters from each string into `resultContainer`. 3. Join and return.
 * Dry Run: word1 = "abc", word2 = "pqr".
 *   - a p, b q, c r → "apbqcr".
 * Time Complexity: O(n + m)
 * Space Complexity: O(n + m)
 */
var mergeAlternately = function (word1, word2) {
  let stringOne = word1;
  let stringTwo = word2;
  let firstLength = stringOne.length;
  let secondLength = stringTwo.length;
  let resultContainer = [];
  let indexOne = 0;
  let indexTwo = 0;

  while (indexOne < firstLength && indexTwo < secondLength) {
    resultContainer.push(stringOne[indexOne]);
    resultContainer.push(stringTwo[indexTwo]);
    indexOne++;
    indexTwo++;
  }

  while (indexOne < firstLength) {
    resultContainer.push(stringOne[indexOne]);
    indexOne++;
  }

  while (indexTwo < secondLength) {
    resultContainer.push(stringTwo[indexTwo]);
    indexTwo++;
  }

  return resultContainer.join("");
};
