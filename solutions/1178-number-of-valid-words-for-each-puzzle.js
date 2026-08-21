/**
 * Number Of Valid Words For Each Puzzle
 * Intuition: A word is valid for a puzzle if it contains the puzzle’s first letter and no letter outside the puzzle. Bitmasks of letter sets let us count words by enumerating submasks of each puzzle that include the first letter.
 * Approach: 1. Map each word to a bitmask and count frequencies. 2. For each puzzle mask, iterate all submasks; if the submask includes the first-letter bit, add that word-count. 3. Push the total per puzzle.
 * Dry Run: words = ["aaaa","asas","able","ability","actt","actor","access"], puzzle "aboveyz".
 *   - First letter a; word "aaaa" mask is just a, a subset. Count 1 for that puzzle.
 * Time Complexity: O(W * L_W + P * 2^L_P)
 * Space Complexity: O(W + P)
 */
var findNumOfValidWords = function (words, puzzles) {
  function calculateBitRepresentation(inputString) {
    let characterBitmask = 0;
    for (const char of inputString) {
      const singleCharBitValue = 1 << (char.charCodeAt(0) - 97);
      characterBitmask |= singleCharBitValue;
    }
    return characterBitmask;
  }

  const wordCodeCounts = new Map();

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const currentWordEntry = words[wordIndex];
    const currentWordMask = calculateBitRepresentation(currentWordEntry);
    wordCodeCounts.set(
      currentWordMask,
      (wordCodeCounts.get(currentWordMask) || 0) + 1
    );
  }

  const resultList = [];

  for (let puzzleIndex = 0; puzzleIndex < puzzles.length; puzzleIndex++) {
    const currentPuzzleEntry = puzzles[puzzleIndex];
    const currentPuzzleMask = calculateBitRepresentation(currentPuzzleEntry);

    const firstLetterCharCode = currentPuzzleEntry.charCodeAt(0);
    const firstLetterBitValue = 1 << (firstLetterCharCode - 97);

    let validWordCounter = 0;
    let currentSubmask = currentPuzzleMask;

    while (true) {
      if ((currentSubmask & firstLetterBitValue) === firstLetterBitValue) {
        if (wordCodeCounts.has(currentSubmask)) {
          validWordCounter += wordCodeCounts.get(currentSubmask);
        }
      }

      if (currentSubmask === 0) {
        break;
      }

      currentSubmask = (currentSubmask - 1) & currentPuzzleMask;
    }
    resultList.push(validWordCounter);
  }

  return resultList;
};
