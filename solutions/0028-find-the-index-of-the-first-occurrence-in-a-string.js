/**
 * Implement Strstr
 * Intuition: Brute-force: try every start `outerIndex` where `needle` could fit, compare character by character, and return the first full match (or 0 for empty needle).
 * Approach: 1. Return 0 if `needleLength === 0`, -1 if needle is longer than haystack. 2. For `outerIndex` from 0 to `haystackLength - needleLength`. 3. Inner loop sets `matchFound=false` on the first mismatch. 4. If the inner loop succeeds, return `outerIndex`. 5. Return -1.
 * Dry Run: haystack = "sadbutsad", needle = "sad".
 *   - outerIndex=0: s,a,d all match → return 0.
 * Time Complexity: O(H * N)
 * Space Complexity: O(1)
 */
var strStr = function (haystack, needle) {
  const haystackLength = haystack.length;
  const needleLength = needle.length;

  if (needleLength === 0) {
    return 0;
  }

  if (needleLength > haystackLength) {
    return -1;
  }

  for (
    let outerIndex = 0;
    outerIndex <= haystackLength - needleLength;
    outerIndex++
  ) {
    let matchFound = true;
    for (let innerIndex = 0; innerIndex < needleLength; innerIndex++) {
      if (haystack[outerIndex + innerIndex] !== needle[innerIndex]) {
        matchFound = false;
        break;
      }
    }
    if (matchFound) {
      return outerIndex;
    }
  }

  return -1;
};
