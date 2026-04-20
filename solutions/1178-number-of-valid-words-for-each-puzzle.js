/**
 * Number Of Valid Words For Each Puzzle
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
      (wordCodeCounts.get(currentWordMask) || 0) + 1,
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
