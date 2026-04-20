/**
 * Shortest Word Distance
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var shortestDistance = function (wordsDict, word1, word2) {
  let shortestDistanceFound = Infinity;
  let lastIndexOne = -1;
  let lastIndexTwo = -1;

  for (
    let currentDictionaryIndex = 0;
    currentDictionaryIndex < wordsDict.length;
    currentDictionaryIndex++
  ) {
    const currentDictionaryWord = wordsDict[currentDictionaryIndex];

    if (currentDictionaryWord === word1) {
      lastIndexOne = currentDictionaryIndex;
    } else if (currentDictionaryWord === word2) {
      lastIndexTwo = currentDictionaryIndex;
    }

    if (lastIndexOne !== -1 && lastIndexTwo !== -1) {
      const distanceCandidate = Math.abs(lastIndexOne - lastIndexTwo);
      shortestDistanceFound = Math.min(
        shortestDistanceFound,
        distanceCandidate,
      );
    }
  }

  return shortestDistanceFound;
};
