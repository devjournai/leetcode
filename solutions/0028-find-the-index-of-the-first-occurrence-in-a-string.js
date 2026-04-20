/**
 * Implement Strstr
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
