/**
 * Decrypt String From Alphabet To Integer Mapping
 * Intuition: A trailing '#' marks a two-digit code 10–26. Scan right to left so '#' groups stay intact.
 * Approach: 1. Walk from the end. 2. If '#' then parse two digits, map to a letter, skip 3 chars; else map one digit and skip 1. 3. Reverse collected letters and join.
 * Dry Run: s = "10#11#12". Right to left: 2→b, 1→a, 11#→k, 10#→j; reverse join → "jkab".
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
