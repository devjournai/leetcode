/**
 * Number Of Matching Subsequences
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
