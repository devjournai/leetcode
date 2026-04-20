/**
 * Split Concatenated Strings
 * Time Complexity: O(L^2)
 * Space Complexity: O(L)
 */
var splitLoopedString = function (strs) {
  const processedStrings = strs.map((inputString) => {
    const reversedSegment = inputString.split("").reverse().join("");
    return inputString > reversedSegment ? inputString : reversedSegment;
  });

  let longestOverallString = "";
  const numSegments = processedStrings.length;

  for (let segmentIndex = 0; segmentIndex < numSegments; segmentIndex++) {
    const originalSegment = strs[segmentIndex];
    const reversedOriginalSegment = originalSegment
      .split("")
      .reverse()
      .join("");

    const segmentsAfterCurrent = processedStrings.slice(segmentIndex + 1);
    const segmentsBeforeCurrent = processedStrings.slice(0, segmentIndex);
    const middleConcatenation =
      segmentsAfterCurrent.join("") + segmentsBeforeCurrent.join("");

    for (const segmentOrientation of [
      originalSegment,
      reversedOriginalSegment,
    ]) {
      for (
        let cutPoint = 0;
        cutPoint <= segmentOrientation.length;
        cutPoint++
      ) {
        const leadingPart = segmentOrientation.substring(cutPoint);
        const trailingPart = segmentOrientation.substring(0, cutPoint);
        const currentCandidate =
          leadingPart + middleConcatenation + trailingPart;

        if (currentCandidate > longestOverallString) {
          longestOverallString = currentCandidate;
        }
      }
    }
  }

  return longestOverallString;
};
