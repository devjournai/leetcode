/**
 * K-th Smallest Remaining Even Integer in Subarray Queries
 * Intuition: Positive evens are 2,4,6,... Removing subarray evens leaves gaps. Binary search the answer even x so that (x/2 minus evens in the query range that are <= x) equals k.
 * Approach: 1. Collect even values from nums with indices. 2. For each query [l,r,k] binary search even x. 3. Count evens in [l,r] that are <= x via binary search on prefix even list.
 * Dry Run: Input: nums = [1,4,7], queries = [[0,2,1],[1,1,2],[0,0,3]]. Output: [2,6,6].
 * Time Complexity: O((N+Q) log N log A)
 * Space Complexity: O(N)
 */
var kthSmallestEven = function (nums, queries) {
  const evens = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) evens.push([nums[i], i]);
  }
  const countLeq = (l, r, x) => {
    let lo = 0,
      hi = evens.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (evens[mid][0] <= x) lo = mid + 1;
      else hi = mid;
    }
    let cnt = 0;
    for (let i = 0; i < lo; i++) {
      if (evens[i][1] >= l && evens[i][1] <= r) cnt++;
    }
    return cnt;
  };
  const ans = [];
  for (const [l, r, k] of queries) {
    let lo = 1,
      hi = k + r - l + 2,
      res = 2 * (k + r - l + 1);
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const x = 2 * mid;
      if (mid - countLeq(l, r, x) >= k) {
        res = x;
        hi = mid - 1;
      } else lo = mid + 1;
    }
    ans.push(res);
  }
  return ans;
};
