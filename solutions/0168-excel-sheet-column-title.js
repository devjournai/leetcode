/**
 * Excel Sheet Column Title
 * Intuition: Titles are 1-indexed base-26 (A=1 … Z=26, AA=27). Subtracting 1 before `% 26` maps remainders 0–25 onto A–Z, then integer-divide by 26.
 * Approach: 1. While `currentNumber > 0`, `remainderValue = (currentNumber - 1) % 26`, push `String.fromCharCode(65 + remainderValue)`, then `currentNumber = floor((currentNumber - 1) / 26)`. 2. Reverse `resultingCharacters` and join.
 * Dry Run: columnNumber = 28
 * 27 % 26 = 1 → 'B', n = 1; 0 % 26 = 0 → 'A'; reverse → "AB"
 * Time Complexity: O(log_26(columnNumber))
 * Space Complexity: O(log_26(columnNumber))
 */
var convertToTitle = function (columnNumber) {
  let currentNumber = columnNumber;
  let resultingCharacters = [];
  const asciiOffset = 65;

  while (currentNumber > 0) {
    let remainderValue = (currentNumber - 1) % 26;
    let computedChar = String.fromCharCode(asciiOffset + remainderValue);
    resultingCharacters.push(computedChar);
    currentNumber = Math.floor((currentNumber - 1) / 26);
  }

  return resultingCharacters.reverse().join("");
};
