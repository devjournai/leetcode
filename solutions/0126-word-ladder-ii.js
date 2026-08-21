/**
 * Word Ladder II
 * Intuition: All shortest ladders share the BFS distance from beginWord. First BFS records every one-letter successor on those shortest layers, then DFS walks that DAG from begin to end.
 * Approach: 1. If endWord is missing, []. 2. Level BFS: try all 26 substitutions per position; on first visit set distance and enqueue; also link parent→child when the child is on this same new level. 3. Remove a level from the dictionary after it is processed. 4. DFS from beginWord following successor sets, copying a path when endWord is reached.
 * Dry Run: begin=hit, end=cog, list [hot,dot,dog,lot,log,cog]. BFS links hit→hot→dot/lot→dog/log→cog. DFS yields [hit,hot,dot,dog,cog] and [hit,hot,lot,log,cog].
 * Time Complexity: O(N * L^2 + M * D * L)
 * Space Complexity: O(N * L^2 + M * D * L)
 */
var findLadders = function (beginWord, endWord, wordList) {
  const dictionaryWords = new Set(wordList);
  if (!dictionaryWords.has(endWord)) {
    return [];
  }

  const explorationQueue = [beginWord];
  const pathSuccessors = new Map();
  const shortestDistanceTracker = new Map();

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
                currentLadderLevel
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
    temporaryPath
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
        temporaryPath
      );
      temporaryPath.pop();
    }
  };

  generatePathRecursively(
    beginWord,
    endWord,
    pathSuccessors,
    completeLadderSequences,
    currentPathAccumulator
  );

  return completeLadderSequences;
};
