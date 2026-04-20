/**
 * Get Equal Substrings Within Budget
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var equalSubstring = function (s, t, maxCost) {
  let windowStartPointer = 0;
  let currentWindowTotalCost = 0;
  let maximumPossibleLength = 0;

  let stringIterator = 0;
  let stringLengthValue = s.length;

  while (stringIterator < stringLengthValue) {
    let charSCode = s.charCodeAt(stringIterator);
    let charTCode = t.charCodeAt(stringIterator);
    let absoluteDifference = Math.abs(charSCode - charTCode);

    currentWindowTotalCost += absoluteDifference;

    while (currentWindowTotalCost > maxCost) {
      let firstCharSCode = s.charCodeAt(windowStartPointer);
      let firstCharTCode = t.charCodeAt(windowStartPointer);
      let firstAbsoluteDifference = Math.abs(firstCharSCode - firstCharTCode);

      currentWindowTotalCost -= firstAbsoluteDifference;
      windowStartPointer++;
    }

    let currentWindowSize = stringIterator - windowStartPointer + 1;
    if (currentWindowSize > maximumPossibleLength) {
      maximumPossibleLength = currentWindowSize;
    }

    stringIterator++;
  }

  return maximumPossibleLength;
};
