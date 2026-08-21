/**
 * Max Consecutive Ones II
 * Intuition: At most one 0 may be flipped, so the longest window that contains at most one 0 is the answer. Shrink from the left whenever a second 0 enters.
 * Approach: 1. Two pointers `windowBegin`/`windowEnd` and `zerosInWindow`. 2. Expanding: increment zeros when `nums[windowEnd]===0`. 3. While zeros > 1, if the left is 0 decrement zeros, then `windowBegin++`. 4. Track max `windowEnd - windowBegin + 1`.
 * Dry Run: nums = [1,0,1,1,0].
 *   - [1], [1,0], [1,0,1], [1,0,1,1] still one zero, length 4. Next 0 makes two zeros → drop left 1 then 0, window [1,1,0], length 3. Max 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findMaxConsecutiveOnes = function (nums) {
  let longestSequence = 0;
  let windowBegin = 0;
  let zerosInWindow = 0;

  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    if (nums[windowEnd] === 0) {
      zerosInWindow++;
    }

    while (zerosInWindow > 1) {
      if (nums[windowBegin] === 0) {
        zerosInWindow--;
      }
      windowBegin++;
    }

    longestSequence = Math.max(longestSequence, windowEnd - windowBegin + 1);
  }

  return longestSequence;
};
