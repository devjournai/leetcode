/**
 * Number of Balanced Integers in a Range
 * Intuition: First, if \textit{high} < 11, there are no balanced integers in the range, so we directly return 0. Otherwise, we update \textit{low} to \max(\textit{low}, 11).
 * Approach: Then we design a function \textit{dfs}(\textit{pos}, \textit{diff}, \textit{lim}), which represents processing the \textit{pos}-th digit of the number, where \textit{diff} is the difference between the sum of digits at odd positions and the sum of digits at even positions, and \textit{lim} indicates whether the current digit is constrained by the upper bound. The function returns the number of balanced integers that can be constructed from the current state. The execution logic of the function is as follows: - If \textit{pos} exceeds the length of the number, it means all digits have been processed. If \textit{diff} = 0, the current number is a balanced integer, return 1; otherwise, return 0. - Calculate the upper bound \textit{up} for the current digit. If constrained, it equals the current digit of the number; otherwise, it is 9. - Iterate through all possible digits i for the current position. For each digit i, recursively call \textit{dfs}(\textit{pos} + 1, \textit{diff} + i \times (\text{1 if pos \% 2 == 0 else -1}), \textit{lim} \&\& i == \textit{up}), and accumulate the results. - Return the accumulated result. We first calculate the number of balanced integers \textit{a} in the range [1, \textit{low} - 1], then calculate the number of balanced integers \textit{b} in the range [1, \textit{high}], and finally return \textit{b} - \textit{a}. To avoid redundant calculations, we use memoization to store previously computed states. The time complexity is O(\log^2 M \times D^2), and the space complexity is O(\log^2 M \times D). Here, M is the value of \textit{high}, and D = 10.
 * Dry Run: Input low = 1, high = 100. Output 9.
 * Time Complexity: O(\log^2 M \times D^2)
 * Space Complexity: O(\log^2 M \times D)
 */
var countBalanced = function (low, high) {
  if (high < 11) {
    return 0;
  }
  if (low < 11) {
    low = 11;
  }
  const base = 90;

  let num;
  let f;

  function dfs(pos, diff, lim) {
    if (pos >= num.length) {
      return diff === 0 ? 1 : 0;
    }
    if (!lim && f[pos][diff + base] !== -1) {
      return f[pos][diff + base];
    }
    const up = lim ? num.charCodeAt(pos) - 48 : 9;
    let res = 0;
    for (let i = 0; i <= up; ++i) {
      res += dfs(pos + 1, diff + i * (pos % 2 === 0 ? 1 : -1), lim && i === up);
    }
    if (!lim) {
      f[pos][diff + base] = res;
    }
    return res;
  }

  num = String(low - 1);
  f = Array.from({ length: num.length }, () => Array((base << 1) | 1).fill(-1));
  const a = dfs(0, 0, true);

  num = String(high);
  f = Array.from({ length: num.length }, () => Array((base << 1) | 1).fill(-1));
  const b = dfs(0, 0, true);

  return b - a;
};
