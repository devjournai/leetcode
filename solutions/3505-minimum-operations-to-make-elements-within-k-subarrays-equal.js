/**
 * Minimum Operations to Make Elements Within K Subarrays Equal
 * Intuition: Making a window of length x equal costs the L1 distance to its median. Then pick k non-overlapping such windows with DP (take or skip each start).
 * Approach: 1. Slide a window of size x, maintain two balanced halves around the median, record ops to equalize. 2. DP[i][k]: min ops from index i with k windows left — skip i or take window i and jump i+x. 3. Return DP from 0 with k windows.
 * Dry Run: nums = [2, 9, 2], x = 3, k = 1. One window median 2, ops |9-2|=7.
 * Time Complexity: O(N * K + N * X)
 * Space Complexity: O(N * K)
 */
var minOperations = function (nums, x, k) {
  const INF = Number.MAX_SAFE_INTEGER / 2;

  const insertSorted = (arr, value) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < value) left = mid + 1;
      else right = mid;
    }
    arr.splice(left, 0, value);
  };

  const eraseSorted = (arr, value) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < value) left = mid + 1;
      else right = mid;
    }
    arr.splice(left, 1);
  };

  const getMinOps = () => {
    const minOps = [];
    const lower = [];
    const upper = [];
    let lowerSum = 0;
    let upperSum = 0;

    for (let i = 0; i < nums.length; i++) {
      if (!lower.length || nums[i] <= lower[lower.length - 1]) {
        insertSorted(lower, nums[i]);
        lowerSum += nums[i];
      } else {
        insertSorted(upper, nums[i]);
        upperSum += nums[i];
      }

      if (i >= x) {
        const outNum = nums[i - x];
        if (lower.includes(outNum)) {
          eraseSorted(lower, outNum);
          lowerSum -= outNum;
        } else {
          eraseSorted(upper, outNum);
          upperSum -= outNum;
        }
      }

      if (lower.length < upper.length) {
        const val = upper.shift();
        insertSorted(lower, val);
        upperSum -= val;
        lowerSum += val;
      } else if (lower.length - upper.length > 1) {
        const val = lower.pop();
        insertSorted(upper, val);
        lowerSum -= val;
        upperSum += val;
      }

      if (i >= x - 1) {
        const median = lower[lower.length - 1];
        const ops =
          median * lower.length - lowerSum + (upperSum - median * upper.length);
        minOps.push(ops);
      }
    }

    return minOps;
  };

  const minOps = getMinOps();
  const memo = Array.from({ length: nums.length + 1 }, () =>
    new Array(k + 1).fill(-1)
  );

  const dfs = (i, remaining) => {
    if (remaining === 0) return 0;
    if (i === nums.length) return INF;
    if (memo[i][remaining] !== -1) return memo[i][remaining];
    const skip = dfs(i + 1, remaining);
    const pick =
      i + x <= nums.length ? minOps[i] + dfs(i + x, remaining - 1) : INF;
    memo[i][remaining] = Math.min(skip, pick);
    return memo[i][remaining];
  };

  return dfs(0, k);
};
