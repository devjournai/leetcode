/**
 * String Transforms Into Another String
 * Intuition: Each source letter can map to only one target letter. A mapping graph with a cycle needs a free unused letter as a temporary, so conversion is impossible if all 26 letters already appear in str2 (unless the strings are equal).
 * Approach: 1. Equal strings: true. 2. Build a map str1[i]->str2[i]; conflict if one source maps to two targets. 3. Collect distinct target letters; return whether fewer than 26.
 * Dry Run: str1 = "aabcc", str2 = "ccdee".
 *   - a->c, b->d, c->e, consistent; targets {c,d,e} size 3 < 26. True.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var canConvert = function (str1, str2) {
  if (str1 === str2) {
    return true;
  }

  const charMap = new Map();
  const encounteredTargets = new Set();
  const totalLength = str1.length;

  for (
    let currentPosition = 0;
    currentPosition < totalLength;
    currentPosition++
  ) {
    const charFromSource = str1[currentPosition];
    const charToTarget = str2[currentPosition];

    if (charMap.has(charFromSource)) {
      if (charMap.get(charFromSource) !== charToTarget) {
        return false;
      }
    } else {
      charMap.set(charFromSource, charToTarget);
    }

    encounteredTargets.add(charToTarget);
  }

  return encounteredTargets.size < 26;
};
