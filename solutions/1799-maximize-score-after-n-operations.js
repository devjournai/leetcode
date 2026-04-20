/**
 * Maximize Score After N Operations
 * Time Complexity: O(N^2 * logM + 2^N * N^2)
 * Space Complexity: O(N^2 + 2^N)
 */
var maxScore = function (numsInput) {
  const elementCount = numsInput.length;
  const targetOperations = elementCount / 2;

  const pairwiseGcdResults = Array(elementCount)
    .fill(null)
    .map(() => Array(elementCount).fill(0));
  for (let indexOne = 0; indexOne < elementCount; ++indexOne) {
    for (let indexTwo = indexOne + 1; indexTwo < elementCount; ++indexTwo) {
      pairwiseGcdResults[indexOne][indexTwo] = calculateGreatestCommonDivisor(
        numsInput[indexOne],
        numsInput[indexTwo],
      );
    }
  }

  const scoreMemo = new Map();

  function calculateGreatestCommonDivisor(valueA, valueB) {
    while (valueB) {
      valueA %= valueB;
      const tempValue = valueA;
      valueA = valueB;
      valueB = tempValue;
    }
    return valueA;
  }

  function solveOperations(
    operationNumber,
    currentBitmask,
    memoStorage,
    gcdValues,
  ) {
    if (operationNumber > targetOperations) {
      return 0;
    }
    if (memoStorage.has(currentBitmask)) {
      return memoStorage.get(currentBitmask);
    }

    let maximumAchievableScore = 0;
    for (
      let firstChoiceIndex = 0;
      firstChoiceIndex < elementCount;
      ++firstChoiceIndex
    ) {
      if (((currentBitmask >> firstChoiceIndex) & 1) !== 0) {
        continue;
      }
      for (
        let secondChoiceIndex = firstChoiceIndex + 1;
        secondChoiceIndex < elementCount;
        ++secondChoiceIndex
      ) {
        if (((currentBitmask >> secondChoiceIndex) & 1) !== 0) {
          continue;
        }

        const nextBitmask =
          currentBitmask | (1 << firstChoiceIndex) | (1 << secondChoiceIndex);
        const currentPairScore =
          operationNumber * gcdValues[firstChoiceIndex][secondChoiceIndex];
        const remainingScore = solveOperations(
          operationNumber + 1,
          nextBitmask,
          memoStorage,
          gcdValues,
        );
        const totalOperationScore = currentPairScore + remainingScore;
        maximumAchievableScore = Math.max(
          maximumAchievableScore,
          totalOperationScore,
        );
      }
    }

    memoStorage.set(currentBitmask, maximumAchievableScore);
    return maximumAchievableScore;
  }

  return solveOperations(1, 0, scoreMemo, pairwiseGcdResults);
};
