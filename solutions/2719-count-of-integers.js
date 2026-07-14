/**
 * Count of Integers
 *
 * Intuition:
 * This is a classic Digit DP problem.
 *
 * Instead of counting directly in the range:
 *
 *      [num1, num2]
 *
 * count:
 *
 *      numbers ≤ num2
 *
 * minus
 *
 *      numbers < num1
 *
 * For every digit position, the DP keeps track of:
 *
 * • current position
 * • current digit sum
 * • whether the current prefix is already smaller
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Create a helper function:
 *
 *      count(limit)
 *
 *      =
 *      number of integers
 *      ≤ limit
 *      whose digit sum is between
 *      minSum and maxSum.
 *
 * 2. Digit DP State:
 *
 *      dfs(position,
 *          currentSum,
 *          tight)
 *
 * where:
 *
 *      position
 *          current digit index
 *
 *      currentSum
 *          sum of chosen digits
 *
 *      tight
 *          true if prefix is equal to limit
 *
 * 3. Base Case:
 *
 *      All digits processed.
 *
 *      Return:
 *
 *          1
 *
 *      if
 *
 *          minSum ≤ currentSum ≤ maxSum
 *
 *      otherwise
 *
 *          0
 *
 * 4. Transition:
 *
 *      Try every digit from
 *
 *          0 ... upperLimit
 *
 *      where
 *
 *          upperLimit =
 *          tight ? limitDigit : 9
 *
 *      Skip states whose digit sum already exceeds maxSum.
 *
 * 5. Memoize all states.
 *
 * 6. Compute:
 *
 *      answer =
 *
 *      count(num2)
 *      -
 *      count(num1-1)
 *
 * 7. Return answer modulo 1e9+7.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * num2 = "12"
 *
 * dfs(0,0,true)
 *
 * Choose:
 *
 * 0
 * 1
 *
 * If choose
 *
 * 1
 *
 * next digit:
 *
 * 0
 * 1
 * 2
 *
 * Valid digit sums are accumulated.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(L × maxSum × 2 × 10)
 * Space Complexity: O(L × maxSum × 2)
 */
var count = function (num1, num2, min_sum, max_sum) {
  const MOD = 1000000007;

  const subtractOne = (str) => {
    const digits = str.split("");

    let i = digits.length - 1;

    while (i >= 0 && digits[i] === "0") {
      digits[i] = "9";
      i--;
    }

    if (i >= 0) {
      digits[i] = String.fromCharCode(digits[i].charCodeAt(0) - 1);
    }

    while (digits.length > 1 && digits[0] === "0") {
      digits.shift();
    }

    return digits.join("");
  };

  const solve = (limit) => {
    const length = limit.length;

    const memo = new Map();

    const dfs = (index, sum, tight) => {
      if (sum > max_sum) {
        return 0;
      }

      if (index === length) {
        return sum >= min_sum && sum <= max_sum ? 1 : 0;
      }

      const key = index + "," + sum + "," + tight;

      if (memo.has(key)) {
        return memo.get(key);
      }

      let answer = 0;

      const upper = tight ? Number(limit[index]) : 9;

      for (let digit = 0; digit <= upper; digit++) {
        answer =
          (answer + dfs(index + 1, sum + digit, tight && digit === upper)) %
          MOD;
      }

      memo.set(key, answer);

      return answer;
    };

    return dfs(0, 0, true);
  };

  const lower = subtractOne(num1);

  let answer = solve(num2) - solve(lower);

  answer %= MOD;

  if (answer < 0) {
    answer += MOD;
  }

  return answer;
};
