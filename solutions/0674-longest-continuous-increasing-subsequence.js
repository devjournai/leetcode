/**
 * Longest Continuous Increasing Subsequence
 * Intuition: A contiguous strictly increasing run resets whenever an element is not larger than its predecessor; the answer is the longest such run.
 * Approach: 1. Empty array → 0. 2. Start `overallMaximum` and `currentSpanLength` at 1. 3. From index 1, grow `currentSpanLength` if nums[i]>nums[i-1], else reset to 1. 4. Update `overallMaximum`.
 * Dry Run: nums=[1,3,5,4,7]. spans 1→2→3, reset at 4 to 1, then 4,7 → 2. overallMaximum=3.
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
