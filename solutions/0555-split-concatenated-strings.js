/**
 * Split Concatenated Strings
 * Intuition: The loop can start at any character of any string, and each string may be reversed. For a lexicographic max, keep every non-cut string in its better orientation, then try both orientations of the cut string at every cut index.
 * Approach: 1. `processedStrings[i]` = max(strs[i], reverse(strs[i])). 2. For each cut segment, concat all other processed strings in loop order. 3. For original and reversed of the cut string, for each `cutPoint`, form `suffix + middle + prefix`. 4. Keep the lexicographically largest candidate.
 * Dry Run: strs = ["abc","xyz"].
 *   - Processed: "cba","zyx". Cutting "abc" at 0 with others "zyx" gives candidates; best is "zyxcba".
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
