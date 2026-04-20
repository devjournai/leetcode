/**
 * Subsets II
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
