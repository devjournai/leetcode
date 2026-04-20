/**
 * Maximum Number Of Non Overlapping Substrings
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxNumOfSubstrings = function (s) {
  const characterBounds = new Array(26).fill(null).map(() => [Infinity, -1]);

  for (
    let currentStringIndex = 0;
    currentStringIndex < s.length;
    currentStringIndex++
  ) {
    const charValue = s.charCodeAt(currentStringIndex) - 97;
    characterBounds[charValue][0] = Math.min(
      characterBounds[charValue][0],
      currentStringIndex,
    );
    characterBounds[charValue][1] = Math.max(
      characterBounds[charValue][1],
      currentStringIndex,
    );
  }

  const candidateSubstrings = [];
  for (let alphabetCharIndex = 0; alphabetCharIndex < 26; alphabetCharIndex++) {
    if (characterBounds[alphabetCharIndex][1] === -1) continue;

    let substringBegin = characterBounds[alphabetCharIndex][0];
    let substringFinish = characterBounds[alphabetCharIndex][1];
    let isCurrentRangeValid = true;

    let scanIndex = substringBegin;
    while (scanIndex <= substringFinish) {
      const charAtScanIndex = s.charCodeAt(scanIndex) - 97;
      if (characterBounds[charAtScanIndex][0] < substringBegin) {
        isCurrentRangeValid = false;
        break;
      }
      substringFinish = Math.max(
        substringFinish,
        characterBounds[charAtScanIndex][1],
      );
      scanIndex++;
    }

    if (isCurrentRangeValid) {
      candidateSubstrings.push([substringBegin, substringFinish]);
    }
  }

  candidateSubstrings.sort((firstInterval, secondInterval) => {
    const firstEnd = firstInterval[1];
    const secondEnd = secondInterval[1];
    if (firstEnd !== secondEnd) {
      return firstEnd - secondEnd;
    }
    const firstStart = firstInterval[0];
    const secondStart = secondInterval[0];
    return firstStart - secondStart;
  });

  const finalResult = [];
  let lastAcceptedFinish = -1;

  for (const currentInterval of candidateSubstrings) {
    const currentIntervalStart = currentInterval[0];
    const currentIntervalEnd = currentInterval[1];

    if (currentIntervalStart > lastAcceptedFinish) {
      finalResult.push(
        s.substring(currentIntervalStart, currentIntervalEnd + 1),
      );
      lastAcceptedFinish = currentIntervalEnd;
    }
  }

  return finalResult;
};
