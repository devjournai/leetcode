/**
 * Minimum Incompatibility
 * Time Complexity: O(N log N + 2^N * C(N, N/k))
 * Space Complexity: O(2^N + C(N, N/k))
 */
var minimumIncompatibility = function (nums, k) {
  const arrayLength = nums.length;
  const groupSize = arrayLength / k;

  const numberCounts = new Map();
  for (const oneNum of nums) {
    const currentCount = (numberCounts.get(oneNum) || 0) + 1;
    numberCounts.set(oneNum, currentCount);
    if (currentCount > k) {
      return -1;
    }
  }

  const numsCopy = [...nums].sort((paramA, paramB) => paramA - paramB);
  const possibleSubsets = new Map();

  function generateCombinations(
    currentMask,
    currentIdx,
    currentCount,
    minimumElement,
    maximumElement,
    currentElements,
  ) {
    if (currentCount === groupSize) {
      possibleSubsets.set(currentMask, maximumElement - minimumElement);
      return;
    }

    if (
      currentIdx >= arrayLength ||
      arrayLength - currentIdx < groupSize - currentCount
    ) {
      return;
    }

    generateCombinations(
      currentMask,
      currentIdx + 1,
      currentCount,
      minimumElement,
      maximumElement,
      currentElements,
    );

    const nextValue = numsCopy[currentIdx];
    if (!currentElements.has(nextValue)) {
      const nextElements = new Set(currentElements);
      nextElements.add(nextValue);

      const newMin = currentCount === 0 ? nextValue : minimumElement;
      const newMax = nextValue;

      generateCombinations(
        currentMask | (1 << currentIdx),
        currentIdx + 1,
        currentCount + 1,
        newMin,
        newMax,
        nextElements,
      );
    }
  }

  generateCombinations(0, 0, 0, Infinity, -Infinity, new Set());

  const memoizationTable = new Array(1 << arrayLength).fill(Infinity);
  memoizationTable[0] = 0;

  for (let state = 0; state < 1 << arrayLength; state++) {
    if (memoizationTable[state] === Infinity) {
      continue;
    }

    for (const [subgroupBitmask, subgroupValue] of possibleSubsets.entries()) {
      if ((state & subgroupBitmask) === 0) {
        const nextState = state | subgroupBitmask;
        memoizationTable[nextState] = Math.min(
          memoizationTable[nextState],
          memoizationTable[state] + subgroupValue,
        );
      }
    }
  }

  const finalResult = memoizationTable[(1 << arrayLength) - 1];
  return finalResult === Infinity ? -1 : finalResult;
};
