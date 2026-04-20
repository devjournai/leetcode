/**
 * Next Greater Element II
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var nextGreaterElements = function (nums) {
  const inputLength = nums.length;
  const resultContainer = new Array(inputLength).fill(-1);
  const indicesStorage = [];

  for (
    let iterationCounter = 0;
    iterationCounter < 2 * inputLength;
    iterationCounter++
  ) {
    const activeIndex = iterationCounter % inputLength;
    const currentElementValue = nums[activeIndex];

    while (
      indicesStorage.length > 0 &&
      currentElementValue > nums[indicesStorage[indicesStorage.length - 1]]
    ) {
      const lastPoppedIndex = indicesStorage.pop();
      resultContainer[lastPoppedIndex] = currentElementValue;
    }
    indicesStorage.push(activeIndex);
  }

  return resultContainer;
};
