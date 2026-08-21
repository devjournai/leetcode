/**
 * Verifying An Alien Dictionary
 * Intuition: Map each alien letter to its rank in `order`, then every adjacent pair of words must be nondecreasing under that order (and a longer word cannot precede its prefix).
 * Approach: 1. Fill `characterRankings` from `order`. 2. For each adjacent pair, `compareAlienWords` walks characters until ranks differ. 3. Smaller rank first is OK; larger rank first fails. 4. If one word is a prefix, require `lengthA <= lengthB`.
 * Dry Run: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz". 'h' ranks before 'l', so the pair is sorted. Return true.
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
        characterRankings
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
