/**
 * Split Array With Same Average
 * Intuition: A nonempty proper subset with average equal to the whole means `sum(subset) = totalSum * len / n` (integer). Meet-in-the-middle: all subset (len,sum) of each half, then look for a complement sum.
 * Approach: 1. n=1 → false. 2. Recurse first half into `firstHalfCollections[len]` sets of sums; same for second half. 3. Nested over lenA,sumA,lenB; skip empty/full; skip non-integer target; if `secondHalfCollections[lenB]` has `target-sumA`, true.
 * Dry Run: nums = [1,2,3,4,5,6,7,8]. Subset of size 4 summing to 18 exists → true.
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
    0
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
    sumSetsContainer
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
      sumSetsContainer
    );

    generateSubsetsRecursively(
      startIndexValue + 1,
      endIndexValue,
      currentSubsetElementsCount + 1,
      currentSubsetSumValue + nums[startIndexValue],
      sumSetsContainer
    );
  };

  generateSubsetsRecursively(
    0,
    firstHalfCountLimit,
    0,
    0,
    firstHalfCollections
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
    secondHalfCollections
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
