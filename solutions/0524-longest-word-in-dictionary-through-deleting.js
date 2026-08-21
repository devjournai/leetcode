/**
 * Longest Word In Dictionary Through Deleting
 * Intuition: A dictionary word is valid if it is a subsequence of `s`. Prefer the longest such word, breaking ties lexicographically.
 * Approach: 1. `isSubsequencePresent` advances a pointer on the candidate whenever `s` matches. 2. For each dictionary word that is a subsequence, replace `currentLongestWord` if it is longer or equal-length and `localeCompare` is smaller.
 * Dry Run: s = "abpcplea", dictionary = ["ale","apple","monkey","plea"].
 *   - "ale" ok; "apple" longer; "monkey" not a subsequence; "plea" shorter. Return "apple".
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
