/**
 * Repeated Substring Pattern
 * Intuition: If s is made of a repeated block, some divisor length `k` of `|s|` (k ≤ n/2) has `s[0..k)` repeated n/k times equal to s.
 * Approach: 1. For `patternCandidateLength` from 1 to floor(n/2). 2. If n % length === 0, take prefix, `repeat` n/length times, compare to s. 3. Return true on match, else false after the loop.
 * Dry Run: "abab". Length 1 "aa"≠. Length 2 "ab"+"ab"="abab". Return true.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var repeatedSubstringPattern = function (s) {
  const stringOverallLength = s.length;

  for (
    let patternCandidateLength = 1;
    patternCandidateLength <= Math.floor(stringOverallLength / 2);
    patternCandidateLength++
  ) {
    if (stringOverallLength % patternCandidateLength === 0) {
      const potentialSubpattern = s.substring(0, patternCandidateLength);
      const totalRepetitions = stringOverallLength / patternCandidateLength;

      const constructedFullString =
        potentialSubpattern.repeat(totalRepetitions);

      if (constructedFullString === s) {
        return true;
      }
    }
  }

  return false;
};
