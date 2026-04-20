/**
 * String Transforms Into Another String
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
