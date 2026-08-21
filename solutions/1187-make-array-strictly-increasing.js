/**
 * Make Array Strictly Increasing
 * Intuition: At each arr1 index keep possible last values after a minimum number of replacements from a sorted unique arr2.
 * Approach: 1. Sort unique arr2. 2. DP map lastValue → ops. 3. For each arr1[i], keep it if larger than last, or replace with the smallest arr2 values strictly above last. 4. Prune dominated states; return min ops or -1.
 * Dry Run: arr1=[1,5,3], arr2=[4,2]. Keep 1. At 5 keep 5 (0 ops) or replace with 2/4. At 3 cannot keep after 5; replace with a value > last from arr2. Min ops = 1.
 * Time Complexity: O(N * M * log M)
 * Space Complexity: O(M)
 */
var makeArrayIncreasing = function (arr1, arr2) {
  const deduplicatedSortedSecondArray = [...new Set(arr2)].sort(
    (firstVal, secondVal) => firstVal - secondVal
  );
  let dynamicProgrammingStates = new Map([[-Infinity, 0]]);

  for (let arrayOneIndex = 0; arrayOneIndex < arr1.length; arrayOneIndex++) {
    const currentIterationDpStates = new Map();
    let minimumOperationsConsidered = Infinity;

    for (const [
      previousArrayValue,
      operationsTaken,
    ] of dynamicProgrammingStates) {
      if (operationsTaken >= minimumOperationsConsidered) {
        continue;
      }

      if (arr1[arrayOneIndex] > previousArrayValue) {
        updateMinimumValue(
          currentIterationDpStates,
          arr1[arrayOneIndex],
          operationsTaken
        );
        minimumOperationsConsidered = Math.min(
          minimumOperationsConsidered,
          operationsTaken
        );
      }

      const startSearchIndex = findInsertionIndex(
        deduplicatedSortedSecondArray,
        previousArrayValue
      );
      for (
        let secondArraySearchIndex = startSearchIndex;
        secondArraySearchIndex < deduplicatedSortedSecondArray.length;
        secondArraySearchIndex++
      ) {
        const secondArraySelectedValue =
          deduplicatedSortedSecondArray[secondArraySearchIndex];
        if (secondArraySelectedValue <= previousArrayValue) {
          continue;
        }
        updateMinimumValue(
          currentIterationDpStates,
          secondArraySelectedValue,
          operationsTaken + 1
        );
        minimumOperationsConsidered = Math.min(
          minimumOperationsConsidered,
          operationsTaken + 1
        );
        if (secondArraySelectedValue >= arr1[arrayOneIndex]) {
          break;
        }
      }
    }

    if (currentIterationDpStates.size === 0) {
      return -1;
    }
    dynamicProgrammingStates = filterAndSortStates(currentIterationDpStates);
  }

  let overallMinimumOperations = Infinity;
  for (const operations of dynamicProgrammingStates.values()) {
    overallMinimumOperations = Math.min(overallMinimumOperations, operations);
  }
  return overallMinimumOperations;
};

function updateMinimumValue(dataMap, dataKey, dataValue) {
  dataMap.set(dataKey, Math.min(dataValue, dataMap.get(dataKey) ?? Infinity));
}

function findInsertionIndex(currentArray, comparisonTarget) {
  let lowPointer = 0;
  let highPointer = currentArray.length;
  while (lowPointer < highPointer) {
    const middlePointer = Math.floor((lowPointer + highPointer) / 2);
    if (currentArray[middlePointer] <= comparisonTarget) {
      lowPointer = middlePointer + 1;
    } else {
      highPointer = middlePointer;
    }
  }
  return lowPointer;
}

function filterAndSortStates(inputMap) {
  const processedMap = new Map();
  let currentMinimumSteps = Infinity;
  const sortedEntries = [...inputMap].sort(
    (entryA, entryB) => entryA[0] - entryB[0]
  );

  for (const [entryValue, entrySteps] of sortedEntries) {
    if (entrySteps < currentMinimumSteps) {
      processedMap.set(entryValue, entrySteps);
      currentMinimumSteps = entrySteps;
    }
  }
  return processedMap;
}
