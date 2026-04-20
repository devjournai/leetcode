/**
 * Guess The Word
 * Time Complexity: O(A * N^2 * L)
 * Space Complexity: O(N * L)
 */
var findSecretWord = function (words, master) {
  const calculateMatchCount = (wordOneParam, wordTwoParam) => {
    let exactMatches = 0;
    for (let charIndex = 0; charIndex < 6; charIndex++) {
      if (wordOneParam[charIndex] === wordTwoParam[charIndex]) {
        exactMatches++;
      }
    }
    return exactMatches;
  };

  let currentPossibleWords = words;
  const masterAgent = master;

  for (let attemptNumber = 0; attemptNumber < 30; attemptNumber++) {
    let bestGuessCandidate = null;
    let smallestMaxGroupSize = Infinity;

    for (const currentEvaluationWord of currentPossibleWords) {
      const matchCountFrequency = Array(7).fill(0);
      for (const comparisonTargetWord of currentPossibleWords) {
        if (currentEvaluationWord !== comparisonTargetWord) {
          const scoreFromComparison = calculateMatchCount(
            currentEvaluationWord,
            comparisonTargetWord,
          );
          matchCountFrequency[scoreFromComparison]++;
        }
      }
      const maxGroupSizeForCurrentCandidate = Math.max(...matchCountFrequency);

      if (maxGroupSizeForCurrentCandidate < smallestMaxGroupSize) {
        smallestMaxGroupSize = maxGroupSizeForCurrentCandidate;
        bestGuessCandidate = currentEvaluationWord;
      }
    }

    const actualGuessScore = masterAgent.guess(bestGuessCandidate);
    if (actualGuessScore === 6) {
      return;
    }

    currentPossibleWords = currentPossibleWords.filter(
      (wordToFilterCheck) =>
        calculateMatchCount(wordToFilterCheck, bestGuessCandidate) ===
        actualGuessScore,
    );
  }
};
