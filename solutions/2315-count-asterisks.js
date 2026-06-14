/**
 * Count Asterisks
 * Intuition: The problem requires counting asterisks only when they are outside of any `|...|` pair. Each pair of vertical bars acts as a toggle for an "inside pair" state.
 * Approach: 1. Initialize a counter for asterisks and a boolean flag to track if we are currently "inside" a pair of vertical bars. 2. Iterate through each character of the input string. 3. If the current character is a vertical bar, toggle the "inside pair" flag. 4. If the current character is an asterisk AND the "inside pair" flag is false, increment the asterisk counter. 5. After iterating through all characters, return the total counted asterisks.
 * Dry Run: s = "l|*e*et|c**ode|"
 *   1. `totalAsterisks = 0`, `inForbiddenZone = false`
 *   2. `stringLength = 17`
 *   3. Loop `stringIndex` from 0 to 16:
 *      - `stringIndex = 0`, `currentSymbol = 'l'`: No change.
 *      - `stringIndex = 1`, `currentSymbol = '|'`: `inForbiddenZone` becomes `true`.
 *      - `stringIndex = 2`, `currentSymbol = '*'`: `inForbiddenZone` is `true`. No change.
 *      - `stringIndex = 3` to `6`: Chars 'e', '*', 'e', 't'. `inForbiddenZone` is `true`. No change.
 *      - `stringIndex = 7`, `currentSymbol = '|'`: `inForbiddenZone` becomes `false`.
 *      - `stringIndex = 8`, `currentSymbol = 'c'`: No change.
 *      - `stringIndex = 9`, `currentSymbol = '*'`: `inForbiddenZone` is `false`. `totalAsterisks` becomes `1`.
 *      - `stringIndex = 10`, `currentSymbol = '*'`: `inForbiddenZone` is `false`. `totalAsterisks` becomes `2`.
 *      - `stringIndex = 11` to `13`: Chars 'o', 'd', 'e'. No change.
 *      - `stringIndex = 14`, `currentSymbol = '|'`: `inForbiddenZone` becomes `true`.
 *      - `stringIndex = 15`, `currentSymbol = '|'`: `inForbiddenZone` becomes `false`.
 *      - `stringIndex = 16`: End of string.
 *   4. Return `totalAsterisks` (which is 2).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countAsterisks = function (s) {
  let totalAsterisks = 0;
  let inForbiddenZone = false;
  let stringLength = s.length;

  for (
    let currentSymbolIndex = 0;
    currentSymbolIndex < stringLength;
    ++currentSymbolIndex
  ) {
    let currentSymbol = s[currentSymbolIndex];
    if (currentSymbol === "|") {
      inForbiddenZone = !inForbiddenZone;
    } else if (currentSymbol === "*" && !inForbiddenZone) {
      totalAsterisks++;
    }
  }

  return totalAsterisks;
};
