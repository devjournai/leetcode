/**
 * Sentence Screen Fitting
 * Intuition: Each row that starts at word index `i` always consumes the same words, so precompute for every start: `nextWordStartingIndex` and how many full sentences that row completes (`dpFitInfo`).
 * Approach: 1. For each start index, fill one row of `cols` characters (word then a space when leftover > 0). 2. For each of `rows` rows, jump via that table and add `numberOfSentencesCompleted`. 3. Return `finalSentencesCount`.
 * Dry Run: sentence = ["hello","world"], rows = 2, cols = 8.
 *   - start 0: "hello" then world does not fit → next=1, completed=0.
 *   - start 1: "world" is last word → completed=1, hello does not fit → next=0.
 *   - two rows: 0+1 = 1.
 * Time Complexity: O(N * C + R)
 * Space Complexity: O(N)
 */
var wordsTyping = function (sentence, rows, cols) {
  const totalWordsInSentence = sentence.length;
  const dpFitInfo = new Array(totalWordsInSentence);

  for (
    let startWordIndex = 0;
    startWordIndex < totalWordsInSentence;
    startWordIndex++
  ) {
    let currentRemainingSpace = cols;
    let wordPointerForFitting = startWordIndex;
    let sentencesCompletedCounter = 0;

    while (true) {
      const currentWordLength = sentence[wordPointerForFitting].length;

      if (currentRemainingSpace >= currentWordLength) {
        currentRemainingSpace -= currentWordLength;

        if (wordPointerForFitting === totalWordsInSentence - 1) {
          sentencesCompletedCounter++;
          wordPointerForFitting = 0;
        } else {
          wordPointerForFitting++;
        }

        if (currentRemainingSpace > 0) {
          currentRemainingSpace--;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    dpFitInfo[startWordIndex] = {
      nextWordStartingIndex: wordPointerForFitting,
      numberOfSentencesCompleted: sentencesCompletedCounter,
    };
  }

  let finalSentencesCount = 0;
  let currentSentenceWordPosition = 0;

  for (let rowIterator = 0; rowIterator < rows; rowIterator++) {
    const lineFittingData = dpFitInfo[currentSentenceWordPosition];
    currentSentenceWordPosition = lineFittingData.nextWordStartingIndex;
    finalSentencesCount += lineFittingData.numberOfSentencesCompleted;
  }

  return finalSentencesCount;
};
