/**
 * Check If Numbers Are Ascending In A Sentence
 * Intuition: To verify if numbers in a sentence are strictly ascending, we need to extract only the numeric tokens and compare each one to the previous number found, ensuring it's strictly greater.
 * Approach: 1. Split the input string into individual tokens using space as a delimiter. 2. Initialize a variable to keep track of the last seen number, setting it to a value guaranteed to be smaller than any valid input number (e.g., 0, since numbers are positive). 3. Iterate through each token. 4. For each token, attempt to convert it to a number. If the conversion results in a valid number, compare it with the last seen number. 5. If the current number is not strictly greater than the last seen number, return `false`. 6. Otherwise, update the last seen number to the current number and continue. 7. If the loop completes without returning `false`, all numbers were strictly ascending, so return `true`.
 * Dry Run:
 * Input: s = "1 box has 3 blue 4 red"
 *
 * 1. `sentenceTokens` = ["1", "box", "has", "3", "blue", "4", "red"]
 * 2. `lastSeenNumber` = 0
 *
 * Loop through `sentenceTokens`:
 * - `currentTokenString` = "1":
 *   - `parsedNumberValue` = Number("1") = 1. `!isNaN(1)` is true.
 *   - Is `1 <= lastSeenNumber` (0)? No.
 *   - `lastSeenNumber` becomes 1.
 * - `currentTokenString` = "box":
 *   - `parsedNumberValue` = Number("box") = NaN. `!isNaN(NaN)` is false. Skip.
 * - `currentTokenString` = "has":
 *   - `parsedNumberValue` = Number("has") = NaN. `!isNaN(NaN)` is false. Skip.
 * - `currentTokenString` = "3":
 *   - `parsedNumberValue` = Number("3") = 3. `!isNaN(3)` is true.
 *   - Is `3 <= lastSeenNumber` (1)? No.
 *   - `lastSeenNumber` becomes 3.
 * - `currentTokenString` = "blue":
 *   - `parsedNumberValue` = Number("blue") = NaN. `!isNaN(NaN)` is false. Skip.
 * - `currentTokenString` = "4":
 *   - `parsedNumberValue` = Number("4") = 4. `!isNaN(4)` is true.
 *   - Is `4 <= lastSeenNumber` (3)? No.
 *   - `lastSeenNumber` becomes 4.
 * - `currentTokenString` = "red":
 *   - `parsedNumberValue` = Number("red") = NaN. `!isNaN(NaN)` is false. Skip.
 *
 * Loop finishes. Return `true`.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var areNumbersAscending = function (s) {
  const sentenceTokens = s.split(" ");
  let lastSeenNumber = 0;

  for (const currentTokenString of sentenceTokens) {
    const parsedNumberValue = Number(currentTokenString);
    if (!isNaN(parsedNumberValue)) {
      if (parsedNumberValue <= lastSeenNumber) {
        return false;
      }
      lastSeenNumber = parsedNumberValue;
    }
  }

  return true;
};
