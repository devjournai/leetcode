/**
 * Create Target Array In The Given Order
 * Intuition: Each (nums[i], index[i]) means insert the value at that index, shifting later elements right—exactly Array.splice.
 * Approach: 1. Start with an empty array. 2. For i from 0 to n-1, splice nums[i] at index[i]. 3. Return the array.
 * Dry Run: nums = [0,1,2,3,4], index = [0,1,2,2,1].
 *   - [0] → [0,1] → [0,1,2] → [0,1,3,2] → [0,4,1,3,2].
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
