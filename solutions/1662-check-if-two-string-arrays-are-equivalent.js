/**
 * Check If Two String Arrays Are Equivalent
 * Time Complexity: O(L1 + L2)
 * Space Complexity: O(1)
 */
var arrayStringsAreEqual = function (word1, word2) {
  let firstWordIndexIdentifier = 0;
  let firstCharIndexIdentifier = 0;
  let secondWordIndexIdentifier = 0;
  let secondCharIndexIdentifier = 0;

  while (
    firstWordIndexIdentifier < word1.length &&
    secondWordIndexIdentifier < word2.length
  ) {
    let currentStringOne = word1[firstWordIndexIdentifier];
    let currentStringTwo = word2[secondWordIndexIdentifier];

    let charAtIndexOne = currentStringOne[firstCharIndexIdentifier];
    let charAtIndexTwo = currentStringTwo[secondCharIndexIdentifier];

    if (charAtIndexOne !== charAtIndexTwo) {
      return false;
    }

    firstCharIndexIdentifier++;
    secondCharIndexIdentifier++;

    if (firstCharIndexIdentifier === currentStringOne.length) {
      firstWordIndexIdentifier++;
      firstCharIndexIdentifier = 0;
    }

    if (secondCharIndexIdentifier === currentStringTwo.length) {
      secondWordIndexIdentifier++;
      secondCharIndexIdentifier = 0;
    }
  }

  return (
    firstWordIndexIdentifier === word1.length &&
    secondWordIndexIdentifier === word2.length
  );
};
