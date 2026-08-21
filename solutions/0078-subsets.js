/**
 * Subsets
 * Intuition: Start from {∅} and, for each number, duplicate every existing subset and append the number—each element independently in or out.
 * Approach: 1. Seed `allCollectedSubsets` with []. 2. For each `currentNumber`, snapshot the current length and, for each existing subset, push a copy with the number appended.
 * Dry Run: nums=[1,2,3] → [] → [1] → [2],[1,2] → [3],[1,3],[2,3],[1,2,3]
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var subsets = function (nums) {
  const allCollectedSubsets = [];
  allCollectedSubsets.push([]);

  for (const currentNumber of nums) {
    const iterationLength = allCollectedSubsets.length;
    for (
      let collectionIndex = 0;
      collectionIndex < iterationLength;
      collectionIndex++
    ) {
      const baseSubset = allCollectedSubsets[collectionIndex];
      const extendedSubset = [...baseSubset, currentNumber];
      allCollectedSubsets.push(extendedSubset);
    }
  }

  return allCollectedSubsets;
};
