/**
 * Count Stable Subarrays
 * Intuition: According to the problem description, a stable subarray is defined as a subarray without inversion pairs, meaning the elements in the subarray are arranged in non-decreasing order. Therefore, we can divide the array into several non-decreasing segments, using an array \text{seg} to record the starting position of each segment. At the same time, we need a prefix sum array \text{s} to record the number of stable subarrays within each segment.
 * Approach: Then, for each query [l, r], there may be 3 cases: 1. The query interval [l, r] is completely contained within a single segment. In this case, the number of stable subarrays can be directly calculated using the formula \frac{(k + 1) \cdot k}{2}, where k = r - l + 1. 2. The query interval [l, r] spans multiple segments. In this case, we need to separately calculate the number of stable subarrays in the left incomplete segment, the right incomplete segment, and the complete segments in the middle, then add them together to get the final result. The time complexity is O((n + q) \log n), where n is the length of the array and q is the number of queries. The space complexity is O(n).
 * Dry Run: Input nums = [3,1,2], queries = [[0,1],[1,2],[0,2]]. Output [2,3,4].
 * Time Complexity: O((n + q) log n)
 * Space Complexity: O(n)
 */
var countStableSubarrays = function (nums, queries) {
  const n = nums.length;
  const seg = [];
  const s = [0];

  let l = 0;
  for (let r = 0; r < n; r++) {
    if (r === n - 1 || nums[r] > nums[r + 1]) {
      seg.push(l);
      const k = r - l + 1;
      s.push(s[s.length - 1] + (k * (k + 1)) / 2);
      l = r + 1;
    }
  }

  const ans = [];
  for (const [left, right] of queries) {
    const i = _.sortedIndex(seg, left + 1);
    const j = _.sortedIndex(seg, right + 1) - 1;

    if (i > j) {
      const k = right - left + 1;
      ans.push((k * (k + 1)) / 2);
    } else {
      const a = seg[i] - left;
      const b = right - seg[j] + 1;
      ans.push((a * (a + 1)) / 2 + s[j] - s[i] + (b * (b + 1)) / 2);
    }
  }

  return ans;
};
