/**
 * Count Stepping Numbers in Range
 *
 * Intuition:
 * The values of low and high can contain up to 100 digits, so they cannot
 * be converted to normal JavaScript numbers.
 *
 * This is a classic Digit DP problem.
 *
 * We define:
 *
 *      count(num)
 *
 * as the number of stepping numbers in:
 *
 *      [1, num]
 *
 * Then the required answer is:
 *
 *      count(high) - count(low) + isStepping(low)
 *
 * because count(low) already includes low, so adding isStepping(low)
 * effectively gives:
 *
 *      count(high) - count(low - 1)
 *
 * -----------------------------------------------------------------------
 *
 * Digit DP State:
 *
 * While constructing a number digit by digit, we need:
 *
 *      pos
 *          Current digit position.
 *
 *      prev
 *          Previous digit.
 *
 *      tight
 *          Whether the current prefix is equal to num's prefix.
 *
 *      started
 *          Whether we have placed a non-leading-zero digit.
 *
 * A new digit is valid when:
 *
 *      started === false
 *
 * or:
 *
 *      abs(digit - prev) === 1
 *
 * Leading zeros are ignored until the actual number starts.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Implement count(num) using Digit DP.
 *
 * 2. At every position:
 *
 *      • Determine the largest allowed digit using tight.
 *
 *      • If the number has not started and digit = 0,
 *        continue without setting a previous digit.
 *
 *      • Otherwise:
 *
 *            - If this is the first real digit, accept it.
 *            - If a previous digit exists, require:
 *
 *                  |digit - prev| = 1
 *
 * 3. When all positions are processed:
 *
 *      return 1 if a number was started,
 *      otherwise return 0.
 *
 * 4. Compute:
 *
 *      highCount = count(high)
 *      lowCount  = count(low)
 *
 * 5. Check whether low itself is a stepping number.
 *
 * 6. Return:
 *
 *      highCount - lowCount + isStepping(low)
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * low = "1"
 * high = "11"
 *
 * Stepping numbers <= 11:
 *
 *      1,2,3,4,5,6,7,8,9,10
 *
 * count("11") = 10
 *
 * count("1") = 1
 *
 * "1" itself is stepping.
 *
 * Answer:
 *
 *      10 - 1 + 1
 *      = 10
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var countSteppingNumbers = function (low, high) {
  const MOD = 1000000007;

  const count = (num) => {
    const n = num.length;

    const memo = new Map();

    const dfs = (pos, prev, tight, started) => {
      if (pos === n) {
        return started ? 1 : 0;
      }

      const key = `${pos},${prev},${tight},${started}`;

      if (!tight && memo.has(key)) {
        return memo.get(key);
      }

      const limit = tight ? Number(num[pos]) : 9;

      let ways = 0;

      for (let digit = 0; digit <= limit; digit++) {
        const newTight = tight && digit === limit;

        if (!started && digit === 0) {
          ways += dfs(pos + 1, -1, newTight, false);

          ways %= MOD;

          continue;
        }

        if (!started) {
          ways += dfs(pos + 1, digit, newTight, true);

          ways %= MOD;

          continue;
        }

        if (Math.abs(digit - prev) === 1) {
          ways += dfs(pos + 1, digit, newTight, true);

          ways %= MOD;
        }
      }

      if (!tight) {
        memo.set(key, ways);
      }

      return ways;
    };

    return dfs(0, -1, true, false);
  };

  const isStepping = (num) => {
    for (let i = 1; i < num.length; i++) {
      if (Math.abs(Number(num[i]) - Number(num[i - 1])) !== 1) {
        return 0;
      }
    }

    return 1;
  };

  const highCount = count(high);
  const lowCount = count(low);

  return (highCount - lowCount + isStepping(low) + MOD) % MOD;
};
