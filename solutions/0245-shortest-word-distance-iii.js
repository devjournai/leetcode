/**
 * Shortest Word Distance III
 * Intuition: If word1 and word2 differ, the usual last-seen two-index scan works. If they are the same word, consecutive occurrences of that word are the only pairs, so keep one last index of that word.
 * Approach: 1. Set `areTheWordsIdentical`. 2. Scan the dictionary. 3. If identical and the word matches, update the min with `searchIterator - mostRecentWordOneIdx` when a previous hit exists, then store this index. 4. If distinct, update the matching last index and min against the other last index. 5. Return `currentMinimalDistance`.
 * Dry Run: wordsDict = ["a","b","a","a"], word1 = word2 = "a".
 *   - Hits at 0, 2 (dist 2), 3 (dist 1). Return 1.
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
            searchIterator - mostRecentWordOneIdx
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
            Math.abs(mostRecentWordOneIdx - mostRecentWordTwoIdx)
          );
        }
      } else if (currentEvaluatedWord === word2) {
        mostRecentWordTwoIdx = searchIterator;
        if (mostRecentWordOneIdx !== -1) {
          currentMinimalDistance = Math.min(
            currentMinimalDistance,
            Math.abs(mostRecentWordOneIdx - mostRecentWordTwoIdx)
          );
        }
      }
    }
  }

  return currentMinimalDistance;
};
