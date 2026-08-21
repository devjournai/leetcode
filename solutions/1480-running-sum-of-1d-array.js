/**
 * Running Sum Of 1d Array
 * Intuition: Each output index is the prefix sum through that element; one accumulating variable fills the result.
 * Approach: 1. currentAccumulation = 0. 2. Map each number: add it to the accumulator and emit the new total. 3. Return the mapped array.
 * Dry Run: nums = [1,2,3,4]
 *   - 1; 1+2=3; 3+3=6; 6+4=10
 *   - [1,3,6,10]
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
