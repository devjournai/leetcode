/**
 * Concatenation Of Array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getConcatenation = function (nums) {
  const arrayLength = nums.length;
  const resultContainer = new Array(arrayLength * 2);

  for (let currentIdx = 0; currentIdx < arrayLength; currentIdx++) {
    resultContainer[currentIdx] = nums[currentIdx];
    resultContainer[currentIdx + arrayLength] = nums[currentIdx];
  }

  return resultContainer;
};
