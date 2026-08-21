/**
 * Count Fancy Numbers in a Range
 * Intuition: We first define a function $\text{check}(s)$ to determine whether an integer $s$ is a good number. For $s < 100$, we only need to check whether $s$ is a multiple of 11; if so, $s$ is not a good number. For $s \geq 100$, we need to check whether the digits of $s$ form a strictly monotonic sequence, i.e., strictly increasing or strictly decreasing. Since the range of digit sums is small, when the digit sum exceeds $100$, we only need to check the relationship between the tens digit and the units digit of the digit sum. Next, we use digit DP to count the number of fancy numbers in the interval $[l, r]$. We define a recursive function $\text{dfs}(pos, s, prev, st, lim)$, where: - Integer $pos$ represents the current digit position being processed, from high to low. - Integer $s$ represents the current digit sum. - Integer $prev$ represents the value of the previous digit. - Integer $st$ repr...
 * Approach: We first define a function $\text{check}(s)$ to determine whether an integer $s$ is a good number. For $s < 100$, we only need to check whether $s$ is a multiple of 11; if so, $s$ is not a good number. For $s \geq 100$, we need to check whether the digits of $s$ form a strictly monotonic sequence, i.e., strictly increasing or strictly decreasing. Since the range of digit sums is small, when the digit sum exceeds $100$, we only need to check the relationship between the tens digit and the units digit of the digit sum. Next, we use digit DP to count the number of fancy numbers in the interval $[l, r]$. We define a recursive function $\text{dfs}(pos, s, prev, st, lim)$, where: - Integer $pos$ represents the current digit position being processed, from high to low. - Integer $s$ represents the current digit sum. - Integer $prev$ represents the value of the previous digit. - Integer $st$ repr...
 * Dry Run: Input: l = 8, r = 10 => Output: 3
 * Time Complexity: O(O(D^3 * log^2 r))
 * Space Complexity: O(O(D^2 * log^2 r))
 */
var countFancy = function (l, r) {
  const check = (s) => {
    if (s < 100) {
      return s % 11 !== 0;
    }
    const mid = Math.floor(s / 10) % 10;
    const last = s % 10;
    return mid > 1 && mid < last;
  };

  let num;
  let n;
  let f;

  const dfs = (pos, s, prev, st, lim) => {
    if (pos >= n) {
      if (st !== 3) return 1;
      return check(s) ? 1 : 0;
    }

    if (!lim && f[pos][s][prev][st] !== -1) {
      return f[pos][s][prev][st];
    }

    const up = lim ? Number(num[pos]) : 9;
    let res = 0;

    for (let i = 0; i <= up; i++) {
      let nxtSt = st;

      if (st === 0) {
        if (prev === 0) nxtSt = 0;
        else if (i > prev) nxtSt = 1;
        else if (i < prev) nxtSt = 2;
        else nxtSt = 3;
      } else if (st === 1) {
        if (i > prev) nxtSt = 1;
        else nxtSt = 3;
      } else if (st === 2) {
        if (i < prev) nxtSt = 2;
        else nxtSt = 3;
      } else {
        nxtSt = 3;
      }

      res += dfs(pos + 1, s + i, i, nxtSt, lim && i === up);
    }

    if (!lim) {
      f[pos][s][prev][st] = res;
    }

    return res;
  };

  const calc = (x) => {
    num = x.toString();
    n = num.length;

    f = Array.from({ length }, () =>
      Array.from({ length: 9 * n + 1 }, () =>
        Array.from({ length: 10 }, () => Array(4).fill(-1))
      )
    );

    return dfs(0, 0, 0, 0, true);
  };

  return calc(r) - calc(l - 1);
};
