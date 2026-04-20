/**
 * Number of Ways to Paint N × 3 Grid
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
