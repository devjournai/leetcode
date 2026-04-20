/**
 * Distinct Echo Substrings
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^3)
 */
var distinctEchoSubstrings = function (text) {
  const uniqueEchoes = new Set();

  const totalLength = text.length;
  if (totalLength < 2) {
    return 0;
  }

  for (
    let segmentLength = 1;
    segmentLength <= Math.floor(totalLength / 2);
    segmentLength++
  ) {
    let consecutiveMatches = 0;

    for (
      let firstCharIndex = 0;
      firstCharIndex < totalLength - segmentLength;
      firstCharIndex++
    ) {
      let secondCharIndex = firstCharIndex + segmentLength;

      if (text[firstCharIndex] === text[secondCharIndex]) {
        consecutiveMatches++;
      } else {
        consecutiveMatches = 0;
      }

      if (consecutiveMatches === segmentLength) {
        const echoStart = firstCharIndex - segmentLength + 1;
        const echoEnd = secondCharIndex + 1;
        uniqueEchoes.add(text.slice(echoStart, echoEnd));
        consecutiveMatches--;
      }
    }
  }

  return uniqueEchoes.size;
};
