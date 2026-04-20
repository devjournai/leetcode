/**
 * Maximum Length Of A Concatenated String With Unique Characters
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
    arrayIndexStart,
  ) {
    overallMaximumLength = Math.max(
      overallMaximumLength,
      currentConcatenatedLength,
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
          iterationIndex + 1,
        );
      }
    }
  }

  buildUniqueCombinations(0, 0, 0);
  return overallMaximumLength;
};
