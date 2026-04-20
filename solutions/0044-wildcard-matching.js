/**
    * Wildcard Matching
    * Time Complexity: O(S * P)
    * Space Complexity: O(1)
*/
var isMatch = function (s, p) {
  let stringWalker = 0;
  let patternWalker = 0;
  let lastStarPatternPosition = -1;
  let currentMatchPoint = -1;

  while (stringWalker < s.length) {
    if (patternWalker < p.length && (p[patternWalker] === '?' || p[patternWalker] === s[stringWalker])) {
      stringWalker++;
      patternWalker++;
    } else if (patternWalker < p.length && p[patternWalker] === '*') {
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
    if (p[patternWalker] !== '*') {
      return false;
    }
    patternWalker++;
  }

  return true;
};