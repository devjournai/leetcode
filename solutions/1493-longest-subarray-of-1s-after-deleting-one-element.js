/**
 * Longest Subarray Of 1s After Deleting One Element
 * Intuition: Sliding window that holds at most one 0 (the deletion). Window length minus 1 is the count of 1s after that deletion.
 * Approach: 1. Expand windowEnd, counting zeros. 2. While zeros > 1, advance windowStart and decrement if a 0 left. 3. Track max of (windowEnd - windowStart). 4. That value already excludes one element.
 * Dry Run: nums = [1,1,0,1]
 *   - window can cover the whole array with one zero
 *   - length-1 = 3
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var longestSubarray = function (nums) {
  let windowStart = 0;
  let zerosEncountered = 0;
  let longestStreak = 0;

  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    if (nums[windowEnd] === 0) {
      zerosEncountered++;
    }

    while (zerosEncountered > 1) {
      if (nums[windowStart] === 0) {
        zerosEncountered--;
      }
      windowStart++;
    }

    longestStreak = Math.max(longestStreak, windowEnd - windowStart);
  }

  return longestStreak;
};
