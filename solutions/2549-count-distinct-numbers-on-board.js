/**
 * Count Distinct Numbers On Board
 * Intuition: The problem describes a process where numbers are added to a board based on a modulo condition. The key insight lies in the mathematical property `x % (x - 1) == 1` for any integer `x > 1`. This means if a number `x` greater than `1` is present on the board, then `x - 1` will always be added to the board, provided `x - 1` is within the allowed range (`1 <= x - 1 <= n`). This creates a cascading effect: starting from `n`, `n-1` will be added, then `n-2` (if `n-1 > 1`), and so on, until `2` is added. The number `1` can never be added to the board because `x % 1` is always `0`, not `1`. Given the extremely large number of days (`10^9`), the process will quickly stabilize, and we only need to determine the final set of distinct numbers.
 * Approach: 1. Consider the base case where `n` is `1`. Initially, the board contains only `1`. For `x=1`, we need to find `i` such that `1 <= i <= 1` and `1 % i == 1`. The only possible `i` is `1`, but `1 % 1` is `0`, not `1`. Thus, no new numbers are added, and the distinct count remains `1`. 2. For `n` greater than `1`, the board initially contains `n`. Since `n > 1`, we know that `n % (n - 1) == 1` (as `n = 1 * (n - 1) + 1`). Because `n - 1 >= 1`, the number `n - 1` will be added to the board. 3. Now, `n - 1` is on the board. If `n - 1 > 1` (i.e., `n > 2`), then `(n - 1) % (n - 2) == 1`, so `n - 2` will be added. This propagation continues downwards. Every number `k > 1` on the board will cause `k - 1` to be added. 4. This chain reaction will populate the board with all integers from `n` down to `2`. 5. The number `1` cannot be generated because `x % 1` is always `0`. Therefore, the final set of distinct integers on the board will be `{2, 3, ..., n}`. 6. The count of these distinct integers is `n - 2 + 1`, which simplifies to `n - 1`.
 * Dry Run: n = 4
 *   1. The input value `n` is `4`.
 *   2. The condition `n === 1` (`4 === 1`) evaluates to `false`.
 *   3. The code executes the `else` block.
 *   4. A variable `resultCount` is assigned the value `n - 1`.
 *   5. `resultCount` becomes `4 - 1`, which is `3`.
 *   6. The function returns `resultCount`, which is `3`.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var distinctIntegers = function (n) {
  if (n === 1) {
    let singleValueCount = 1;
    return singleValueCount;
  } else {
    let finalDistinctCount = n - 1;
    return finalDistinctCount;
  }
};
