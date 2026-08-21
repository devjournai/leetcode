/**
 * Find the Maximum Sequence Value of Array
 * Intuition: The value of a 2k-length subsequence is (OR of the first k picked values) XOR (OR of the last k). The split is a cut in the original array: first k come from a prefix, last k from the remaining suffix. Values are at most 127, so all OR results fit in 0..128 and can be tracked with boolean DP.
 * Approach:
 * 1. `getPossibleORs(arr, k)` builds `dp[i][j][x]`: whether OR value `x` is reachable by choosing `j` elements from `arr[0..i]`.
 * 2. Transition: skip `arr[i]` (`dp[i-1][j][x]`) or take it (`dp[i-1][j-1][x]` -> OR with `arr[i]`).
 * 3. Compute `left` on `nums` and `right` on reversed `nums`, then reverse `right` so `right[i]` describes suffix `nums[i..]`.
 * 4. For every cut `i` with at least k elements on each side, try all OR pairs `(a, b)` and take max `a ^ b`.
 * Dry Run: nums = [2, 6, 7], k = 1
 *   - Cuts: i=0 (left nums[0], right nums[1..2]) and i=1 (left nums[0..1], right nums[2]).
 *   - Possible: 2^6=4, 2^7=5, 6^7=1. Maximum is 5.
 * Time Complexity: O(n * k * 128 + n * 128 * 128)
 * Space Complexity: O(n * k * 128)
 */
var maxValue = function (nums, k) {
  const MAX_XOR = 128;

  const getPossibleORs = (arr) => {
    const dp = Array.from({ length: arr.length }, () =>
      Array.from({ length: k + 1 }, () => Array(MAX_XOR + 1).fill(false))
    );

    dp[0][1][arr[0]] = true;
    for (let i = 0; i < arr.length; i++) dp[i][0][0] = true;

    for (let i = 1; i < arr.length; i++) {
      for (let j = 1; j <= k; j++) {
        for (let x = 0; x <= MAX_XOR; x++) {
          if (dp[i - 1][j][x]) dp[i][j][x] = true;
          if (dp[i - 1][j - 1][x]) dp[i][j][arr[i] | x] = true;
        }
      }
    }

    return dp;
  };

  const left = getPossibleORs(nums);
  const reversed = nums.slice().reverse();
  const right = getPossibleORs(reversed);
  right.reverse();

  let ans = 0;

  for (let i = k - 1; i + k < nums.length; i++) {
    for (let a = 0; a <= MAX_XOR; a++) {
      for (let b = 0; b <= MAX_XOR; b++) {
        if (left[i][k][a] && right[i + 1][k][b]) {
          ans = Math.max(ans, a ^ b);
        }
      }
    }
  }

  return ans;
};
