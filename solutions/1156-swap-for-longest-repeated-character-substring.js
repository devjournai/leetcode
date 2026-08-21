/**
 * Swap For Longest Repeated Character Substring
 * Intuition: One swap can extend a run of character c by 1, or join two c-runs separated by one other character, limited by the global count of c.
 * Approach: 1. Count each letter. 2. Walk runs of equal chars. 3. For a run of length L, answer is min(L+1 if extra c exists, total c). 4. If the next char is a gap of 1, also consider joining the following same-letter run, capped by total c. 5. Advance to the next run.
 * Dry Run: text = "ababa".
 *   - Each 'a' run length 1, extra a exists so 2; joining across one b gives min(1+1+1,3)=3.
 *   - Answer 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxRepOpt1 = function (text) {
  const characterCounts = new Map();
  for (const charItem of text) {
    characterCounts.set(charItem, (characterCounts.get(charItem) || 0) + 1);
  }

  let overallMaxLength = 0;
  let mainTraversalIndex = 0;

  for (mainTraversalIndex = 0; mainTraversalIndex < text.length;) {
    const segmentCharIdentifier = text[mainTraversalIndex];
    const currentSegmentStartIndex = mainTraversalIndex;

    let segmentEndProbe = mainTraversalIndex;
    while (
      segmentEndProbe < text.length &&
      text[segmentEndProbe] === segmentCharIdentifier
    ) {
      segmentEndProbe++;
    }
    const currentSegmentLength = segmentEndProbe - currentSegmentStartIndex;

    const totalAvailableCharacters = characterCounts.get(segmentCharIdentifier);

    if (
      currentSegmentEndProbe + 1 < text.length &&
      totalAvailableCharacters > currentSegmentLength
    ) {
      const gapCharacterPosition = currentSegmentEndProbe + 1;
      let afterGapSegmentProbe = gapCharacterPosition;
      while (
        afterGapSegmentProbe < text.length &&
        text[afterGapSegmentProbe] === segmentCharIdentifier
      ) {
        afterGapSegmentProbe++;
      }
      const afterGapSegmentLength = afterGapSegmentProbe - gapCharacterPosition;

      overallMaxLength = Math.max(
        overallMaxLength,
        Math.min(
          currentSegmentLength + afterGapSegmentLength + 1,
          totalAvailableCharacters
        )
      );
    }

    overallMaxLength = Math.max(
      overallMaxLength,
      Math.min(
        currentSegmentLength +
          (totalAvailableCharacters > currentSegmentLength ? 1 : 0),
        totalAvailableCharacters
      )
    );

    mainTraversalIndex = segmentEndProbe;
  }

  return overallMaxLength;
};
