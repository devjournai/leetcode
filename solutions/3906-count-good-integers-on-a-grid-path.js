/**
 * Count Good Integers on a Grid Path
 * Intuition: Since the 6 characters in directions determine the path, we can preprocess a boolean array key of length 16, where key[i] indicates whether the i-th cell visited along the path is a key cell (i.e., a cell visited on the path). We can compute the key array based on directions.
 * Approach: Since the 6 characters in directions determine the path, we can preprocess a boolean array key of length 16, where key[i] indicates whether the i-th cell visited along the path is a key cell (i.e., a cell visited on the path). We can compute the key array based on directions. Next, we use digit dynamic programming (digit DP) to count the number of integers in the range [l, r] that satisfy the condition. We convert r and l - 1 to 16-digit strings s, then use a recursive function to count the number of valid integers in [0, r], and subtract the count in [0, l - 1] to get the answer for [l, r]. We define a recursive function dfs(pos, last, lim), where pos is the current digit position, last is the digit of the previous key cell, and lim indicates whether the current digit is restricted by s (i.e., whether the current prefix matches s so far).
 * Dry Run: Input: l = 8, r = 10, directions = "DDDRRR". Output: 2.
 * Time Complexity: O(D^2 * logr)
 * Space Complexity: O(D * logr)
 */
var countGoodIntegersOnPath = function (l, r, directions) {
  const key = new Array(16).fill(false);
  let row = 0,
    col = 0;
  key[0] = true;
  for (const c of directions) {
    if (c === "D") {
      row++;
    } else {
      col++;
    }
    key[row * 4 + col] = true;
  }

  let s;
  let f;

  const dfs = (pos, last, lim) => {
    if (pos === 16) {
      return 1;
    }
    if (!lim && f[pos][last] !== -1) {
      return f[pos][last];
    }

    let res = 0;
    const start = key[pos] ? last : 0;
    const end = lim ? parseInt(s[pos]) : 9;

    for (let i = start; i <= end; i++) {
      res += dfs(pos + 1, key[pos] ? i : last, lim && i === end);
    }

    if (!lim) {
      f[pos][last] = res;
    }
    return res;
  };

  const calc = (x) => {
    if (x < 0) {
      return 0;
    }
    s = x.toString().padStart(16, "0");
    f = Array.from({ length: 16 }, () => {
      return new Array(10).fill(-1);
    });
    return dfs(0, 0, true);
  };

  return calc(r) - calc(l - 1);
};
