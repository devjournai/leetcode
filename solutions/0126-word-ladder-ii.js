/**
 * Word Ladder II
 * Time Complexity: O(N * L^2 + M * D * L)
 * Space Complexity: O(N * L^2 + M * D * L)
 */
var findLadders = function (beginWord, endWord, wordList) {
  const calculateOneLetterDifference = (firstWord, secondWord) => {
    let characterDifferenceCounter = 0;
    for (
      let characterPosition = 0;
      characterPosition < firstWord.length;
      ++characterPosition
    ) {
      if (firstWord[characterPosition] !== secondWord[characterPosition]) {
        characterDifferenceCounter++;
      }
      if (characterDifferenceCounter > 1) {
        return false;
      }
    }
    return characterDifferenceCounter === 1;
  };

  const dictionaryWords = new Set(wordList);
  if (!dictionaryWords.has(endWord)) {
    return [];
  }

  const explorationQueue = [beginWord];
  const pathSuccessors = new Map(); // Maps a word to a set of words that can directly follow it in a shortest path BFS
  const shortestDistanceTracker = new Map(); // Maps a word to its shortest distance from beginWord

  shortestDistanceTracker.set(beginWord, 0);
  let endPathFound = false;
  let currentLadderLevel = 0;

  while (explorationQueue.length > 0 && !endPathFound) {
    const nextLevelWordsCollection = new Set();
    const currentLevelQueueSize = explorationQueue.length;
    currentLadderLevel++;

    for (
      let iterationIndex = 0;
      iterationIndex < currentLevelQueueSize;
      ++iterationIndex
    ) {
      const currentSourceVertex = explorationQueue.shift();

      for (
        let letterMutationIndex = 0;
        letterMutationIndex < currentSourceVertex.length;
        ++letterMutationIndex
      ) {
        const originalCharInPosition = currentSourceVertex[letterMutationIndex];
        for (let asciiCode = 97; asciiCode <= 122; ++asciiCode) {
          const newCharFromAscii = String.fromCharCode(asciiCode);

          if (originalCharInPosition === newCharFromAscii) {
            continue;
          }

          const alteredWordCandidate =
            currentSourceVertex.substring(0, letterMutationIndex) +
            newCharFromAscii +
            currentSourceVertex.substring(letterMutationIndex + 1);

          if (dictionaryWords.has(alteredWordCandidate)) {
            if (!shortestDistanceTracker.has(alteredWordCandidate)) {
              shortestDistanceTracker.set(
                alteredWordCandidate,
                currentLadderLevel,
              );
              if (!pathSuccessors.has(currentSourceVertex)) {
                pathSuccessors.set(currentSourceVertex, new Set());
              }
              pathSuccessors.get(currentSourceVertex).add(alteredWordCandidate);
              nextLevelWordsCollection.add(alteredWordCandidate);

              if (alteredWordCandidate === endWord) {
                endPathFound = true;
              }
            } else if (
              shortestDistanceTracker.get(alteredWordCandidate) ===
              currentLadderLevel
            ) {
              if (!pathSuccessors.has(currentSourceVertex)) {
                pathSuccessors.set(currentSourceVertex, new Set());
              }
              pathSuccessors.get(currentSourceVertex).add(alteredWordCandidate);
            }
          }
        }
      }
    }
    for (const wordToAdvance of nextLevelWordsCollection) {
      dictionaryWords.delete(wordToAdvance);
      explorationQueue.push(wordToAdvance);
    }
  }

  if (!endPathFound) {
    return [];
  }

  const completeLadderSequences = [];
  const currentPathAccumulator = [beginWord];

  const generatePathRecursively = (
    currentPositionWord,
    finalDestinationWord,
    successorGraphData,
    discoveredLadders,
    temporaryPath,
  ) => {
    if (currentPositionWord === finalDestinationWord) {
      discoveredLadders.push([...temporaryPath]);
      return;
    }

    if (!successorGraphData.has(currentPositionWord)) {
      return;
    }

    const nextPotentialSteps = successorGraphData.get(currentPositionWord);
    for (const nextNodeWord of nextPotentialSteps) {
      temporaryPath.push(nextNodeWord);
      generatePathRecursively(
        nextNodeWord,
        finalDestinationWord,
        successorGraphData,
        discoveredLadders,
        temporaryPath,
      );
      temporaryPath.pop();
    }
  };

  generatePathRecursively(
    beginWord,
    endWord,
    pathSuccessors,
    completeLadderSequences,
    currentPathAccumulator,
  );

  return completeLadderSequences;
};
