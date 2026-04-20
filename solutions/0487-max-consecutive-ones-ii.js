/**
 * Max Consecutive Ones II
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
