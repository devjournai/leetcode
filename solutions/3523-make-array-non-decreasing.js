/**
 * Make Array Non-decreasing
 * Intuition: Merging a decreasing suffix into the previous peak never beats simply dropping those smaller values, so the longest non-decreasing subsequence of left-to-right maxima is optimal.
 * Approach: 1. Scan left to right tracking the last kept value. 2. Keep a number only if it is at least that previous value, then update previous. 3. Count kept elements.
 * Dry Run: nums = [4, 2, 5, 3, 5]. Keep 4, skip 2, keep 5, skip 3, keep 5 → size 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumPossibleSize = function (nums) {
  let keptCount = 0;
  let previous = 0;

  for (const value of nums) {
    if (value >= previous) {
      previous = value;
      keptCount += 1;
    }
  }

  return keptCount;
};
