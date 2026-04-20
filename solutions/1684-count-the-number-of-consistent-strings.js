/**
 * Count The Number Of Consistent Strings
 * Time Complexity: O(L + N * W)
 * Space Complexity: O(L + W)
 */
var countConsistentStrings = function (allowed, words) {
  const permittedChars = new Set();
  for (let charIndex = 0; charIndex < allowed.length; charIndex++) {
    permittedChars.add(allowed[charIndex]);
  }

  let consistentCount = 0;

  for (let wordIterator = 0; wordIterator < words.length; wordIterator++) {
    const currentWord = words[wordIterator];
    const wordCharacters = currentWord.split("");

    const isCurrentWordValid = wordCharacters.every((singleChar) =>
      permittedChars.has(singleChar),
    );

    if (isCurrentWordValid) {
      consistentCount++;
    }
  }

  return consistentCount;
};
