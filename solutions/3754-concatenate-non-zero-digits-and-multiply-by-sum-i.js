/**
 * Concatenate Non-Zero Digits and Multiply by Sum I
 * Intuition: The problem requires forming a new integer 'x' by collecting non-zero digits from 'n' in order, then calculating the sum of digits of 'x', and finally returning their product. The key is accurately extracting digits and handling edge cases like 'n' containing only zeros or being zero itself.
 * Approach: 1. Convert the input integer `n` into its string representation (`nStr`). This allows easy iteration through its digits while preserving their original order.
 *           2. Initialize an empty string `xStr`. Iterate through each character in `nStr`. If a character represents a non-zero digit, append it to `xStr`.
 *           3. Convert `xStr` to a number to get the value of `x`. The `Number()` constructor handles the case where `xStr` might be an empty string (e.g., if `n` was `0` or `1000` but we only considered the zero digits by mistake), converting it to `0`, which is the correct behavior per the problem statement ("If there are no non-zero digits, x = 0.").
 *           4. Initialize a variable `sum` to `0`.
 *           5. Calculate the sum of digits of `x`. This is efficiently done using a `while` loop with modulo (`% 10`) and integer division (`Math.floor(x / 10)`). This process extracts digits from right to left and adds them to `sum` until `x` becomes `0`.
 *           6. Finally, return the product of `x` and `sum`.
 * Dry Run:
 *   Input: n = 10203004
 *   1. nStr = "10203004"
 *   2. xStr = ""
 *      - Character '1' is non-zero, xStr becomes "1"
 *      - Character '0' is zero, skip
 *      - Character '2' is non-zero, xStr becomes "12"
 *      - Character '0' is zero, skip
 *      - Character '3' is non-zero, xStr becomes "123"
 *      - Character '0' is zero, skip
 *      - Character '0' is zero, skip
 *      - Character '4' is non-zero, xStr becomes "1234"
 *   3. x = Number(xStr) = Number("1234") = 1234
 *   4. sum = 0
 *   5. Calculate sum of digits for x = 1234:
 *      - temporaryX = 1234
 *      - sum += 1234 % 10 (4); sum = 4; temporaryX = Math.floor(1234 / 10) = 123
 *      - sum += 123 % 10 (3); sum = 4 + 3 = 7; temporaryX = Math.floor(123 / 10) = 12
 *      - sum += 12 % 10 (2); sum = 7 + 2 = 9; temporaryX = Math.floor(12 / 10) = 1
 *      - sum += 1 % 10 (1); sum = 9 + 1 = 10; temporaryX = Math.floor(1 / 10) = 0
 *      The loop terminates as temporaryX is now 0.
 *      Final sum = 10.
 *   6. Return x * sum = 1234 * 10 = 12340.
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var sumAndMultiply = function (n) {
  let nStr = n.toString();
  let xStr = "";

  for (let i = 0; i < nStr.length; i++) {
    if (nStr[i] !== "0") {
      xStr += nStr[i];
    }
  }

  let x = Number(xStr);
  let sum = 0;

  let tempX = x;
  while (tempX > 0) {
    sum += tempX % 10;
    tempX = Math.floor(tempX / 10);
  }

  return x * sum;
};
