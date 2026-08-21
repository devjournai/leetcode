/**
 * Count Distinct Integers After Removing Zeros
 * Intuition: The problem essentially asks us to count the number of integers in the range [1, n] that do not contain the digit 0. We can solve this problem using digit DP.
 * Approach: We design a function \text{dfs}(i, \text{zero}, \text{lead}, \text{limit}), which represents the number of valid solutions when we are currently processing the i-th digit of the number. We use \text{zero} to indicate whether a non-zero digit has appeared in the current number, \text{lead} to indicate whether we are still processing leading zeros, and \text{limit} to indicate whether the current number is constrained by the upper bound. The answer is \text{dfs}(0, 0, 1, 1). In the function \text{dfs}(i, \text{zero}, \text{lead}, \text{limit}), if i is greater than or equal to the length of the number, we can check \text{zero} and \text{lead}. If \text{zero} is false and \text{lead} is false, it means the current number does not contain 0, so we return 1; otherwise, we return 0. For \text{dfs}(i, \text{zero}, \text{lead}, \text{limit}), we can enumerate the value of the current digit d, then recursively calculate \text{dfs}(i+1, \text{nxt\_zero}, \text{nxt\_lead}, \text{nxt\_limit}), where \text{nxt\_zero} indicates whether a non-zero digit has appeared in the current number, \text{nxt\_lead} indicates whether we are still processing leading zeros, and \text{nxt\_limit} indicates whether the current number is constrained by the upper bound. If \text{limit} is true, then up is the upper bound of the current digit; otherwise, up is 9. The time complexity is O(\log_{10} n \times D) and the space complexity is O(\log_{10} n), where D represents the count of digits from 0 to 9.
 * Dry Run: Input n = 10. Output 9.
 * Time Complexity: O(\log_{10} n \times D)
 * Space Complexity: O(\log_{10} n)
 */
var countDistinct = function (n) {
  const s = n.toString();
  const m = s.length;

  const f = Array.from({ length: m }, () =>
    Array.from({ length: 2 }, () =>
      Array.from({ length: 2 }, () => Array(2).fill(-1))
    )
  );

  const dfs = (i, zero, lead, limit) => {
    if (i === m) {
      return zero === 0 && lead === 0 ? 1 : 0;
    }

    if (limit === 0 && f[i][zero][lead][limit] !== -1) {
      return f[i][zero][lead][limit];
    }

    const up = limit === 1 ? parseInt(s[i]) : 9;
    let ans = 0;
    for (let d = 0; d <= up; d++) {
      const nxtZero = zero === 1 || (d === 0 && lead === 0) ? 1 : 0;
      const nxtLead = lead === 1 && d === 0 ? 1 : 0;
      const nxtLimit = limit === 1 && d === up ? 1 : 0;
      ans += dfs(i + 1, nxtZero, nxtLead, nxtLimit);
    }

    if (limit === 0) {
      f[i][zero][lead][limit] = ans;
    }
    return ans;
  };

  return dfs(0, 0, 1, 1);
};
