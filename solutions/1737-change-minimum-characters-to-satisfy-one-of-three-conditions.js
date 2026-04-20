/**
 * Change Minimum Characters To Satisfy One Of Three Conditions
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var minCharacters = function (a, b) {
  const stringALength = a.length;
  const stringBLength = b.length;

  const getCharFrequencyMap = (sourceString) => {
    const charCounts = Array(26).fill(0);
    for (const charElement of sourceString) {
      charCounts[charElement.charCodeAt(0) - 97]++;
    }
    return charCounts;
  };

  const getCumulativeFrequency = (baseFreqArray) => {
    const cumulativeFreqs = Array(26).fill(0);
    let currentTotal = 0;
    for (let position = 0; position < 26; position++) {
      currentTotal += baseFreqArray[position];
      cumulativeFreqs[position] = currentTotal;
    }
    return cumulativeFreqs;
  };

  const findMinOperationsThreshold = (
    lenPrimary,
    lenSecondary,
    primaryPrefixSums,
    secondaryPrefixSums,
  ) => {
    let minOpsForThreshold = Infinity;
    for (let boundaryIndex = 0; boundaryIndex < 25; boundaryIndex++) {
      const opsForPrimary = lenPrimary - primaryPrefixSums[boundaryIndex];

      const opsForSecondary = secondaryPrefixSums[boundaryIndex];

      const currentCombinedOps = opsForPrimary + opsForSecondary;
      if (currentCombinedOps < minOpsForThreshold) {
        minOpsForThreshold = currentCombinedOps;
      }
    }
    return minOpsForThreshold;
  };

  const findMinOperationsSingleDistinct = (
    lenOne,
    lenTwo,
    freqOne,
    freqTwo,
  ) => {
    let minOpsForDistinct = Infinity;
    for (
      let targetLetterIndex = 0;
      targetLetterIndex < 26;
      targetLetterIndex++
    ) {
      const opsChangeOne = lenOne - freqOne[targetLetterIndex];
      const opsChangeTwo = lenTwo - freqTwo[targetLetterIndex];

      const currentTotalSingleOps = opsChangeOne + opsChangeTwo;
      if (currentTotalSingleOps < minOpsForDistinct) {
        minOpsForDistinct = currentTotalSingleSingleOps;
      }
    }
    return minOpsForDistinct;
  };

  const freqA = getCharFrequencyMap(a);
  const freqB = getCharFrequencyMap(b);

  const prefixSumA = getCumulativeFrequency(freqA);
  const prefixSumB = getCumulativeFrequency(freqB);

  const resultConditionOne = findMinOperationsThreshold(
    stringALength,
    stringBLength,
    prefixSumA,
    prefixSumB,
  );

  const resultConditionTwo = findMinOperationsThreshold(
    stringBLength,
    stringALength,
    prefixSumB,
    prefixSumA,
  );

  const resultConditionThree = findMinOperationsSingleDistinct(
    stringALength,
    stringBLength,
    freqA,
    freqB,
  );

  return Math.min(resultConditionOne, resultConditionTwo, resultConditionThree);
};
