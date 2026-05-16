/**
 * Find Minimum in Rotated Sorted Array II
 * Intuition: The core idea is to adapt binary search to find the minimum element in a rotated sorted array. The presence of duplicates introduces a specific challenge: when the middle element is equal to the rightmost element, we cannot definitively determine which half is sorted. In such cases, we can safely discard the rightmost element as it's either a duplicate of the minimum or not the minimum itself. This shrinking of the search space continues until the minimum is found.
 * Approach: 1. Initialize two pointers, `startPointer` at the beginning and `endPointer` at the end of the array. 2. While `startPointer` is less than `endPointer`, calculate the `middlePointer`. 3. Compare `nums[middlePointer]` with `nums[endPointer]`: if `nums[middlePointer] < nums[endPointer]`, the minimum is in the left half or `middlePointer`, so set `endPointer = middlePointer`. 4. If `nums[middlePointer] > nums[endPointer]`, the minimum must be in the right half, so set `startPointer = middlePointer + 1`. 5. If `nums[middlePointer] == nums[endPointer]`, we cannot be sure which half contains the minimum due to duplicates; safely decrement `endPointer` to shrink the search space. 6. Once `startPointer` equals `endPointer`, the loop terminates, and `nums[startPointer]` (or `nums[endPointer]`) is the minimum element.
 * Dry Run: nums = [3,3,1,3]
 *   1. Initialize: `startPointer = 0`, `endPointer = 3`
 *   2. Iteration 1:
 *      - `middlePointer = 0 + Math.floor((3 - 0) / 2) = 1`
 *      - `nums[middlePointer]` (`nums[1] = 3`)
 *      - `nums[endPointer]` (`nums[3] = 3`)
 *      - `nums[middlePointer] == nums[endPointer]` (3 == 3) is true.
 *      - Action: `endPointer--`. `endPointer` becomes `2`.
 *      - Current state: `startPointer = 0`, `endPointer = 2`
 *   3. Iteration 2:
 *      - `middlePointer = 0 + Math.floor((2 - 0) / 2) = 1`
 *      - `nums[middlePointer]` (`nums[1] = 3`)
 *      - `nums[endPointer]` (`nums[2] = 1`)
 *      - `nums[middlePointer] > nums[endPointer]` (3 > 1) is true.
 *      - Action: `startPointer = middlePointer + 1`. `startPointer` becomes `2`.
 *      - Current state: `startPointer = 2`, `endPointer = 2`
 *   4. Loop condition (`startPointer < endPointer`) is `2 < 2`, which is false. Loop terminates.
 *   5. Return `nums[startPointer]` (`nums[2]`), which is `1`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findMin = function (nums) {
  let initialIndex = 0;
  let finalIndex = nums.length - 1;

  while (initialIndex < finalIndex) {
    let midPoint = Math.floor(initialIndex + (finalIndex - initialIndex) / 2);

    if (nums[midPoint] < nums[finalIndex]) {
      finalIndex = midPoint;
    } else if (nums[midPoint] > nums[finalIndex]) {
      initialIndex = midPoint + 1;
    } else {
      finalIndex--;
    }
  }

  return nums[initialIndex];
};
