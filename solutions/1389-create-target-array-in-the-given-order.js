/**
 * Create Target Array In The Given Order
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var createTargetArray = function (nums, index) {
  const desiredArray = [];
  const totalElementsCount = nums.length;

  for (
    let currentIteration = 0;
    currentIteration < totalElementsCount;
    currentIteration++
  ) {
    const valToInsert = nums[currentIteration];
    const targetInsertIndex = index[currentIteration];

    desiredArray.splice(targetInsertIndex, 0, valToInsert);
  }
  return desiredArray;
};
