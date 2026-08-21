/**
 * Add Bold Tag In String
 * Intuition: Find every occurrence of each word as a half-open interval, merge overlapping/adjacent intervals, then wrap merged spans with `<b></b>` while copying the rest of `s` unchanged.
 * Approach: 1. For each `currentWord`, repeated `s.indexOf` from `currentSearchIndex+1` pushes `[start, start+len]`. 2. If none, return `s`. 3. Sort intervals by start then end. 4. Merge when `nextSegmentStart <= activeMergedEnd`. 5. Walk `mergedBoldSegments`, append `s.slice` plus `boldOpenTag`/`boldCloseTag`.
 * Dry Run: s="abcxyz123", words=["abc","123"].
 *   - Intervals [0,3],[6,9]. No merge. Output "<b>abc</b>xyz<b>123</b>".
 * Time Complexity: O(S * W * L_max + N log N)
 * Space Complexity: O(S * W)
 */
var addBoldTag = function (s, words) {
  const allFoundIntervals = [];

  for (const currentWord of words) {
    let currentSearchIndex = s.indexOf(currentWord);
    const currentWordLength = currentWord.length;
    while (currentSearchIndex !== -1) {
      allFoundIntervals.push([
        currentSearchIndex,
        currentSearchIndex + currentWordLength,
      ]);
      currentSearchIndex = s.indexOf(currentWord, currentSearchIndex + 1);
    }
  }

  if (allFoundIntervals.length === 0) {
    return s;
  }

  allFoundIntervals.sort((firstPair, secondPair) => {
    if (firstPair[0] !== secondPair[0]) {
      return firstPair[0] - secondPair[0];
    }
    return firstPair[1] - secondPair[1];
  });

  const mergedBoldSegments = [];
  let activeMergedStart = allFoundIntervals[0][0];
  let activeMergedEnd = allFoundIntervals[0][1];

  for (
    let segmentIterator = 1;
    segmentIterator < allFoundIntervals.length;
    ++segmentIterator
  ) {
    const nextSegment = allFoundIntervals[segmentIterator];
    const nextSegmentStart = nextSegment[0];
    const nextSegmentEnd = nextSegment[1];

    if (nextSegmentStart <= activeMergedEnd) {
      activeMergedEnd = Math.max(activeMergedEnd, nextSegmentEnd);
    } else {
      mergedBoldSegments.push([activeMergedStart, activeMergedEnd]);
      activeMergedStart = nextSegmentStart;
      activeMergedEnd = nextSegmentEnd;
    }
  }
  mergedBoldSegments.push([activeMergedStart, activeMergedEnd]);

  let finalFormattedString = "";
  let lastUnboldedIndex = 0;
  const boldOpenTag = "<b>";
  const boldCloseTag = "</b>";

  for (const boldRange of mergedBoldSegments) {
    const rangeStart = boldRange[0];
    const rangeEnd = boldRange[1];

    finalFormattedString += s.slice(lastUnboldedIndex, rangeStart);
    finalFormattedString += boldOpenTag;
    finalFormattedString += s.slice(rangeStart, rangeEnd);
    finalFormattedString += boldCloseTag;

    lastUnboldedIndex = rangeEnd;
  }

  finalFormattedString += s.slice(lastUnboldedIndex);

  return finalFormattedString;
};
