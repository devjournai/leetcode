/**
 * Word Ladder
 * Intuition: Each word is a graph vertex; an edge exists when two words differ by one letter. BFS from beginWord finds the shortest path length to endWord.
 * Approach: 1. Put wordList in a set; missing endWord → 0. 2. Queue beginWord with length 1. 3. For each word, try every position × 26 letters; if the neighbor is in the set, enqueue it and delete it so it is visited once. 4. Return the length when endWord is dequeued, or 0 if the queue empties.
 * Dry Run: begin=hit, end=cog, same list. Levels: hit → hot → dot,lot → dog,log → cog. Length 5.
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
          const charToSubstitute = String.fromCharCode(97 + alphabetIterator);
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
