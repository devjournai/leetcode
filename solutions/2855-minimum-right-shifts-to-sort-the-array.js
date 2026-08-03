/**
 * Minimum Right Shifts To Sort The Array
 * Intuition: A sorted array can be obtained by right-shifting if and only if the original array is a "rotated sorted array". This means it can have at most one "descent" point (where an element is smaller than its preceding element), and the elements must wrap around correctly.
 * Approach: 1. Iterate through the array to count "descent" points, where `nums[i] < nums[i-1]`. If more than one descent is found, it's impossible, return -1. 2. If no descents are found, the array is already sorted, return 0. 3. If exactly one descent is found, verify the "wrap-around" condition: the last element must be less than or equal to the first element to form a valid rotated sorted array. If not, return -1. 4. If all conditions pass, the number of shifts needed is `arrayLength - indexOfMinimumElement`, as the minimum element needs to move to index 0.
 * Dry Run:
 * Input: nums = [3, 4, 5, 1, 2]
 * arrayLength = 5
 * descentCounter = 0
 *
 * Loop (loopIndex from 1 to 4):
 * - loopIndex = 1: nums[1]=4, nums[0]=3. 4 < 3 is false.
 * - loopIndex = 2: nums[2]=5, nums[1]=4. 5 < 4 is false.
 * - loopIndex = 3: nums[3]=1, nums[2]=5. 1 < 5 is true. descentCounter becomes 1. (1 > 1 is false)
 * - loopIndex = 4: nums[4]=2, nums[3]=1. 2 < 1 is false.
 *
 * Loop ends. descentCounter is 1.
 *
 * Check conditions:
 * - descentCounter === 0 (1 === 0) is false.
 * - nums[arrayLength - 1] (nums[4] = 2) > nums[0] (nums[0] = 3) (2 > 3) is false.
 *
 * Calculate shifts:
 * minimumValue = Math.min(...nums) = 1
 * minimumIndex = nums.indexOf(minimumValue) = nums.indexOf(1) = 3
 * shiftCount = arrayLength - minimumIndex = 5 - 3 = 2
 * Return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumRightShifts = function (nums) {
  const arrayLength = nums.length;
  let descentCounter = 0;
  let loopIndex = 0;

  for (loopIndex = 1; loopIndex < arrayLength; loopIndex++) {
    if (nums[loopIndex] < nums[loopIndex - 1]) {
      descentCounter++;
      if (descentCounter > 1) {
        return -1;
      }
    }
  }

  if (descentCounter === 0) {
    return 0;
  }

  if (nums[arrayLength - 1] > nums[0]) {
    return -1;
  }

  const minimumValue = Math.min(...nums);
  const minimumIndex = nums.indexOf(minimumValue);
  const shiftCount = arrayLength - minimumIndex;
  return shiftCount;
};
