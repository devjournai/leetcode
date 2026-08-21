/**
 * Distinct Echo Substrings
 * Intuition: An echo is XX for some string X. Sliding a window of length L and counting L consecutive equal pairs finds those concatenations.
 * Approach: 1. For each half-length L, scan i vs i+L. 2. Track consecutive character matches. 3. When matches hit L, record text[i-L+1 .. i+L] in a set and decrement the streak. 4. Return set size.
 * Dry Run: text = "abcabcabc". Echoes include "abcabc" (twice overlapping) and "bcabca", "cabcab" → 3 distinct.
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
