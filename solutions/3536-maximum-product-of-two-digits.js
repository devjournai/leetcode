/**
 * Maximum Product of Two Digits
 * Intuition: The maximum product of two digits will be formed by the two largest digits present in the number n.
 * Approach: 1. Initialize two variables, `max1` and `max2`, to keep track of the largest and second largest digits found so far, respectively. Initialize both to 0, as digits are non-negative.
 *           2. Iterate through the digits of `n` using a `while` loop that continues as long as `n` is greater than 0. In each iteration:
 *              a. Extract the last digit of `n` using the modulo operator (`digit = n % 10`).
 *              b. Compare the extracted `digit` with `max1` and `max2`.
 *                 i. If `digit` is greater than `max1`, it means we've found a new largest digit. The current `max1` value is assigned to `max2` (becoming the new second largest), and the `digit` itself becomes the new `max1`.
 *                 ii. Else if `digit` is greater than `max2` (meaning `digit` is not greater than `max1` but is greater than the current `max2`), it means we've found a new second largest digit. The `digit` is then assigned to `max2`.
 *              c. Remove the last digit from `n` by performing integer division (`n = Math.floor(n / 10)`) to prepare for the next iteration.
 *           3. Once the loop finishes (when `n` becomes 0), `max1` and `max2` will contain the two largest digits found in the original number. Return their product (`max1 * max2`).
 * Dry Run: n = 124
 *   Initial: max1 = 0, max2 = 0
 *   Iteration 1 (n = 124):
 *     digit = 124 % 10 = 4
 *     4 > max1 (0) is true.
 *       max2 = max1 (0)
 *       max1 = digit (4)
 *     n = Math.floor(124 / 10) = 12
 *   Current state: max1 = 4, max2 = 0, n = 12
 *   Iteration 2 (n = 12):
 *     digit = 12 % 10 = 2
 *     2 > max1 (4) is false.
 *     2 > max2 (0) is true.
 *       max2 = digit (2)
 *     n = Math.floor(12 / 10) = 1
 *   Current state: max1 = 4, max2 = 2, n = 1
 *   Iteration 3 (n = 1):
 *     digit = 1 % 10 = 1
 *     1 > max1 (4) is false.
 *     1 > max2 (2) is false.
 *     n = Math.floor(1 / 10) = 0
 *   Current state: max1 = 4, max2 = 2, n = 0
 *   Loop ends because n is 0.
 *   Return max1 * max2 = 4 * 2 = 8.
 * Time Complexity: O(log10(n))
 * Space Complexity: O(1)
 */
var maxProduct = function (n) {
  let max1 = 0;
  let max2 = 0;

  while (n > 0) {
    let digit = n % 10;
    if (digit > max1) {
      max2 = max1;
      max1 = digit;
    } else if (digit > max2) {
      max2 = digit;
    }
    n = Math.floor(n / 10);
  }

  return max1 * max2;
};
