/**
 * Build Array Where You Can Find The Maximum Exactly K Comparisons
 * Time Complexity: O(n * m * k)
 * Space Complexity: O(n * m * k)
 */
var numOfArrays = function (arrayLength, maxValue, searchCost) {
  const modValue = 1e9 + 7;

  const memoizationTable = Array.from({ length: arrayLength + 1 }, () =>
    Array.from({ length: maxValue + 1 }, () => Array(searchCost + 1).fill(0)),
  );

  for (
    let currentElementValue = 1;
    currentElementValue <= maxValue;
    currentElementValue++
  ) {
    memoizationTable[1][currentElementValue][1] = 1;
  }

  for (
    let currentArraySize = 2;
    currentArraySize <= arrayLength;
    currentArraySize++
  ) {
    for (
      let currentComparisonCost = 1;
      currentComparisonCost <= searchCost;
      currentComparisonCost++
    ) {
      let sumOfWaysForNewMax = 0;

      for (
        let currentMaximumValue = 1;
        currentMaximumValue <= maxValue;
        currentMaximumValue++
      ) {
        let waysNotIncreasingMax =
          (memoizationTable[currentArraySize - 1][currentMaximumValue][
            currentComparisonCost
          ] *
            currentMaximumValue) %
          modValue;
        memoizationTable[currentArraySize][currentMaximumValue][
          currentComparisonCost
        ] =
          (memoizationTable[currentArraySize][currentMaximumValue][
            currentComparisonCost
          ] +
            waysNotIncreasingMax) %
          modValue;

        if (currentComparisonCost > 1) {
          memoizationTable[currentArraySize][currentMaximumValue][
            currentComparisonCost
          ] =
            (memoizationTable[currentArraySize][currentMaximumValue][
              currentComparisonCost
            ] +
              sumOfWaysForNewMax) %
            modValue;
        }

        if (currentComparisonCost > 1) {
          sumOfWaysForNewMax =
            (sumOfWaysForNewMax +
              memoizationTable[currentArraySize - 1][currentMaximumValue][
                currentComparisonCost - 1
              ]) %
            modValue;
        }
      }
    }
  }

  let resultCount = 0;
  for (
    let finalMaxElement = 1;
    finalMaxElement <= maxValue;
    finalMaxElement++
  ) {
    resultCount =
      (resultCount +
        memoizationTable[arrayLength][finalMaxElement][searchCost]) %
      modValue;
  }

  return resultCount;
};
