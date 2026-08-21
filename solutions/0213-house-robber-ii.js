/**
 * House Robber II
 * Intuition: Houses sit in a circle, so the first and last cannot both be robbed. Solve the linear House Robber problem twice: omit the last house, then omit the first, and take the max.
 * Approach: 1. If one house, return its value. 2. calculateMaxRob walks [start, end) with two rolling maxima (prev/curr). 3. Run on [0, n-1) and [1, n). 4. Return the larger result.
 * Dry Run: nums = [2,3,2].
 *   - Range [0,2): idx0 curr=2; idx1 curr=max(3,2)=3.
 *   - Range [1,3): idx1 curr=3; idx2 curr=max(2,3)=3.
 *   - max(3,3) = 3.
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
