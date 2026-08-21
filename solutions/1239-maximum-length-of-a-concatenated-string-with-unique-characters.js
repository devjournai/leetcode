/**
 * Maximum Length Of A Concatenated String With Unique Characters
 * Intuition: Drop strings with internal duplicates, encode the rest as bitmasks, and DFS combinations whose masks are disjoint.
 * Approach: 1. Build (mask, length) for duplicate-free words. 2. Recurse over remaining words; if mask & candidate == 0, OR and add lengths. 3. Track max length.
 * Dry Run: arr=["un","iq","ue"]. "un"+"iq"="uniq" length 4; adding "ue" overlaps → 4.
 * Time Complexity: O(N * L + N * 2^N)
 * Space Complexity: O(N)
 */
var maxLength = function (arr) {
  let processedStringsInformation = [];
  for (let currentStringItem of arr) {
    let characterBitmask = 0;
    let containsDuplicateCharacters = false;
    for (let singleCharacter of currentStringItem) {
      let characterCodeOffset =
        singleCharacter.charCodeAt(0) - "a".charCodeAt(0);
      let characterBitRepresentation = 1 << characterCodeOffset;
      if ((characterBitmask & characterBitRepresentation) !== 0) {
        containsDuplicateCharacters = true;
        break;
      }
      characterBitmask |= characterBitRepresentation;
    }
    if (!containsDuplicateCharacters) {
      processedStringsInformation.push({
        maskData: characterBitmask,
        lengthData: currentStringItem.length,
      });
    }
  }

  let overallMaximumLength = 0;

  function buildUniqueCombinations(
    currentConcatenatedMask,
    currentConcatenatedLength,
    arrayIndexStart
  ) {
    overallMaximumLength = Math.max(
      overallMaximumLength,
      currentConcatenatedLength
    );

    for (
      let iterationIndex = arrayIndexStart;
      iterationIndex < processedStringsInformation.length;
      iterationIndex++
    ) {
      let candidateStringObject = processedStringsInformation[iterationIndex];
      let candidateStringMask = candidateStringObject.maskData;
      let candidateStringLength = candidateStringObject.lengthData;

      if ((currentConcatenatedMask & candidateStringMask) === 0) {
        buildUniqueCombinations(
          currentConcatenatedMask | candidateStringMask,
          currentConcatenatedLength + candidateStringLength,
          iterationIndex + 1
        );
      }
    }
  }

  buildUniqueCombinations(0, 0, 0);
  return overallMaximumLength;
};
