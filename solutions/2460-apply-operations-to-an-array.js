/**
 * Apply Operations To An Array
 * Intuition: The problem involves two distinct phases: first, modifying adjacent elements based on a condition; second, rearranging the array by moving all zero elements to the end. These phases can be executed sequentially.
 * Approach: 1. First, iterate through the array from the beginning up to the second-to-last element. In each step, compare the current element with the next element. If they are equal, double the current element's value and set the next element's value to zero.
 * 2. After all operations are applied, proceed to shift all non-zero elements to the beginning of the array, effectively moving all zeros to the end. This is done using a two-pointer approach: one pointer (`writePointerPosition`) tracks where the next non-zero element should be placed, starting from the beginning of the array. Another pointer (`readPointerPosition`) iterates through the entire array. If `nums[readPointerPosition]` is not zero, it is moved to `nums[writePointerPosition]`, and `writePointerPosition` is incremented.
 * 3. Once `readPointerPosition` has traversed the entire array, all non-zero elements will be correctly positioned at the start. The remaining positions from `writePointerPosition` to the end of the array are then filled with zeros using an array method.
 * Dry Run: Given nums = [1,2,2,1,1,0]
 * Phase 1: Apply Operations
 * - arrayLengthInitial = 6
 * - iteratorIndex = 0: nums[0]=1, nums[1]=2. Not equal. nums remains [1,2,2,1,1,0].
 * - iteratorIndex = 1: nums[1]=2, nums[2]=2. Equal. nums[1] becomes 4, nums[2] becomes 0. nums is now [1,4,0,1,1,0].
 * - iteratorIndex = 2: nums[2]=0, nums[3]=1. Not equal. nums remains [1,4,0,1,1,0].
 * - iteratorIndex = 3: nums[3]=1, nums[4]=1. Equal. nums[3] becomes 2, nums[4] becomes 0. nums is now [1,4,0,2,0,0].
 * - iteratorIndex = 4: nums[4]=0, nums[5]=0. Equal. nums[4] becomes 0, nums[5] becomes 0. nums is now [1,4,0,2,0,0].
 * After Phase 1: nums = [1,4,0,2,0,0]
 *
 * Phase 2: Shift Zeros
 * - writePointerPosition = 0
 * - readPointerPosition = 0
 * - arrayLengthFinal = 6
 * - readPointerPosition = 0: currentNumber = nums[0]=1. Not zero. nums[0] = 1. writePointerPosition = 1.
 * - readPointerPosition = 1: currentNumber = nums[1]=4. Not zero. nums[1] = 4. writePointerPosition = 2.
 * - readPointerPosition = 2: currentNumber = nums[2]=0. Is zero. Skip.
 * - readPointerPosition = 3: currentNumber = nums[3]=2. Not zero. nums[2] = 2. writePointerPosition = 3.
 * - readPointerPosition = 4: currentNumber = nums[4]=0. Is zero. Skip.
 * - readPointerPosition = 5: currentNumber = nums[5]=0. Is zero. Skip.
 * - readPointerPosition = 6: Loop ends.
 * At this point, nums = [1,4,2,2,0,0] (values beyond writePointerPosition are not guaranteed to be 0 yet, but will be overwritten).
 * writePointerPosition is 3.
 *
 * Fill remaining with zeros:
 * - nums.fill(0, 3) effectively sets nums[3], nums[4], nums[5] to 0.
 * Final nums = [1,4,2,0,0,0].
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var applyOperations = function (nums) {
  let arrayLengthInitial = nums.length;

  for (
    let iteratorIndex = 0;
    iteratorIndex < arrayLengthInitial - 1;
    iteratorIndex++
  ) {
    if (nums[iteratorIndex] === nums[iteratorIndex + 1]) {
      nums[iteratorIndex] *= 2;
      nums[iteratorIndex + 1] = 0;
    }
  }

  let writePointerPosition = 0;
  let readPointerPosition = 0;
  let arrayLengthFinal = nums.length;

  while (readPointerPosition < arrayLengthFinal) {
    let currentNumber = nums[readPointerPosition];
    if (currentNumber !== 0) {
      nums[writePointerPosition] = currentNumber;
      writePointerPosition++;
    }
    readPointerPosition++;
  }

  nums.fill(0, writePointerPosition);

  return nums;
};
