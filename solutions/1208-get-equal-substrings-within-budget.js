/**
 * Get Equal Substrings Within Budget
 * Intuition: Changing s[i] to t[i] costs |s[i]-t[i]|; the longest affordable contiguous change is a sliding window on that cost array.
 * Approach: 1. Expand right, adding the abs char-code cost. 2. While cost > maxCost shrink from the left. 3. Track max window length.
 * Dry Run: s="abcd", t="bcdf", maxCost=3. Costs [1,1,1,2]. Window of length 3 costs 3 → 3.
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
