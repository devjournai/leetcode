/**
 * Find the Minimum Possible Sum of a Beautiful Array
 *
 * Intuition:
 * We want the minimum possible sum while ensuring:
 *
 *      • All numbers are distinct.
 *      • No two numbers sum to target.
 *
 * To minimize the sum, we always try to pick the smallest available
 * positive integers.
 *
 * Observe that for every number:
 *
 *      x
 *
 * its forbidden partner is:
 *
 *      target - x
 *
 * Therefore, from each conflicting pair we can choose at most one number.
 *
 * The smallest safe numbers are:
 *
 *      1, 2, ..., floor(target / 2)
 *
 * because every one of them conflicts only with a larger number.
 *
 * Let:
 *
 *      limit = floor(target / 2)
 *
 * If n <= limit, we simply take:
 *
 *      1, 2, ..., n
 *
 * Otherwise:
 *
 * • First take:
 *
 *      1 ... limit
 *
 * • Then continue from:
 *
 *      target, target + 1, ...
 *
 * because every number in this range has its complementary value
 * less than or equal to 0 or already skipped, so no forbidden pair
 * can be formed.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * Case 1:
 *
 *      n <= target / 2
 *
 *      Answer =
 *
 *          1 + 2 + ... + n
 *
 * Case 2:
 *
 *      Take:
 *
 *          1 ... limit
 *
 *      Remaining numbers:
 *
 *          remain = n - limit
 *
 *      Take:
 *
 *          target
 *          target + 1
 *          ...
 *          target + remain - 1
 *
 *      Compute both arithmetic-series sums.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 3
 * target = 3
 *
 * limit = 1
 *
 * First part:
 *
 *      [1]
 *
 * Remaining:
 *
 *      2 numbers
 *
 * Take:
 *
 *      [3,4]
 *
 * Total:
 *
 *      1 + 3 + 4 = 8
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

var minimumPossibleSum = function (n, target) {
  const MOD = 1000000007n;

  const limit = Math.floor(target / 2);

  const sum = (first, last, count) => {
    return (BigInt(first + last) * BigInt(count)) / 2n;
  };

  let ans;

  if (n <= limit) {
    ans = sum(1, n, n);
  } else {
    const firstPart = sum(1, limit, limit);

    const remain = n - limit;

    const secondPart = sum(target, target + remain - 1, remain);

    ans = firstPart + secondPart;
  }

  return Number(ans % MOD);
};
