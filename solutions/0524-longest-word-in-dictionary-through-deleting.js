/**
 * Longest Word In Dictionary Through Deleting
 * Time Complexity: O(D * (S + L_max))
 * Space Complexity: O(L_max)
 */
var findLongestWord = function (s, dictionary) {
  let currentLongestWord = "";

  const isSubsequencePresent = (sourceString, targetString) => {
    let sourcePointer = 0;
    let targetPointer = 0;
    let sourceLength = sourceString.length;
    let targetLength = targetString.length;

    while (sourcePointer < sourceLength && targetPointer < targetLength) {
      if (sourceString[sourcePointer] === targetString[targetPointer]) {
        targetPointer++;
      }
      sourcePointer++;
    }
    return targetPointer === targetLength;
  };

  let dictionaryIterator = 0;
  let dictionarySize = dictionary.length;

  while (dictionaryIterator < dictionarySize) {
    let candidateWord = dictionary[dictionaryIterator];

    if (isSubsequencePresent(s, candidateWord)) {
      let candidateLength = candidateWord.length;
      let currentBestLength = currentLongestWord.length;

      if (candidateLength > currentBestLength) {
        currentLongestWord = candidateWord;
      } else if (candidateLength === currentBestLength) {
        if (candidateWord.localeCompare(currentLongestWord) < 0) {
          currentLongestWord = candidateWord;
        }
      }
    }
    dictionaryIterator++;
  }

  return currentLongestWord;
};
