/**
 * Longest Word With All Prefixes
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
