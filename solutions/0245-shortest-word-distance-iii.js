/**
 * Shortest Word Distance III
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var shortestWordDistance = function (wordsDict, word1, word2) {
  let currentMinimalDistance = Infinity;
  let mostRecentWordOneIdx = -1;
  let mostRecentWordTwoIdx = -1;
  const areTheWordsIdentical = word1 === word2;

  for (
    let searchIterator = 0;
    searchIterator < wordsDict.length;
    searchIterator++
  ) {
    const currentEvaluatedWord = wordsDict[searchIterator];

    if (areTheWordsIdentical) {
      if (currentEvaluatedWord === word1) {
        if (mostRecentWordOneIdx !== -1) {
          currentMinimalDistance = Math.min(
            currentMinimalDistance,
            searchIterator - mostRecentWordOneIdx,
          );
        }
        mostRecentWordOneIdx = searchIterator;
      }
    } else {
      if (currentEvaluatedWord === word1) {
        mostRecentWordOneIdx = searchIterator;
        if (mostRecentWordTwoIdx !== -1) {
          currentMinimalDistance = Math.min(
            currentMinimalDistance,
            Math.abs(mostRecentWordOneIdx - mostRecentWordTwoIdx),
          );
        }
      } else if (currentEvaluatedWord === word2) {
        mostRecentWordTwoIdx = searchIterator;
        if (mostRecentWordOneIdx !== -1) {
          currentMinimalDistance = Math.min(
            currentMinimalDistance,
            Math.abs(mostRecentWordOneIdx - mostRecentWordTwoIdx),
          );
        }
      }
    }
  }

  return currentMinimalDistance;
};
