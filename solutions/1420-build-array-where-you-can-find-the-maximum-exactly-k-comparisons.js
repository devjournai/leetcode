/**
 * Build Array Where You Can Find The Maximum Exactly K Comparisons
 * Intuition: DP over length, current maximum, and search cost. Appending a value <= max does not raise cost (max choices); appending a new max raises cost by 1.
 * Approach: 1. dp[len][max][cost]: ways to fill length `len` with maximum `max` and cost `cost`. 2. Base: dp[1][v][1] = 1 for v in 1..m. 3. Transition: stay at max by multiplying previous ways by max; become a new max by summing ways of all smaller previous maxima with cost-1. 4. Sum dp[n][*][k] mod 1e9+7.
 * Dry Run: n = 2, m = 3, k = 1.
 *   - Length 1: each of 1,2,3 has cost 1. Length 2 with cost 1: second value cannot exceed current max. Ways: (1,1)=1; (2,1)(2,2)=2; (3,1)(3,2)(3,3)=3. Total 6.
 * Time Complexity: O(n * m * k)
 * Space Complexity: O(n * m * k)
 */
var numOfArrays = function (arrayLength, maxValue, searchCost) {
  const modValue = 1e9 + 7;

  const memoizationTable = Array.from({ length: arrayLength + 1 }, () =>
    Array.from({ length: maxValue + 1 }, () => Array(searchCost + 1).fill(0))
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
