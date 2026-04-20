/**
 * Sum Of Special Evenly Spaced Elements In Array
 * Time Complexity: O(N * sqrt(N) + Q * sqrt(N))
 * Space Complexity: O(N * sqrt(N))
 */
var solve = function (nums, queries) {
  const modValue = 1e9 + 7;
  const arraySize = nums.length;
  const sqrtThreshold = Math.floor(Math.sqrt(arraySize));
  const precomputedResultsMap = new Map();

  for (let loopStep = 1; loopStep <= sqrtThreshold; loopStep++) {
    const currentSuffixStorage = new Array(arraySize).fill(0);
    for (
      let indexForSuffix = arraySize - 1;
      indexForSuffix >= 0;
      indexForSuffix--
    ) {
      const nextElementIndex = indexForSuffix + loopStep;
      if (nextElementIndex < arraySize) {
        currentSuffixStorage[indexForSuffix] =
          (nums[indexForSuffix] + currentSuffixStorage[nextElementIndex]) %
          modValue;
      } else {
        currentSuffixStorage[indexForSuffix] = nums[indexForSuffix];
      }
    }
    precomputedResultsMap.set(loopStep, currentSuffixStorage);
  }

  const resultCollection = [];

  for (
    let queryIdentifier = 0;
    queryIdentifier < queries.length;
    queryIdentifier++
  ) {
    const currentQueryPair = queries[queryIdentifier];
    const startElementIndex = currentQueryPair[0];
    const spacingInterval = currentQueryPair[1];

    if (spacingInterval <= sqrtThreshold) {
      const retrievedSums = precomputedResultsMap.get(spacingInterval);
      resultCollection.push(retrievedSums[startElementIndex]);
    } else {
      let iterationSum = 0;
      let currentElementPointer = startElementIndex;
      while (currentElementPointer < arraySize) {
        iterationSum = (iterationSum + nums[currentElementPointer]) % modValue;
        currentElementPointer += spacingInterval;
      }
      resultCollection.push(iterationSum);
    }
  }

  return resultCollection;
};
