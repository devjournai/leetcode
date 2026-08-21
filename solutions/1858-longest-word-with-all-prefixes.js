/**
 * Longest Word With All Prefixes
 * Intuition: A word is valid if every nonempty prefix is also in the word list. Prefer longer words, then lexicographically smaller.
 * Approach: 1. Put `words` in `allWordsStored`. 2. For each `currentCandidateWord`, check all prefixes via `substring`. 3. Update `longestResultantWord` by length then string compare.
 * Dry Run: words=["k","ki","kir","kira"].
 *   - "kira" has prefixes k,ki,kir all present. Return "kira".
 * Time Complexity: O(S + N * L^2)
 * Space Complexity: O(S)
 */
var longestWord = function (words) {
  const allWordsStored = new Set(words);
  let longestResultantWord = "";

  for (
    let outerLoopIndex = 0;
    outerLoopIndex < words.length;
    ++outerLoopIndex
  ) {
    const currentCandidateWord = words[outerLoopIndex];
    const currentWordLength = currentCandidateWord.length;
    let allSubPrefixesPresent = true;

    for (
      let innerLoopIndex = 1;
      innerLoopIndex < currentWordLength;
      ++innerLoopIndex
    ) {
      const temporaryPrefix = currentCandidateWord.substring(0, innerLoopIndex);
      if (!allWordsStored.has(temporaryPrefix)) {
        allSubPrefixesPresent = false;
        break;
      }
    }

    if (allSubPrefixesPresent) {
      const currentResultLength = longestResultantWord.length;

      if (currentWordLength > currentResultLength) {
        longestResultantWord = currentCandidateWord;
      } else if (currentWordLength === currentResultLength) {
        if (currentCandidateWord < longestResultantWord) {
          longestResultantWord = currentCandidateWord;
        }
      }
    }
  }

  return longestResultantWord;
};
