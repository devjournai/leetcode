/**
 * Decrypt String From Alphabet To Integer Mapping
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var freqAlphabets = function (s) {
  const decryptedParts = [];
  let traverseIndex = s.length - 1;
  const charCodeOffset = "a".charCodeAt(0);

  while (traverseIndex >= 0) {
    let charValue;
    if (s[traverseIndex] === "#") {
      const subStringPart = s.substring(traverseIndex - 2, traverseIndex);
      charValue = parseInt(subStringPart, 10);
      traverseIndex -= 3;
    } else {
      const singleDigitChar = s[traverseIndex];
      charValue = parseInt(singleDigitChar, 10);
      traverseIndex -= 1;
    }
    decryptedParts.push(String.fromCharCode(charCodeOffset + charValue - 1));
  }

  const finalResult = decryptedParts.reverse().join("");
  return finalResult;
};
