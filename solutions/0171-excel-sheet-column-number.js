/**
 * Excel Sheet Column Number
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
