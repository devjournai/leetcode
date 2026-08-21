/**
 * Wildcard Matching
 * Intuition: '?' matches one character and '*' matches any sequence (including empty). A greedy walk records the last '*' and the string index it covered so a mismatch can retry the star matching one more character.
 * Approach: 1. Advance both pointers when chars match or pattern is '?'. 2. On '*', remember its pattern index and the current string index, then skip the star. 3. On mismatch, if a star was seen, reset the pattern to just after that star and let it consume one more string char. 4. After the string ends, remaining pattern must be only '*'.
 * Dry Run: s = "adceb", p = "*a*b".
 *   - '*' at 0, then 'a' matches s[0]='a'. Next '*' at 2. 'b' fails on 'd'; star consumes 'd', then 'c', then 'e'; 'b' matches s[4]. Done. Remaining pattern empty → true.
 * Time Complexity: O(S * P)
 * Space Complexity: O(1)
 */
var isMatch = function (s, p) {
  let stringWalker = 0;
  let patternWalker = 0;
  let lastStarPatternPosition = -1;
  let currentMatchPoint = -1;

  while (stringWalker < s.length) {
    if (
      patternWalker < p.length &&
      (p[patternWalker] === "?" || p[patternWalker] === s[stringWalker])
    ) {
      stringWalker++;
      patternWalker++;
    } else if (patternWalker < p.length && p[patternWalker] === "*") {
      lastStarPatternPosition = patternWalker;
      currentMatchPoint = stringWalker;
      patternWalker++;
    } else if (lastStarPatternPosition !== -1) {
      patternWalker = lastStarPatternPosition + 1;
      currentMatchPoint++;
      stringWalker = currentMatchPoint;
    } else {
      return false;
    }
  }

  while (patternWalker < p.length) {
    if (p[patternWalker] !== "*") {
      return false;
    }
    patternWalker++;
  }

  return true;
};
