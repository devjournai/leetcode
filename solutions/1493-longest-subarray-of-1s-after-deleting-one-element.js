/**
 * Longest Subarray Of 1s After Deleting One Element
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
