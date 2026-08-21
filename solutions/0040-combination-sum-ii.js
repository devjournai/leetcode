/**
 * Combination Sum II
 * Intuition: Each candidate may be used at most once, and duplicate numbers must not produce duplicate combinations. Sorting groups equals together so we can skip a value at the same recursion depth after it has already been tried.
 * Approach: 1. Sort the candidates. 2. Recurse with remaining sum, the sequence so far, and a start index. 3. If remaining is 0, store the sequence; if negative, prune. 4. For each index from start, skip duplicates at this depth, then take that number once and recurse from index + 1.
 * Dry Run: candidates = [10, 1, 2, 7, 6, 1, 5], target = 8. After sort: [1, 1, 2, 5, 6, 7, 10].
 *   - First 1 then 2 then 5 → [1, 2, 5]. First 1 then 7 → [1, 7].
 *   - At the same depth, skip the second 1 as a starting pick. Also get [1, 6, 1] as [1, 1, 6] and [2, 6].
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var combinationSum2 = function (inputCandidates, desiredTarget) {
  const finalCollection = [];
  inputCandidates.sort((firstNum, secondNum) => firstNum - secondNum);

  const findCombinations = (
    currentSumRequired,
    currentSequence,
    startEnumerationIndex
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
