/**
 * Valid Anagram
 * Intuition: Anagrams have the same length and the same lowercase letter counts. A 26-slot frequency array can prove that in two linear passes.
 * Approach: 1. If lengths differ, return false. 2. Increment counts for each character of `s`. 3. Decrement for each character of `t`; if any bucket goes negative, `t` has an extra letter — return false. 4. Otherwise return true.
 * Dry Run: s = "anagram", t = "nagaram".
 *   - Lengths match. After counting s, a=3, n=1, g=1, r=1, m=1.
 *   - Decrementing t zeros every bucket without going negative → true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isAnagram = function (s, t) {
  const stringFirstLength = s.length;
  const stringSecondLength = t.length;

  if (stringFirstLength !== stringSecondLength) {
    return false;
  }

  const characterCounts = new Array(26).fill(0);

  for (let charIndexS = 0; charIndexS < stringFirstLength; charIndexS++) {
    const charCodeS = s.charCodeAt(charIndexS) - "a".charCodeAt(0);
    characterCounts[charCodeS]++;
  }

  for (let charIndexT = 0; charIndexT < stringSecondLength; charIndexT++) {
    const charCodeT = t.charCodeAt(charIndexT) - "a".charCodeAt(0);
    characterCounts[charCodeT]--;
    if (characterCounts[charCodeT] < 0) {
      return false;
    }
  }

  return true;
};
