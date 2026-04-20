/**
 * House Robber II
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var rob = function (nums) {
  const arrayLength = nums.length;

  if (arrayLength === 1) {
    return nums[0];
  }

  const calculateMaxRob = (targetNums, startIdx, endIdx) => {
    let prevMax = 0;
    let currMax = 0;

    for (let loopIndex = startIdx; loopIndex < endIdx; loopIndex++) {
      const tempHold = prevMax;
      prevMax = currMax;
      currMax = Math.max(tempHold + targetNums[loopIndex], prevMax);
    }

    return currMax;
  };

  const resultOne = calculateMaxRob(nums, 0, arrayLength - 1);
  const resultTwo = calculateMaxRob(nums, 1, arrayLength);

  return Math.max(resultOne, resultTwo);
};
