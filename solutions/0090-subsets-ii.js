/**
 * Subsets II
 * Intuition: Sort first so duplicates are adjacent; when backtracking, skip a value if it equals the previous at the same recursion depth so identical subsets are not generated twice.
 * Approach: 1. Sort a copy of nums. 2. Recurse: always record the current path. 3. Loop from beginIndex; if iterationIndex > begin and nums[i]==nums[i-1], continue; else append nums[i] and recurse from i+1.
 * Dry Run: [1,2,2] sorted → [], [1], [1,2], [1,2,2], [2], [2,2] (second leading 2 skipped at the same level)
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var subsetsWithDup = function (nums) {
  const numbersSorted = nums
    .slice()
    .sort((valueOne, valueTwo) => valueOne - valueTwo);

  const collectionOfSubsets = [];

  function recursiveSearch(currentSubsetConstruction, beginIndex) {
    collectionOfSubsets.push([...currentSubsetConstruction]);

    for (
      let iterationIndex = beginIndex;
      iterationIndex < numbersSorted.length;
      iterationIndex++
    ) {
      if (
        iterationIndex > beginIndex &&
        numbersSorted[iterationIndex] === numbersSorted[iterationIndex - 1]
      ) {
        continue;
      }

      const nextSubsetFormation = [
        ...currentSubsetConstruction,
        numbersSorted[iterationIndex],
      ];
      recursiveSearch(nextSubsetFormation, iterationIndex + 1);
    }
  }

  recursiveSearch([], 0);

  return collectionOfSubsets;
};
