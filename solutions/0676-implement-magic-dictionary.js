/**
 * Implement Magic Dictionary
 * Intuition: A search hits if some stored word differs in exactly one character. Generate every one-letter mutation of the query and test membership in a set.
 * Approach: 1. `buildDict` stores words in `storedWords`. 2. `search` for each index and each other letter a–z builds `prospectiveWord` via slice+replace. 3. Return true on first set hit; skip the original letter.
 * Dry Run: dict=["hello","leetcode"], search "hhllo". At index 1, 'e' yields "hello" which is in the set → true.
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
        lowercaseACharCode + alphabetOffset
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
