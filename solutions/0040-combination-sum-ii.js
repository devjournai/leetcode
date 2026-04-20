/**
 * Combination Sum II
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var combinationSum2 = function (inputCandidates, desiredTarget) {
  const finalCollection = [];
  inputCandidates.sort((firstNum, secondNum) => firstNum - secondNum);

  const findCombinations = (
    currentSumRequired,
    currentSequence,
    startEnumerationIndex,
  ) => {
    if (currentSumRequired < 0) {
      return;
    }

    if (currentSumRequired === 0) {
      finalCollection.push(currentSequence);
      return;
    }

    for (
      let enumerationPointer = startEnumerationIndex;
      enumerationPointer < inputCandidates.length;
      enumerationPointer++
    ) {
      if (
        enumerationPointer > startEnumerationIndex &&
        inputCandidates[enumerationPointer] ===
          inputCandidates[enumerationPointer - 1]
      ) {
        continue;
      }

      const nextSumRequired =
        currentSumRequired - inputCandidates[enumerationPointer];
      const nextSequence = [
        ...currentSequence,
        inputCandidates[enumerationPointer],
      ];
      const nextEnumerationIndex = enumerationPointer + 1;

      findCombinations(nextSumRequired, nextSequence, nextEnumerationIndex);
    }
  };

  findCombinations(desiredTarget, [], 0);

  return finalCollection;
};
