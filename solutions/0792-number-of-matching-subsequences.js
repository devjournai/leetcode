/**
 * Number Of Matching Subsequences
 * Intuition: A word matches if you can walk `s` left to right and pick every word character in order.
 * Approach: 1. `isCurrentWordSubsequence` advances `candidateStringIndex` only on equal chars while scanning `s`. 2. Match if that index equals the word length. 3. Count words that pass.
 * Dry Run: s = "abcde", words = ["a","bb","acd","ace"]. "a","acd","ace" match; "bb" does not → 3.
 * Time Complexity: O(words.length * s.length)
 * Space Complexity: O(1)
 */
var numMatchingSubseq = function (s, words) {
  let matchesTotal = 0;

  const sourceStringLength = s.length;

  const isCurrentWordSubsequence = (currentCandidate) => {
    const candidateLength = currentCandidate.length;
    let sourceStringIndex = 0;
    let candidateStringIndex = 0;

    while (
      sourceStringIndex < sourceStringLength &&
      candidateStringIndex < candidateLength
    ) {
      if (s[sourceStringIndex] === currentCandidate[candidateStringIndex]) {
        candidateStringIndex++;
      }
      sourceStringIndex++;
    }
    return candidateStringIndex === candidateLength;
  };

  for (let wordEntry = 0; wordEntry < words.length; wordEntry++) {
    const evaluatedWord = words[wordEntry];
    if (isCurrentWordSubsequence(evaluatedWord)) {
      matchesTotal++;
    }
  }

  return matchesTotal;
};
