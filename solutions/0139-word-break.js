/**
 * Word Break
 * Time Complexity: O(N^3 + D*W)
 * Space Complexity: O(N + D*W)
 */
var wordBreak = function (s, wordDict) {
  const mainStringLength = s.length;
  const wordLookupSet = new Set(wordDict);

  const breakableStates = new Array(mainStringLength + 1).fill(false);
  breakableStates[0] = true;

  for (
    let currentSegmentEnd = 1;
    currentSegmentEnd <= mainStringLength;
    currentSegmentEnd++
  ) {
    for (
      let currentSegmentStart = 0;
      currentSegmentStart < currentSegmentEnd;
      currentSegmentStart++
    ) {
      if (breakableStates[currentSegmentStart]) {
        const subStringToCheck = s.substring(
          currentSegmentStart,
          currentSegmentEnd,
        );
        if (wordLookupSet.has(subStringToCheck)) {
          breakableStates[currentSegmentEnd] = true;
          break;
        }
      }
    }
  }

  return breakableStates[mainStringLength];
};
