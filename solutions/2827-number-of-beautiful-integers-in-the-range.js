/**
 * Number of Beautiful Integers in the Range
 *
 * Intuition:
 * A beautiful integer must satisfy two conditions:
 *
 * 1. The number of even digits equals the number of odd digits.
 * 2. The number is divisible by k.
 *
 * Since high <= 10^9, we cannot enumerate every number in the range.
 * This is a classic Digit DP problem.
 *
 * Let:
 *
 *      count(num)
 *
 * denote the number of beautiful integers in [1, num].
 *
 * Then the required answer is:
 *
 *      count(high) - count(low - 1)
 *
 * -----------------------------------------------------------------------
 *
 * Digit DP State:
 *
 * While constructing the number digit by digit, we keep:
 *
 *      pos
 *          Current digit position.
 *
 *      balance
 *          (#even digits) - (#odd digits).
 *
 *      mod
 *          Current number modulo k.
 *
 *      tight
 *          Whether the current prefix equals the prefix of num.
 *
 *      started
 *          Whether a non-leading-zero digit has been chosen.
 *
 * At the end:
 *
 *      balance == 0
 *      mod == 0
 *      started == true
 *
 * means the constructed number is beautiful.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Implement Digit DP:
 *
 *      dfs(pos, balance, mod, tight, started)
 *
 * 2. For every possible next digit:
 *
 *      • Update tight.
 *      • Ignore leading zeros until the number starts.
 *      • Once started:
 *
 *            even digit:
 *                balance + 1
 *
 *            odd digit:
 *                balance - 1
 *
 *      • Update:
 *
 *            newMod =
 *            (mod * 10 + digit) % k
 *
 * 3. Memoize all states where tight == false.
 *
 * 4. Compute:
 *
 *      answer =
 *      solve(high) - solve(low - 1)
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * low = 10
 * high = 20
 * k = 3
 *
 * Beautiful numbers:
 *
 *      12
 *      18
 *
 * solve(20) = 2
 * solve(9)  = 0
 *
 * Answer:
 *
 *      2
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(D² × K × 10)
 * Space Complexity: O(D² × K)
 */

var numberOfBeautifulIntegers = function (low, high, k) {
  const solve = (limit) => {
    if (limit <= 0) {
      return 0;
    }

    const s = String(limit);
    const n = s.length;

    const memo = new Map();

    const dfs = (pos, balance, mod, tight, started) => {
      if (pos === n) {
        return started && balance === 0 && mod === 0 ? 1 : 0;
      }

      const key = `${pos},${balance},${mod},${started}`;

      if (!tight && memo.has(key)) {
        return memo.get(key);
      }

      const limitDigit = tight ? Number(s[pos]) : 9;

      let ans = 0;

      for (let digit = 0; digit <= limitDigit; digit++) {
        const nextTight = tight && digit === limitDigit;

        if (!started && digit === 0) {
          ans += dfs(pos + 1, balance, mod, nextTight, false);

          continue;
        }

        const nextBalance = balance + (digit % 2 === 0 ? 1 : -1);

        const nextMod = (mod * 10 + digit) % k;

        ans += dfs(pos + 1, nextBalance, nextMod, nextTight, true);
      }

      if (!tight) {
        memo.set(key, ans);
      }

      return ans;
    };

    return dfs(0, 0, 0, true, false);
  };

  return solve(high) - solve(low - 1);
};
