/**
 * Unique Substrings In Wraparound String
 * Intuition: Unique wraparound substrings are the contiguous alphabetical runs (…yzabc…). For each ending letter it is enough to keep the longest such run seen; shorter prefixes of that run are already counted by that length.
 * Approach: 1. `maximumLengthsEndingWithChar[26]` starts at 0. 2. Scan `s`; consecutive if `(currentCode - previousCode - 1) % 26 === 0` (covers +1 and z→a), else reset the run to 1. 3. For letter `s[i]` store max(run length, previous max at that letter). 4. Sum the 26 maxima.
 * Dry Run: s = "zab".
 *   - z: run 1, max['z']=1.
 *   - a: (97-122-1)%26 = 0, run 2, max['a']=2.
 *   - b: (98-97-1)%26 = 0, run 3, max['b']=3.
 *   - Sum 1+2+3 = 6 (a, b, z, za, ab, zab).
 * Time Complexity: O(s.length)
 * Space Complexity: O(1)
 */
var findSubstringInWraproundString = function (s) {
  if (s.length === 0) {
    return 0;
  }

  const maximumLengthsEndingWithChar = new Array(26).fill(0);
  let currentConsecutiveRunLength = 0;

  for (let iteratorIndex = 0; iteratorIndex < s.length; iteratorIndex++) {
    let currentCharCodeValue = s.charCodeAt(iteratorIndex);
    let previousCharDifference = 0;

    if (iteratorIndex > 0) {
      let previousCharCodeValue = s.charCodeAt(iteratorIndex - 1);
      previousCharDifference =
        (currentCharCodeValue - previousCharCodeValue - 1) % 26;
    }

    if (iteratorIndex === 0 || previousCharDifference === 0) {
      currentConsecutiveRunLength++;
    } else {
      currentConsecutiveRunLength = 1;
    }

    let charMappingIndex = currentCharCodeValue - 97;
    maximumLengthsEndingWithChar[charMappingIndex] = Math.max(
      maximumLengthsEndingWithChar[charMappingIndex],
      currentConsecutiveRunLength
    );
  }

  let totalUniqueSubstringsCount = 0;
  for (let currentLengthValue of maximumLengthsEndingWithChar) {
    totalUniqueSubstringsCount += currentLengthValue;
  }

  return totalUniqueSubstringsCount;
};
