/**
 * Diagonal Traverse II
 * Intuition: Cells on the same diagonal share row + col. Group by that sum, then reverse each group so we emit bottom-left to top-right as required.
 * Approach: 1. For each nums[outerIndex][innerIndex], push the value into diagonalBuckets[outerIndex + innerIndex]. 2. Walk buckets in increasing diagonal index. 3. Reverse each non-empty bucket and append it to the output. 4. Return the flattened array.
 * Dry Run: nums = [[1,2,3],[4,5],[6]]
 *   - diagonal 0: [1] -> reverse [1]
 *   - diagonal 1: [2,4] -> reverse [4,2]
 *   - diagonal 2: [3,5,6] -> reverse [6,5,3]
 *   - result [1,4,2,6,5,3]
 * Time Complexity: O(totalElements)
 * Space Complexity: O(totalElements)
 */
var findDiagonalOrder = function (nums) {
  const diagonalBuckets = [];

  for (let outerIndex = 0; outerIndex < nums.length; outerIndex++) {
    for (
      let innerIndex = 0;
      innerIndex < nums[outerIndex].length;
      innerIndex++
    ) {
      const currentSum = outerIndex + innerIndex;
      const elementValue = nums[outerIndex][innerIndex];

      if (!diagonalBuckets[currentSum]) {
        diagonalBuckets[currentSum] = [];
      }
      diagonalBuckets[currentSum].push(elementValue);
    }
  }

  const finalOutput = [];

  for (
    let diagonalIterationIndex = 0;
    diagonalIterationIndex < diagonalBuckets.length;
    diagonalIterationIndex++
  ) {
    const currentDiagonalGroup = diagonalBuckets[diagonalIterationIndex];

    if (currentDiagonalGroup) {
      const reversedDiagonalGroup = currentDiagonalGroup.reverse();
      finalOutput.push(...reversedDiagonalGroup);
    }
  }

  return finalOutput;
};
