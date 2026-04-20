/**
 * Longest Continuous Increasing Subsequence
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findLengthOfLCIS = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let overallMaximum = 1;
  let currentSpanLength = 1;

  for (
    let elementTraverser = 1;
    elementTraverser < nums.length;
    elementTraverser++
  ) {
    if (nums[elementTraverser] > nums[elementTraverser - 1]) {
      currentSpanLength++;
    } else {
      currentSpanLength = 1;
    }
    if (currentSpanLength > overallMaximum) {
      overallMaximum = currentSpanLength;
    }
  }

  return overallMaximum;
};
