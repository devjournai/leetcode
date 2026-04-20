/**
 * Swap For Longest Repeated Character Substring
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

  for (mainTraversalIndex = 0; mainTraversalIndex < text.length; ) {
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
          totalAvailableCharacters,
        ),
      );
    }

    overallMaxLength = Math.max(
      overallMaxLength,
      Math.min(
        currentSegmentLength +
          (totalAvailableCharacters > currentSegmentLength ? 1 : 0),
        totalAvailableCharacters,
      ),
    );

    mainTraversalIndex = segmentEndProbe;
  }

  return overallMaxLength;
};
