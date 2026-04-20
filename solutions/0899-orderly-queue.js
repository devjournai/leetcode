/**
 * Orderly Queue
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
