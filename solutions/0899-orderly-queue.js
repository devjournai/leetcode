/**
 * Orderly Queue
 * Intuition: With k = 1 only rotations are possible, so the answer is the lexicographically smallest rotation. With k ≥ 2 any permutation is reachable, so sort the characters.
 * Approach: 1. If k === 1, for each split index form `s.slice(i)+s.slice(0,i)` and keep the min. 2. Else split, sort, and join.
 * Dry Run: s = "cba", k = 1.
 *   - Rotations "cba","bac","acb"; smallest "acb". If k = 2, sorted "abc".
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var orderlyQueue = function (s, k) {
  if (k === 1) {
    let smallestLexicographicalString = s;
    const stringLength = s.length;

    for (let rotationIndex = 0; rotationIndex < stringLength; rotationIndex++) {
      const prefixPart = s.slice(rotationIndex);
      const suffixPart = s.slice(0, rotationIndex);
      const currentPermutation = prefixPart + suffixPart;

      if (currentPermutation < smallestLexicographicalString) {
        smallestLexicographicalString = currentPermutation;
      }
    }
    return smallestLexicographicalString;
  } else {
    const characterArray = s.split("");
    characterArray.sort();
    const resultString = characterArray.join("");
    return resultString;
  }
};
