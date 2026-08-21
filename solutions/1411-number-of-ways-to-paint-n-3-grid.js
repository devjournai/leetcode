/**
 * Number of Ways to Paint N × 3 Grid
 * Intuition: Each row is either ABA-pattern (two colors) or ABC-pattern (three colors). Transitions between valid 3-color rows have constant multipliers, so we roll counts modulo 1e9+7.
 * Approach: 1. Start with 6 ABA and 6 ABC colorings for row 1. 2. For each extra row: aba' = 3*aba + 2*abc, abc' = 2*aba + 2*abc (mod 1e9+7). 3. Return aba + abc.
 * Dry Run: n = 1 → 6+6 = 12. n = 2 → aba=3*6+2*6=30, abc=2*6+2*6=24, total 54.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numOfWays = function (n) {
  const moduloDivisor = 1000000007n;
  let countAbaCurrent = 6n;
  let countAbcCurrent = 6n;

  let iterationRow = 2;
  while (iterationRow <= n) {
    const countAbaNext =
      (3n * countAbaCurrent + 2n * countAbcCurrent) % moduloDivisor;
    const countAbcNext =
      (2n * countAbaCurrent + 2n * countAbcCurrent) % moduloDivisor;
    countAbaCurrent = countAbaNext;
    countAbcCurrent = countAbcNext;
    iterationRow++;
  }

  return Number((countAbaCurrent + countAbcCurrent) % moduloDivisor);
};
