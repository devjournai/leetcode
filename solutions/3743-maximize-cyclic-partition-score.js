/**
 * Maximize Cyclic Partition Score
 * Intuition: Each part's range is max-min. Splitting at most k times on a cycle is the same as cutting the array at a global minimum (so no part wraps over that min) and then taking at most k range-contributions on the linearized array, like a k-transaction stock DP.
 * Approach: 1. Find an index i of a minimum value. 2. Linearize starting at i and at i+1 (the two ways to break the cycle at that min). 3. DP over at most k segments: maintain best previous dp[j]-val and dp[j]+val to extend a new range ending at the current index.
 * Dry Run: nums = [1,2,3,3], k = 2. Min is at index 0. Best split [2,3] and [3,1] scores 1+2 = 3.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N)
 */
var maximumScore = function (nums, k) {
  const n = nums.length;
  const best = (base) => {
    let dp = Array(n + 1).fill(0);
    let result = 0;
    for (let t = 0; t < k; t++) {
      let x = -Infinity;
      let y = -Infinity;
      const newDp = Array(n + 1).fill(-Infinity);
      for (let j = t; j < n; j++) {
        const val = nums[(base + j) % n];
        x = Math.max(x, dp[j] - val);
        y = Math.max(y, dp[j] + val);
        newDp[j + 1] = Math.max(newDp[j], x + val, y - val);
      }
      dp = newDp;
      result = Math.max(result, dp[n]);
    }
    return result;
  };

  let i = 0;
  for (let j = 1; j < n; j++) {
    if (nums[j] < nums[i]) {
      i = j;
    }
  }
  return Math.max(best(i), best(i + 1));
};
