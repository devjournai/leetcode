/**
 * Substring With Concatenation Of All Words
 * Intuition: Every window of length `totalWordsCount * singleWordLength` is split into word-sized slices; a copy of the required frequency map is decremented until all words match or a slice is unused/overused.
 * Approach: 1. Return [] if `words` is empty or `s` is too short. 2. Build `initialWordFrequencyMap`. 3. For each `currentWindowStart` that can hold the concatenation, clone the map. 4. Walk slices: if the fragment has remaining count, decrement and increment `matchedWordsCounter`, else break. 5. If the counter equals `totalWordsCount`, record the start.
 * Dry Run: s = "barfoothe", words = ["foo","bar"], word length 3.
 *   - start=0: "bar" then "foo" both in map, matched=2 → push 0. start=1 "arf" miss. Later windows fail. Return [0].
 * Time Complexity: O(N * M * K)
 * Space Complexity: O(M * K + N)
 */
var findSubstring = function (s, words) {
  if (!words || words.length === 0) {
    return [];
  }

  const foundIndices = [];
  const singleWordLength = words[0].length;
  const totalWordsCount = words.length;
  const totalConcatenatedLength = singleWordLength * totalWordsCount;

  if (s.length < totalConcatenatedLength) {
    return [];
  }

  const initialWordFrequencyMap = new Map();
  for (const currentWordEntry of words) {
    initialWordFrequencyMap.set(
      currentWordEntry,
      (initialWordFrequencyMap.get(currentWordEntry) || 0) + 1
    );
  }

  for (
    let currentWindowStart = 0;
    currentWindowStart <= s.length - totalConcatenatedLength;
    currentWindowStart++
  ) {
    const wordsInCurrentWindow = new Map(initialWordFrequencyMap);
    let matchedWordsCounter = 0;

    for (
      let wordSliceStart = currentWindowStart;
      wordSliceStart < currentWindowStart + totalConcatenatedLength;
      wordSliceStart += singleWordLength
    ) {
      const extractedFragment = s.substring(
        wordSliceStart,
        wordSliceStart + singleWordLength
      );

      if (
        wordsInCurrentWindow.has(extractedFragment) &&
        wordsInCurrentWindow.get(extractedFragment) > 0
      ) {
        wordsInCurrentWindow.set(
          extractedFragment,
          wordsInCurrentWindow.get(extractedFragment) - 1
        );
        matchedWordsCounter++;
      } else {
        break;
      }
    }

    if (matchedWordsCounter === totalWordsCount) {
      foundIndices.push(currentWindowStart);
    }
  }

  return foundIndices;
};
