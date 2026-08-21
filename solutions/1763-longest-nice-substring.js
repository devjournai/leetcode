/**
 * Longest Nice Substring
 * Intuition: A substring is nice when every letter appears in both cases. Letters missing their counterpart split the range into independent pieces, so divide-and-conquer on those splits finds the longest nice substring.
 * Approach: 1. `recurseFindNice` builds `segmentCharSet` and `badCharRegistry`. 2. If the segment is nice, keep it when longer than `maximalNiceSubstring`. 3. Otherwise split on bad characters and recurse. 4. Start on [0, n-1].
 * Dry Run: s = "YazaAay".
 *   - 'z' is unpaired, so split "Ya" | "aAa" | "y". "aAa" is nice length 3 → "aAa".
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var longestNiceSubstring = function (s) {
  let maximalNiceSubstring = "";

  function recurseFindNice(segmentBeginning, segmentEnd) {
    if (segmentEnd - segmentBeginning < 1) {
      return;
    }

    let segmentCharSet = new Set();
    let firstIterIndex = segmentBeginning;
    while (firstIterIndex <= segmentEnd) {
      segmentCharSet.add(s[firstIterIndex]);
      firstIterIndex++;
    }

    let currentSegmentIsNice = true;
    let badCharRegistry = new Set();

    let secondIterIndex = segmentBeginning;
    while (secondIterIndex <= segmentEnd) {
      let charToVerify = s[secondIterIndex];
      let lowerVer = charToVerify.toLowerCase();
      let upperVer = charToVerify.toUpperCase();

      if (!segmentCharSet.has(lowerVer) || !segmentCharSet.has(upperVer)) {
        currentSegmentIsNice = false;
        badCharRegistry.add(charToVerify);
      }
      secondIterIndex++;
    }

    if (currentSegmentIsNice) {
      let potentialNiceString = s.substring(segmentBeginning, segmentEnd + 1);
      if (potentialNiceString.length > maximalNiceSubstring.length) {
        maximalNiceSubstring = potentialNiceString;
      }
      return;
    }

    let splitStartPointer = segmentBeginning;
    let splitScanPointer = segmentBeginning;
    while (splitScanPointer <= segmentEnd) {
      let scanningChar = s[splitScanPointer];
      if (badCharRegistry.has(scanningChar)) {
        if (splitScanPointer > splitStartPointer) {
          recurseFindNice(splitStartPointer, splitScanPointer - 1);
        }
        splitStartPointer = splitScanPointer + 1;
      }
      splitScanPointer++;
    }

    if (splitStartPointer <= segmentEnd) {
      recurseFindNice(splitStartPointer, segmentEnd);
    }
  }

  if (s.length === 0) {
    return "";
  }

  recurseFindNice(0, s.length - 1);
  return maximalNiceSubstring;
};
