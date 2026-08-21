/**
 * Longest Happy Prefix
 * Intuition: A happy prefix is a proper prefix that is also a suffix. KMP LPS[n-1] is exactly the length of the longest such border.
 * Approach: 1. Build the LPS array: for i from 1, while mismatch fall back to lps[len-1], else increment len on match. 2. Return s.slice(0, lps[n-1]).
 * Dry Run: s = "level".
 *   - LPS ends at 1 ("l"). Return "l". For "ababab", LPS last is 4 → "abab".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestPrefix = function (s) {
  const stringLengthIdentifier = s.length;

  if (stringLengthIdentifier === 0) {
    return "";
  }

  let currentLpsMatchLength = 0;
  const lpsValueStorage = new Array(stringLengthIdentifier).fill(0);

  for (
    let stringIterationIndex = 1;
    stringIterationIndex < stringLengthIdentifier;
    stringIterationIndex++
  ) {
    while (
      currentLpsMatchLength > 0 &&
      s[stringIterationIndex] !== s[currentLpsMatchLength]
    ) {
      currentLpsMatchLength = lpsValueStorage[currentLpsMatchLength - 1];
    }

    if (s[stringIterationIndex] === s[currentLpsMatchLength]) {
      currentLpsMatchLength++;
    }

    lpsValueStorage[stringIterationIndex] = currentLpsMatchLength;
  }

  const resultLength = lpsValueStorage[stringLengthIdentifier - 1];
  return s.slice(0, resultLength);
};
