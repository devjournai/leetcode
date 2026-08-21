/**
 * Concatenated Words
 * Intuition: A word is concatenated if it can be split into at least two dictionary words (the word set includes every input string). For each word, DP counts the fewest dictionary pieces that rebuild each prefix.
 * Approach: 1. Put all `words` in `availableWordSet`. 2. For each nonempty word, `minSegmentCountDP[0]=0` and the rest Infinity. 3. For every prefix end, try every earlier start whose DP is finite; if `word.substring(start, end)` is in the set, update DP[end] = min(..., DP[start]+1). 4. If DP[length] ≥ 2, collect the word.
 * Dry Run: words = ["cat","cats","catsdogcats","dog"].
 *   - "cat"/"cats"/"dog": only 1 segment → skip.
 *   - "catsdogcats": prefixes hit "cats" then "dog" then "cats" → 3 segments ≥ 2 → keep it.
 * Time Complexity: O(N * L_max^3)
 * Space Complexity: O(N * L_max)
 */
var findAllConcatenatedWordsInADict = function (words) {
  const availableWordSet = new Set(words);
  const finalConcatenatedCollection = [];

  words.forEach(function (currentExaminedWord) {
    if (currentExaminedWord.length === 0) {
      return;
    }

    const currentWordLength = currentExaminedWord.length;
    const minSegmentCountDP = new Array(currentWordLength + 1).fill(Infinity);
    minSegmentCountDP[0] = 0;

    for (
      let prefixEndIndex = 1;
      prefixEndIndex <= currentWordLength;
      prefixEndIndex++
    ) {
      let segmentStartIndex = 0;
      while (segmentStartIndex < prefixEndIndex) {
        if (minSegmentCountDP[segmentStartIndex] !== Infinity) {
          const currentStringSegment = currentExaminedWord.substring(
            segmentStartIndex,
            prefixEndIndex
          );
          if (availableWordSet.has(currentStringSegment)) {
            minSegmentCountDP[prefixEndIndex] = Math.min(
              minSegmentCountDP[prefixEndIndex],
              minSegmentCountDP[segmentStartIndex] + 1
            );
          }
        }
        segmentStartIndex++;
      }
    }

    if (minSegmentCountDP[currentWordLength] >= 2) {
      finalConcatenatedCollection.push(currentExaminedWord);
    }
  });

  return finalConcatenatedCollection;
};
