/**
 * Relative Sort Array
 * Time Complexity: O(N + K)
 * Space Complexity: O(N + K)
 */
var relativeSortArray = function (arr1, arr2) {
  const maximumPossibleValue = 1000;
  const elementCounts = new Array(maximumPossibleValue + 1).fill(0);

  for (const numCurrent of arr1) {
    elementCounts[numCurrent]++;
  }

  const sortedResult = [];

  for (const targetValue of arr2) {
    while (elementCounts[targetValue] > 0) {
      sortedResult.push(targetValue);
      elementCounts[targetValue]--;
    }
  }

  for (
    let numericTracker = 0;
    numericTracker <= maximumPossibleValue;
    numericTracker++
  ) {
    while (elementCounts[numericTracker] > 0) {
      sortedResult.push(numericTracker);
      elementCounts[numericTracker]--;
    }
  }

  return sortedResult;
};
