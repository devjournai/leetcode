/**
 * Shortest Word Distance
 * Intuition: The closest pair of distinct words is always between some latest occurrence of word1 and word2 seen so far. One scan tracking both last indices is enough.
 * Approach: 1. Track `lastIndexOne` / `lastIndexTwo` (init -1). 2. On word1 update index one; else if word2 update index two. 3. Whenever both indices are set, minimize `|lastIndexOne - lastIndexTwo|`. 4. Return that minimum.
 * Dry Run: wordsDict = ["a","b","c","a"], word1 = "a", word2 = "c".
 *   - i=0: lastOne=0. i=2: lastTwo=2, dist=2. i=3: lastOne=3, dist=1. Return 1.
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
        distanceCandidate
      );
    }
  }

  return shortestDistanceFound;
};
