/**
 * Verifying An Alien Dictionary
 * Time Complexity: O(N * L)
 * Space Complexity: O(1)
 */
var isAlienSorted = function (words, order) {
  const characterRankings = new Map();
  let alphabetCharIterator = 0;
  while (alphabetCharIterator < order.length) {
    characterRankings.set(order[alphabetCharIterator], alphabetCharIterator);
    alphabetCharIterator++;
  }

  let currentWordIterator = 0;
  while (currentWordIterator < words.length - 1) {
    const firstComparedWord = words[currentWordIterator];
    const secondComparedWord = words[currentWordIterator + 1];

    if (
      !compareAlienWords(
        firstComparedWord,
        secondComparedWord,
        characterRankings,
      )
    ) {
      return false;
    }
    currentWordIterator++;
  }

  return true;

  function compareAlienWords(wordA, wordB, rankingsMap) {
    let characterComparer = 0;
    const lengthA = wordA.length;
    const lengthB = wordB.length;

    while (characterComparer < lengthA && characterComparer < lengthB) {
      const firstCharacter = wordA[characterComparer];
      const secondCharacter = wordB[characterComparer];

      const firstCharacterRank = rankingsMap.get(firstCharacter);
      const secondCharacterRank = rankingsMap.get(secondCharacter);

      if (firstCharacterRank < secondCharacterRank) {
        return true;
      }
      if (firstCharacterRank > secondCharacterRank) {
        return false;
      }
      characterComparer++;
    }

    // If one word is a prefix of the other, the shorter word should come first
    return lengthA <= lengthB;
  }
};
