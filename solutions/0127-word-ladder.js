/**
 * Word Ladder
 * Time Complexity: O(L^2 * N)
 * Space Complexity: O(N * L)
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const dictionaryWords = new Set(wordList);
  const hasEndWordInList = dictionaryWords.has(endWord);

  if (!hasEndWordInList) {
    return 0;
  }

  let bfsQueue = [beginWord];
  let pathCounter = 1;

  while (bfsQueue.length > 0) {
    const currentLevelProcessingSize = bfsQueue.length;
    const nextLevelQueueCollector = [];

    for (
      let wordIndexInLevel = 0;
      wordIndexInLevel < currentLevelProcessingSize;
      wordIndexInLevel++
    ) {
      const currentWordBeingProcessed = bfsQueue[wordIndexInLevel];

      if (currentWordBeingProcessed === endWord) {
        return pathCounter;
      }

      for (
        let charPositionInWord = 0;
        charPositionInWord < currentWordBeingProcessed.length;
        charPositionInWord++
      ) {
        for (
          let alphabetIterator = 0;
          alphabetIterator < 26;
          alphabetIterator++
        ) {
          const charToSubstitute = String.fromCharCode(97 + alphabetIterator); // 'a' through 'z'
          const generatedNeighborWord =
            currentWordBeingProcessed.substring(0, charPositionInWord) +
            charToSubstitute +
            currentWordBeingProcessed.substring(charPositionInWord + 1);

          if (dictionaryWords.has(generatedNeighborWord)) {
            nextLevelQueueCollector.push(generatedNeighborWord);
            dictionaryWords.delete(generatedNeighborWord);
          }
        }
      }
    }

    bfsQueue = nextLevelQueueCollector;
    pathCounter++;
  }

  return 0;
};
