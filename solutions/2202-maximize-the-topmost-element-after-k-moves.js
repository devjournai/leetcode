/**
 * Maximize The Topmost Element After K Moves
 * Intuition: The maximum topmost element after exactly k moves can come from two main scenarios: either it's an element that naturally surfaces after removing k preceding elements, or it's an element that was removed and subsequently placed back on top. Special edge cases for small pile sizes or few moves also need consideration.
 * Approach:
 * 1. Initialize variables for the array's length and the maximum value found.
 * 2. Handle specific edge cases for clarity and correctness:
 *    a. If the pile has a single element (`lengthOfNums` is 1) and `totalMoves` is odd, performing `totalMoves` moves will result in an empty pile, so return -1.
 *    b. If `totalMoves` is 0, no moves are made, and the topmost element remains `nums[0]`.
 *    c. If `totalMoves` is 1, one element is removed. If `lengthOfNums` is also 1, the pile becomes empty. Otherwise, `nums[1]` becomes the new topmost element.
 * 3. Iterate to find potential candidates that can be removed and then placed back on top:
 *    An element `nums[loopIndex]` can be placed back on top if there are enough moves to first remove `loopIndex` elements above it, then remove `nums[loopIndex]` itself, and then place `nums[loopIndex]` back. This requires `loopIndex + 2` moves. Thus, `loopIndex` must be less than `totalMoves - 1`. The loop runs for `loopIndex` from 0 up to `min(totalMoves - 1, lengthOfNums) - 1`, tracking the maximum value encountered.
 * 4. Consider the element `nums[totalMoves]` as another potential candidate:
 *    This element can become the topmost if exactly `totalMoves` elements (`nums[0]` through `nums[totalMoves - 1]`) are removed, exposing `nums[totalMoves]`. This is only possible if `totalMoves` is less than `lengthOfNums`. Update the maximum value if `nums[totalMoves]` is greater.
 * 5. Return the final `maximumValue`.
 * Dry Run: nums = [1,2,3,4,5], k = 3
 *   lengthOfNums = 5, totalMoves = 3
 *   1. Check special conditions:
 *      - (lengthOfNums === 1 && totalMoves % 2 === 1) : (5 === 1 && 3 % 2 === 1) is false.
 *      - (totalMoves === 0) : (3 === 0) is false.
 *      - (totalMoves === 1) : (3 === 1) is false.
 *   2. maximumValue = 0.
 *   3. Loop for 'removed and placed back' candidates:
 *      `loopIndex` iterates from 0 up to `Math.min(totalMoves - 1, lengthOfNums) - 1`.
 *      `Math.min(3 - 1, 5) - 1 = Math.min(2, 5) - 1 = 2 - 1 = 1`.
 *      So, `loopIndex` will be 0 and 1.
 *      - `loopIndex = 0`: `nums[0]` is 1. `maximumValue = Math.max(0, 1) = 1`.
 *      - `loopIndex = 1`: `nums[1]` is 2. `maximumValue = Math.max(1, 2) = 2`.
 *   4. Check `nums[totalMoves]` as a candidate:
 *      `(totalMoves < lengthOfNums)`: (3 < 5) is true.
 *      `nums[totalMoves]` is `nums[3]`, which is 4.
 *      `maximumValue = Math.max(maximumValue, nums[3]) = Math.max(2, 4) = 4`.
 *   5. Return `maximumValue`, which is 4.
 * Time Complexity: O(min(k, n))
 * Space Complexity: O(1)
 */
var maximumTop = function (nums, k) {
  const lengthOfNums = nums.length;

  if (lengthOfNums === 1 && k % 2 === 1) {
    return -1;
  }

  if (k === 0) {
    return nums[0];
  }

  if (k === 1) {
    return lengthOfNums > 1 ? nums[1] : -1;
  }

  let maximumValue = 0;
  for (
    let loopIndex = 0;
    loopIndex < Math.min(k - 1, lengthOfNums);
    loopIndex++
  ) {
    maximumValue = Math.max(maximumValue, nums[loopIndex]);
  }

  if (k < lengthOfNums) {
    maximumValue = Math.max(maximumValue, nums[k]);
  }

  return maximumValue;
};
