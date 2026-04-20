/**
 * Running Sum Of 1d Array
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var runningSum = function (nums) {
  let currentAccumulation = 0;
  const resultCollection = nums.map(function (singleNumber) {
    currentAccumulation += singleNumber;
    return currentAccumulation;
  });
  return resultCollection;
};
