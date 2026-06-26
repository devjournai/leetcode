/**
 * Minimum Addition to Make Integer Beautiful
 * Intuition: A number is beautiful if the sum of its digits is less than or equal to the given target.
 * If the current digit sum is greater than the target, we should make the
 * number "rounder" by turning the least significant non-zero digits into
 * zeros. Every time we round up at a digit position, the digit sum usually
 * decreases because several digits become 0 and only one carry is generated.
 * We repeatedly round the number to the next multiple of 10, 100, 1000...
 * until its digit sum becomes less than or equal to the target.
 * Approach:
 * 1. Compute the digit sum of n.
 * 2. If digit sum <= target, return 0.
 * 3. Maintain: - current = current rounded number - base = 10, 100, 1000...
 * 4. At every step:
 *      - Round current up to the next multiple of base.
 *      - Check its digit sum.
 *      - If beautiful, return current - original n.
 *      - Otherwise multiply base by 10 and continue.
 * Dry Run: n = 467 target = 6
 * Original digit sum: 4 + 6 + 7 = 17 -> 17 > 6
 * base = 10
 * current = 467
 * Round to next multiple of 10
 * current = 470
 * digit sum:
 * 4 + 7 + 0 = 11
 * Still greater than 6.
 *
 * --------------------------
 *
 * base = 100
 * Round: 470 -> 500
 * digit sum: 5 + 0 + 0 = 5
 * Beautiful.
 * Answer: 500 - 467 = 33
 * --------------------------------------------------
 *
 * Example: n = 16
 * target = 6
 * digit sum: 1 + 6 = 7
 * Round to next multiple of 10
 * 16 -> 20
 * digit sum: 2
 * Answer: 20 - 16 = 4
 * --------------------------------------------------
 *
 * Why does this Greedy work?
 *
 * We always modify the lowest digit possible.
 *
 * Making lower digits zero requires the smallest addition.
 *
 * If that is not enough, we move to the next higher digit.
 *
 * Therefore every step produces the minimum possible increment,
 * guaranteeing the overall minimum addition.
 *
 * --------------------------------------------------
 *
 * Time Complexity: O(D²)
 * Space Complexity: O(1)
 */

var makeIntegerBeautiful = function (n, target) {
  const digitSum = (num) => {
    let sum = 0;

    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }

    return sum;
  };

  if (digitSum(n) <= target) {
    return 0;
  }

  let current = n;
  let base = 10;

  while (digitSum(current) > target) {
    current = Math.ceil(current / base) * base;
    base *= 10;
  }

  return current - n;
};
