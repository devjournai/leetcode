/**
 * Minimum Threshold for Inversion Pairs Count
 * Intuition: Binary search the smallest threshold T such that the number of pairs i<j with 0 < nums[i]-nums[j] ≤ T is at least k.
 * Approach: 1. Binary search T in [0, max(nums)]. 2. For a candidate, scan left-to-right inserting into a sorted list and count values in (num, num+T]. 3. Return the minimum T or -1.
 * Dry Run: nums = [1, 3, 2], k = 1. Pair (3,2) has diff 1, so answer 1.
 * Time Complexity: O(N^2 log max(nums))
 * Space Complexity: O(N)
 */
var minThreshold = function (nums, k) {
  const firstGreater = (arr, target) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] > target) right = mid;
      else left = mid + 1;
    }
    return left;
  };

  const countInversionPairs = (threshold) => {
    let inversionCount = 0;
    const sortedNums = [];
    for (const num of nums) {
      const lower = firstGreater(sortedNums, num);
      const upper = firstGreater(sortedNums, num + threshold);
      inversionCount += upper - lower;
      sortedNums.splice(lower, 0, num);
    }
    return inversionCount >= k;
  };

  let maxValue = 0;
  for (const num of nums) maxValue = Math.max(maxValue, num);
  let left = 0;
  let right = maxValue + 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (countInversionPairs(mid)) right = mid;
    else left = mid + 1;
  }
  return left > maxValue ? -1 : left;
};
