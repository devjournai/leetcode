/**
 * Palindrome Partitioning Iv
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var checkPartitioning = function (s) {
  const stringLength = s.length;
  const palindromeDpTable = Array.from({ length: stringLength }, () =>
    Array(stringLength).fill(false),
  );

  for (let currentStart = stringLength - 1; currentStart >= 0; currentStart--) {
    for (
      let currentEnd = currentStart;
      currentEnd < stringLength;
      currentEnd++
    ) {
      const areBoundaryCharsEqual = s[currentStart] === s[currentEnd];
      const isLengthShort = currentEnd - currentStart <= 2;
      const innerSegmentIsPalindrome =
        palindromeDpTable[currentStart + 1][currentEnd - 1];

      if (
        areBoundaryCharsEqual &&
        (isLengthShort || innerSegmentIsPalindrome)
      ) {
        palindromeDpTable[currentStart][currentEnd] = true;
      }
    }
  }

  for (
    let firstSplitPoint = 1;
    firstSplitPoint < stringLength - 1;
    firstSplitPoint++
  ) {
    for (
      let secondSplitPoint = firstSplitPoint + 1;
      secondSplitPoint < stringLength;
      secondSplitPoint++
    ) {
      const firstSegmentStart = 0;
      const firstSegmentEnd = firstSplitPoint - 1;

      const secondSegmentStart = firstSplitPoint;
      const secondSegmentEnd = secondSplitPoint - 1;

      const thirdSegmentStart = secondSplitPoint;
      const thirdSegmentEnd = stringLength - 1;

      const isFirstPartPalindrome =
        palindromeDpTable[firstSegmentStart][firstSegmentEnd];
      const isSecondPartPalindrome =
        palindromeDpTable[secondSegmentStart][secondSegmentEnd];
      const isThirdPartPalindrome =
        palindromeDpTable[thirdSegmentStart][thirdSegmentEnd];

      if (
        isFirstPartPalindrome &&
        isSecondPartPalindrome &&
        isThirdPartPalindrome
      ) {
        return true;
      }
    }
  }

  return false;
};
