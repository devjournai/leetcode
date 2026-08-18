/**
 * Find Beautiful Indices In The Given Array II
 * Intuition: Same as 3006, but the string is long enough that naive search would time out. KMP still lists every start of a and b, and a two-pointer scan checks |j - i| <= k in linear time.
 * Approach: 1. Build the LPS array of a pattern. 2. Run KMP to collect every occurrence of a and of b. 3. For each index of a, advance a pointer in b until j >= i - k, then accept i if j <= i + k.
 * Dry Run: s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
 *   1. Occurrences of a are [16, 33]; of b are [4, 22].
 *   2. Both 16 and 33 have a nearby b-index within distance 15.
 *   3. Answer is [16, 33].
 * Time Complexity: O(|s| + |a| + |b|)
 * Space Complexity: O(|s| + |a| + |b|)
 */
var beautifulIndices = function (s, a, b, k) {
  const getLps = (pattern) => {
    const longestPrefixSuffix = new Array(pattern.length).fill(0);
    let matchedLength = 0;
    for (let patternIndex = 1; patternIndex < pattern.length; patternIndex++) {
      while (
        matchedLength > 0 &&
        pattern[matchedLength] !== pattern[patternIndex]
      ) {
        matchedLength = longestPrefixSuffix[matchedLength - 1];
      }
      if (pattern[patternIndex] === pattern[matchedLength]) {
        matchedLength++;
        longestPrefixSuffix[patternIndex] = matchedLength;
      }
    }
    return longestPrefixSuffix;
  };

  const kmp = (text, pattern) => {
    const occurrences = [];
    if (pattern.length === 0 || pattern.length > text.length)
      return occurrences;
    const longestPrefixSuffix = getLps(pattern);
    let textIndex = 0;
    let patternIndex = 0;
    while (textIndex < text.length) {
      if (text[textIndex] === pattern[patternIndex]) {
        textIndex++;
        patternIndex++;
        if (patternIndex === pattern.length) {
          occurrences.push(textIndex - patternIndex);
          patternIndex = longestPrefixSuffix[patternIndex - 1];
        }
      } else if (patternIndex > 0) {
        patternIndex = longestPrefixSuffix[patternIndex - 1];
      } else {
        textIndex++;
      }
    }
    return occurrences;
  };

  const indicesA = kmp(s, a);
  const indicesB = kmp(s, b);
  const beautiful = [];
  let indicesBPointer = 0;

  for (const indexA of indicesA) {
    while (
      indicesBPointer < indicesB.length &&
      indicesB[indicesBPointer] - indexA < -k
    ) {
      indicesBPointer++;
    }
    if (
      indicesBPointer < indicesB.length &&
      indicesB[indicesBPointer] - indexA <= k
    ) {
      beautiful.push(indexA);
    }
  }

  return beautiful;
};
