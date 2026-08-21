/**
 * Minimum Increase to Maximize Special Indices
 * Intuition: We observe that if the array length is odd, then increasing all elements at odd indices so that each is $1$ greater than both adjacent elements yields the maximum possible number of special indices. If the array length is even, then among indices in the range $[1, n - 2]$, we skip exactly one index, and for the remaining indices, increase every other element so that each is $1$ greater than both adjacent elements; this also yields the maximum possible number of special indices. Therefore, we design a function $\text{dfs}(i, j)$, which represents the minimum number of operations needed to obtain the maximum number of special indices starting from index $i$, with $j$ remaining skips. For each index $i$, we can either increase it so that it is $1$ greater than both neighbors, or skip it. We use memoized search to avoid repeated computation. The implementation of $\text{dfs}(i, j)$ is as fol...
 * Approach: We observe that if the array length is odd, then increasing all elements at odd indices so that each is $1$ greater than both adjacent elements yields the maximum possible number of special indices. If the array length is even, then among indices in the range $[1, n - 2]$, we skip exactly one index, and for the remaining indices, increase every other element so that each is $1$ greater than both adjacent elements; this also yields the maximum possible number of special indices. Therefore, we design a function $\text{dfs}(i, j)$, which represents the minimum number of operations needed to obtain the maximum number of special indices starting from index $i$, with $j$ remaining skips. For each index $i$, we can either increase it so that it is $1$ greater than both neighbors, or skip it. We use memoized search to avoid repeated computation. The implementation of $\text{dfs}(i, j)$ is as fol...
 * Dry Run: Input: nums = [1,2,2] => Output: 1
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var minIncrease = function (nums) {
  const n = nums.length;

  const f = Array.from({ length }, () => Array(2).fill(-1));

  const dfs = (i, j) => {
    if (i >= n - 1) {
      return 0;
    }
    if (f[i][j] !== -1) {
      return f[i][j];
    }

    const cost = Math.max(0, Math.max(nums[i - 1], nums[i + 1]) + 1 - nums[i]);
    let ans = cost + dfs(i + 2, j);

    if (j > 0) {
      ans = Math.min(ans, dfs(i + 1, 0));
    }

    f[i][j] = ans;
    return ans;
  };

  return dfs(1, (n & 1) ^ 1);
};
