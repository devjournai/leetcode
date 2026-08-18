/**
 * Find Beautiful Indices In The Given Array I
 * Intuition: An index i is beautiful when s starts with a at i and some occurrence of b starts at j with |j - i| <= k. Finding all occurrences with KMP, then scanning them with two pointers, answers every i in linear extra time.
 * Approach: 1. Build the longest-prefix-suffix array of a pattern. 2. Run KMP to collect every start index of a and of b in s. 3. Walk indicesA from left to right, advancing a pointer in indicesB until the current b-index is at least i - k. 4. Keep i when that b-index is also at most i + k.
 * Dry Run: s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
 *   1. KMP finds a at [16, 33] and b at [4, 22].
 *   2. For i = 16, the pointer moves to j = 22, |22 - 16| = 6 <= 15, so 16 is beautiful.
 *   3. For i = 33, j stays 22, |22 - 33| = 11 <= 15, so 33 is beautiful.
 *   4. Answer is [16, 33].
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
