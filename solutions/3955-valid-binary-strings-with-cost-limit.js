/**
 * Valid Binary Strings With Cost Limit
 * Intuition: We want to generate binary strings of length n that satisfy the following conditions:
 * Approach: We want to generate binary strings of length n that satisfy the following conditions: - The sum of the positions i (0-indexed) of each 1 does not exceed k, which can be expressed as: $ sum_{i mid s_i = 1} i le k $
 * Dry Run: Input: n = 3, k = 1. Output: ["000","010","100"].
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(n)
 */
var generateValidStrings = function (n, k) {
  const ans = [];
  const path = [];

  const dfs = (i, tot) => {
    if (i >= n) {
      ans.push(path.join(""));
      return;
    }

    path.push("0");
    dfs(i + 1, tot);
    path.pop();

    if ((path.length === 0 || path[path.length - 1] === "0") && tot + i <= k) {
      path.push("1");
      dfs(i + 1, tot + i);
      path.pop();
    }
  };

  dfs(0, 0);

  return ans;
};
