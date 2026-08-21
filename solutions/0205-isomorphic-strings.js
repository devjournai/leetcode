/**
 * Isomorphic Strings
 * Intuition: Two strings are isomorphic only if each character maps to exactly one counterpart in both directions. Two maps catch collisions that a single map would miss.
 * Approach: 1. Reject unequal lengths. 2. Walk both strings together. 3. If neither character is mapped yet, record s→t and t→s. 4. If either mapping disagrees with the current pair, return false. 5. Return true after the scan.
 * Dry Run: s = "egg", t = "add".
 *   - e/a unmapped → maps e→a, a→e.
 *   - g/d unmapped → maps g→d, d→g.
 *   - g/d already match both maps → true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var isIsomorphic = function (s, t) {
  const stringLengthS = s.length;
  const stringLengthT = t.length;

  if (stringLengthS !== stringLengthT) {
    return false;
  }

  const sToTMapping = new Map();
  const tToSMapping = new Map();

  for (
    let currentPosition = 0;
    currentPosition < stringLengthS;
    currentPosition++
  ) {
    const characterFromS = s[currentPosition];
    const characterFromT = t[currentPosition];

    const mappedCharFromS = sToTMapping.get(characterFromS);
    const mappedCharFromT = tToSMapping.get(characterFromT);

    if (mappedCharFromS === undefined && mappedCharFromT === undefined) {
      sToTMapping.set(characterFromS, characterFromT);
      tToSMapping.set(characterFromT, characterFromS);
    } else if (
      mappedCharFromS !== characterFromT ||
      mappedCharFromT !== characterFromS
    ) {
      return false;
    }
  }

  return true;
};
