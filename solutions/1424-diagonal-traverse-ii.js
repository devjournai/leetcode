/**
 * Diagonal Traverse II
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
