/**
 * Semi Ordered Permutation
 * Intuition: The minimum number of swaps to move an element from one position to another using only adjacent swaps is equal to the absolute difference between its current and target indices. To make the permutation semi-ordered, we need to move '1' to the first position (index 0) and 'n' (the largest number, which is nums.length) to the last position (index nums.length - 1). The total operations are the sum of operations for moving '1' and moving 'n'. A subtle interaction occurs if '1' is initially located to the right of 'n'. In this specific scenario, as '1' moves leftwards to its target position, it will inevitably swap past 'n'. This single "passing" swap effectively moves 'n' one step closer to its rightmost target, thereby reducing the total required operations by one.
 * Approach: 1. Initialize variables to store the current indices of '1' and 'n' (which is nums.length). 2. Iterate through the input array `nums` once to find these two indices. 3. Calculate the operations needed to move '1' to index 0, which is simply its current index. 4. Calculate the operations needed to move 'n' to the last index (`nums.length - 1`), which is `(nums.length - 1) - n's_current_index`. 5. Sum these two calculated operation counts. 6. Check if '1's initial index was greater than 'n's initial index. If so, subtract 1 from the total sum of operations to account for the single saved swap due to '1' passing 'n'. 7. Return the final adjusted sum.
 * Dry Run: nums = [3, 4, 1, 2], n = 4
 *   1. Initialize `firstElementLocation = 0`, `lastElementLocation = 0`.
 *   2. Initialize `totalElements = nums.length = 4`.
 *   3. Loop `currentPosition` from 0 to 3:
 *      - `currentPosition = 0`, `nums[0] = 3`. No match.
 *      - `currentPosition = 1`, `nums[1] = 4`. Since `4 === totalElements`, set `lastElementLocation = 1`.
 *      - `currentPosition = 2`, `nums[2] = 1`. Set `firstElementLocation = 2`.
 *      - `currentPosition = 3`, `nums[3] = 2`. No match.
 *   4. After loop: `firstElementLocation = 2`, `lastElementLocation = 1`.
 *   5. Calculate `movesForOne = firstElementLocation = 2`.
 *   6. Calculate `movesForN = (totalElements - 1) - lastElementLocation = (4 - 1) - 1 = 3 - 1 = 2`.
 *   7. Check condition for `collisionAdjustment`: Is `firstElementLocation (2)` greater than `lastElementLocation (1)`? Yes. So, `collisionAdjustment = 1`.
 *   8. Calculate `finalOperationCount = movesForOne + movesForN - collisionAdjustment = 2 + 2 - 1 = 3`.
 *   9. Return `3`.
 *   (Manual trace for validation:
 *    Initial: [3, 4, 1, 2]
 *    Move '1' to front (2 swaps):
 *    [3, 1, 4, 2] (1 swap: 4,1)
 *    [1, 3, 4, 2] (1 swap: 3,1)
 *    Now, '1' is at index 0. '4' is at index 2.
 *    Move '4' to end (1 swap):
 *    [1, 3, 2, 4] (1 swap: 4,2)
 *    Total 2 + 1 = 3 swaps.)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var semiOrderedPermutation = function (nums) {
  let firstElementLocation = 0;
  let lastElementLocation = 0;
  let totalElements = nums.length;

  for (
    let currentPosition = 0;
    currentPosition < totalElements;
    currentPosition++
  ) {
    if (nums[currentPosition] === 1) {
      firstElementLocation = currentPosition;
    }
    if (nums[currentPosition] === totalElements) {
      lastElementLocation = currentPosition;
    }
  }

  let movesForOne = firstElementLocation;
  let movesForN = totalElements - 1 - lastElementLocation;
  let collisionAdjustment = 0;

  if (firstElementLocation > lastElementLocation) {
    collisionAdjustment = 1;
  }

  let finalOperationCount = movesForOne + movesForN - collisionAdjustment;
  return finalOperationCount;
};
