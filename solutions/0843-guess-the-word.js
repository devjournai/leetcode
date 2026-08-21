/**
 * Guess The Word
 * Intuition: Minimax: guess the word whose worst-case match-count bucket is smallest, then keep only words with the same match count as master's reply.
 * Approach: 1. `calculateMatchCount` over 6 chars. 2. Up to 30 rounds: for each candidate count match frequencies vs others, pick min of max bucket. 3. `master.guess`; 6 → done. 4. Filter remaining by that score.
 * Dry Run: words=["acckzz","ccbazz"], secret acckzz. Guess with smaller worst bucket; score 6 returns immediately, else filter to words matching that score.
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
            comparisonTargetWord
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
        actualGuessScore
    );
  }
};
