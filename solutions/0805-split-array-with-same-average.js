/**
 * Split Array With Same Average
 * Time Complexity: O(2^(N/2) + (N/2)^3 * MAX_ABS_VAL)
 * Space Complexity: O(N * MAX_ABS_VAL)
 */
var splitArraySameAverage = function (nums) {
  const totalElementsCount = nums.length;
  if (totalElementsCount === 1) {
    return false;
  }

  const overallElementsSum = nums.reduce(
    (initialAccumulator, currentArrayValue) =>
      initialAccumulator + currentArrayValue,
    0,
  );

  const firstHalfCountLimit = Math.floor(totalElementsCount / 2);

  const firstHalfCollections = Array(firstHalfCountLimit + 1)
    .fill()
    .map(() => new Set());

  const generateSubsetsRecursively = (
    startIndexValue,
    endIndexValue,
    currentSubsetElementsCount,
    currentSubsetSumValue,
    sumSetsContainer,
  ) => {
    if (startIndexValue === endIndexValue) {
      sumSetsContainer[currentSubsetElementsCount].add(currentSubsetSumValue);
      return;
    }

    generateSubsetsRecursively(
      startIndexValue + 1,
      endIndexValue,
      currentSubsetElementsCount,
      currentSubsetSumValue,
      sumSetsContainer,
    );

    generateSubsetsRecursively(
      startIndexValue + 1,
      endIndexValue,
      currentSubsetElementsCount + 1,
      currentSubsetSumValue + nums[startIndexValue],
      sumSetsContainer,
    );
  };

  generateSubsetsRecursively(
    0,
    firstHalfCountLimit,
    0,
    0,
    firstHalfCollections,
  );

  const secondHalfCountLimit = totalElementsCount - firstHalfCountLimit;
  const secondHalfCollections = Array(secondHalfCountLimit + 1)
    .fill()
    .map(() => new Set());
  generateSubsetsRecursively(
    firstHalfCountLimit,
    totalElementsCount,
    0,
    0,
    secondHalfCollections,
  );

  for (let subsetLenA = 0; subsetLenA <= firstHalfCountLimit; subsetLenA++) {
    for (const subsetSumA of firstHalfCollections[subsetLenA]) {
      for (
        let subsetLenB = 0;
        subsetLenB <= secondHalfCountLimit;
        subsetLenB++
      ) {
        const combinedSubsetLength = subsetLenA + subsetLenB;

        if (
          combinedSubsetLength === 0 ||
          combinedSubsetLength === totalElementsCount
        ) {
          continue;
        }

        const combinedTargetSum =
          (overallElementsSum * combinedSubsetLength) / totalElementsCount;

        if (combinedTargetSum % 1 !== 0) {
          continue;
        }

        const neededSumB = combinedTargetSum - subsetSumA;

        if (secondHalfCollections[subsetLenB].has(neededSumB)) {
          return true;
        }
      }
    }
  }

  return false;
};
