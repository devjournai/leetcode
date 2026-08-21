/**
 * Wiggle Sort
 * Intuition: A wiggle is nums[0] <= nums[1] >= nums[2] <= ... Local swaps at even/odd indices enforce each adjacent inequality in one pass.
 * Approach: 1. Scan i from 0 to n-2. 2. Even i: if nums[i] > nums[i+1], swap. 3. Odd i: if nums[i] < nums[i+1], swap.
 * Dry Run: nums = [3,5,2,1,6,4].
 *   - i=0 even 3<=5. i=1 odd 5>=2. i=2 even 2>1 → swap [3,5,1,2,6,4]. i=3 odd 2<6 → swap [3,5,1,6,2,4]. i=4 even 2<=4.
 *   - Result [3,5,1,6,2,4].
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var wiggleSort = function (nums) {
  const arraySize = nums.length;

  for (let loopIndex = 0; loopIndex < arraySize - 1; loopIndex++) {
    if (loopIndex % 2 === 0) {
      if (nums[loopIndex] > nums[loopIndex + 1]) {
        [nums[loopIndex], nums[loopIndex + 1]] = [
          nums[loopIndex + 1],
          nums[loopIndex],
        ];
      }
    }

    if (loopIndex % 2 !== 0) {
      if (nums[loopIndex] < nums[loopIndex + 1]) {
        [nums[loopIndex], nums[loopIndex + 1]] = [
          nums[loopIndex + 1],
          nums[loopIndex],
        ];
      }
    }
  }
};
