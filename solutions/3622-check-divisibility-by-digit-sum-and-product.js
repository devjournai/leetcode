/**
 * Check Divisibility by Digit Sum and Product
 * Intuition: n is divisible by (sum of digits + product of digits).
 * Approach: 1. Peel digits, accumulating sum and product. 2. Return n % (sum + product) === 0.
 * Dry Run: n = 99 → sum 18, product 81, 18+81=99, 99%99=0 true.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var checkDivisibility = function (n) {
  let digitSum = 0;
  let digitProduct = 1;
  let remaining = n;

  while (remaining !== 0) {
    const digit = remaining % 10;
    remaining = Math.floor(remaining / 10);
    digitSum += digit;
    digitProduct *= digit;
  }

  return n % (digitSum + digitProduct) === 0;
};
