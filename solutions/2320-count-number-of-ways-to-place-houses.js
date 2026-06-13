/**
 * Count Number Of Ways To Place Houses
 * Intuition: The placement of houses on one side of the street is entirely independent of the other side. Therefore, we can calculate the number of ways to place houses on a single side, and then square that result. For a single side with 'n' plots, this problem reduces to a dynamic programming approach similar to Fibonacci sequence, where at each plot, we decide whether to place a house or leave it empty, ensuring no two houses are adjacent.
 * Approach: 1. Define the modulo constant `10^9 + 7`. 2. Initialize two BigInt variables, `waysIfLastPlotEmpty` and `waysIfLastPlotHasHouse`, to represent the number of ways to arrange houses on a single street side up to the current plot, considering the last plot is empty or has a house, respectively. For `n=1` plot, both are initialized to `1n`. 3. Iterate from the second plot (`iterationCounter = 2`) up to `n`. In each iteration: a. Calculate `nextPossibilitiesIfLastEmpty` as the sum of `waysIfLastPlotEmpty` and `waysIfLastPlotHasHouse` from the previous step, taking modulo. This represents that if the current plot is empty, the previous plot could have been either empty or a house. b. Calculate `nextPossibilitiesIfLastHouse` as `waysIfLastPlotEmpty` from the previous step. This represents that if the current plot has a house, the previous plot must have been empty. c. Update `waysIfLastPlotEmpty` and `waysIfLastPlotHasHouse` with their newly calculated `nextPossibilities` values. 4. After the loop, the total number of ways to place houses on one side of the street is the sum of `waysIfLastPlotEmpty` and `waysIfLastPlotHasHouse`, taking modulo. 5. Square this total number of ways for one side and apply modulo again to obtain the final answer for both sides of the street. 6. Convert the BigInt result back to a Number before returning.
 * Dry Run:
 * n = 2
 * moduloConstant = 1000000007
 * waysIfLastPlotEmpty = 1n
 * waysIfLastPlotHasHouse = 1n
 *
 * Loop (iterationCounter from 2 to 2):
 *   iterationCounter = 2:
 *     nextPossibilitiesIfLastEmpty = (waysIfLastPlotEmpty + waysIfLastPlotHasHouse) % BigInt(moduloConstant) = (1n + 1n) % MOD = 2n
 *     nextPossibilitiesIfLastHouse = waysIfLastPlotEmpty = 1n
 *     waysIfLastPlotEmpty = 2n
 *     waysIfLastPlotHasHouse = 1n
 *
 * Loop ends.
 *
 * totalWaysOnOneSide = (waysIfLastPlotEmpty + waysIfLastPlotHasHouse) % BigInt(moduloConstant) = (2n + 1n) % MOD = 3n
 * finalAnswer = (totalWaysOnOneSide * totalWaysOnOneSide) % BigInt(moduloConstant) = (3n * 3n) % MOD = 9n
 * return Number(9n) = 9
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countHousePlacements = function (n) {
  const moduloConstant = 1000000007;

  let waysIfLastPlotEmpty = 1n;
  let waysIfLastPlotHasHouse = 1n;

  for (let iterationCounter = 2; iterationCounter <= n; iterationCounter++) {
    let nextPossibilitiesIfLastEmpty =
      (waysIfLastPlotEmpty + waysIfLastPlotHasHouse) % BigInt(moduloConstant);
    let nextPossibilitiesIfLastHouse = waysIfLastPlotEmpty;

    waysIfLastPlotEmpty = nextPossibilitiesIfLastEmpty;
    waysIfLastPlotHasHouse = nextPossibilitiesIfLastHouse;
  }

  const totalWaysOnOneSide =
    (waysIfLastPlotEmpty + waysIfLastPlotHasHouse) % BigInt(moduloConstant);
  const finalAnswer =
    (totalWaysOnOneSide * totalWaysOnOneSide) % BigInt(moduloConstant);

  return Number(finalAnswer);
};
