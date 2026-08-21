/**
 * Excel Sheet Column Number
 * Intuition: Excel titles are base-26 numbers with A=1 ... Z=26. Walk left to right, multiplying the running value by 26 and adding the next letter's weight.
 * Approach: 1. Start at 0. 2. For each character, convert A–Z to 1–26 via charCodeAt(0) - 64. 3. Set result = result * 26 + that weight. 4. Return the accumulated column number.
 * Dry Run: columnTitle = "AB".
 *   - 'A' → 1; result = 0 * 26 + 1 = 1.
 *   - 'B' → 2; result = 1 * 26 + 2 = 28.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var titleToNumber = function (columnTitle) {
  let currentColumnNumber = 0;
  const titleLength = columnTitle.length;

  for (let charIndex = 0; charIndex < titleLength; charIndex++) {
    const currentCharValue = columnTitle[charIndex];
    const numericWeight = currentCharValue.charCodeAt(0) - 64;

    currentColumnNumber = currentColumnNumber * 26 + numericWeight;
  }

  return currentColumnNumber;
};
