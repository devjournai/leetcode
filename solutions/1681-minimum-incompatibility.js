/**
 * Minimum Incompatibility
 * Intuition: Split `nums` into `k` groups of size `n/k` with distinct values; incompatibility of a group is max−min. If any value appears more than `k` times the split is impossible. Enumerate valid group bitmasks, then DP over subsets to cover all indices with minimum total incompatibility.
 * Approach: 1. Count frequencies in `numberCounts`; return -1 if any count exceeds `k`. 2. Sort a copy `numsCopy` and `generateCombinations` of size `groupSize` with unique values, storing `possibleSubsets` mask → (max−min). 3. `memoizationTable[state]` = min cost to cover `state`; iterate masks and try disjoint subgroup bitmasks. 4. Return the full-mask cost, or -1 if still Infinity.
 * Dry Run: nums = [1,2,1,4], k = 2
 * n=4, groupSize=2; counts OK. Valid pairs (unique): {1,2} cost 1, {1,4} cost 3, {2,4} cost 2. DP covers all 4 indices with two groups summing to 4 (e.g. {1,2}+{1,4}).
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
    currentElements
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
      currentElements
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
        nextElements
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
          memoizationTable[state] + subgroupValue
        );
      }
    }
  }

  const finalResult = memoizationTable[(1 << arrayLength) - 1];
  return finalResult === Infinity ? -1 : finalResult;
};
