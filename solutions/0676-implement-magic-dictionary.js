/**
 * Implement Magic Dictionary
 * Time Complexity: O(N * K)
 * Space Complexity: O(N * K)
 */
var MagicDictionary = function () {
  this.storedWords = new Set();
};

MagicDictionary.prototype.buildDict = function (dictionary) {
  this.storedWords = new Set(dictionary);
};

MagicDictionary.prototype.search = function (searchWord) {
  const targetLength = searchWord.length;
  const lowercaseACharCode = "a".charCodeAt(0);

  for (
    let characterIndex = 0;
    characterIndex < targetLength;
    characterIndex++
  ) {
    const originalCharacter = searchWord[characterIndex];

    for (let alphabetOffset = 0; alphabetOffset < 26; alphabetOffset++) {
      const newCharacter = String.fromCharCode(
        lowercaseACharCode + alphabetOffset,
      );

      if (newCharacter === originalCharacter) {
        continue;
      }

      const segmentOne = searchWord.slice(0, characterIndex);
      const segmentTwo = searchWord.slice(characterIndex + 1);
      const prospectiveWord = segmentOne + newCharacter + segmentTwo;

      if (this.storedWords.has(prospectiveWord)) {
        return true;
      }
    }
  }

  return false;
};
