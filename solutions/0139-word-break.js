/**
 * Word Break
 * Intuition: A prefix of `s` can be segmented iff some earlier breakable prefix plus a dictionary word covers the rest. Dynamic programming over prefixes, with a set for dictionary lookup, avoids recomputing the same cuts.
 * Approach: 1. Build `wordLookupSet` from `wordDict`. 2. Allocate `breakableStates` of length `mainStringLength + 1`, all false, and set `breakableStates[0] = true` (empty prefix is valid). 3. For `currentSegmentEnd` from 1 to `mainStringLength`, scan `currentSegmentStart` from 0 to `currentSegmentEnd - 1`. 4. If `breakableStates[currentSegmentStart]` is true and `s.substring(currentSegmentStart, currentSegmentEnd)` is in `wordLookupSet`, set `breakableStates[currentSegmentEnd] = true` and `break` the inner loop. 5. Return `breakableStates[mainStringLength]`.
 * Dry Run: s = "leetcode", wordDict = ["leet","code"]
 * breakableStates starts [true, false, false, false, false, false, false, false, false]
 * end=4, start=0: "leet" in dict → breakableStates[4] = true
 * end=8, start=4: "code" in dict → breakableStates[8] = true
 * Result: true
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
          currentSegmentEnd
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
