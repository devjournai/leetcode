/**
 * A Number After A Double Reversal
 * Intuition: A number `num` after a double reversal will be equal to `num` if and only if `num` does not lose any information (trailing zeros) during the first reversal. This occurs when `num` is 0, or when `num` does not end with a 0.
 * Approach: 1. Check if `num` is exactly `0`. If so, return `true`. 2. Otherwise, check if `num` ends with a `0` using the modulo operator (`% 10`). 3. If `num` does not end with a `0` (i.e., `num % 10 !== 0`), then no information is lost, and the double reversal yields the original number; return `true`. 4. If `num` ends with a `0` (and is not `0` itself), the trailing zero is dropped during the first reversal, thus `reversed2` will not equal `num`; return `false`.
 * Dry Run:
 *   num = 526
 *     - Is 526 === 0? No.
 *     - Is 526 % 10 !== 0? Yes, 6 !== 0.
 *     - Result: true. (Correct: 526 -> 625 -> 526)
 *   num = 1800
 *     - Is 1800 === 0? No.
 *     - Is 1800 % 10 !== 0? No, 0 === 0.
 *     - Result: false. (Correct: 1800 -> 81 -> 18)
 *   num = 0
 *     - Is 0 === 0? Yes.
 *     - Result: true. (Correct: 0 -> 0 -> 0)
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isSameAfterReversals = function (num) {
  return num === 0 || num % 10 !== 0;
};
