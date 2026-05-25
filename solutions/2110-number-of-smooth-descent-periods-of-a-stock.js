/**
 * Number Of Smooth Descent Periods Of A Stock
 * Intuition: Each single day inherently forms a smooth descent period of length one. When a stock price consecutively drops by exactly one, it extends a current "smooth descent chain." A chain of length `L` ending on the current day means there are `L` new smooth descent periods that can be formed ending on this day (e.g., `[current]`, `[prev, current]`, ..., `[start_of_chain, ..., current]`).
 * Approach: 1. Initialize `totalSmoothPeriodsCount` to zero to accumulate the final result. 2. Initialize `currentDescentSubsequenceLength` to zero, which will track the length of the continuous smooth descent ending at the current day. 3. Iterate through the `prices` array using a `while` loop with a `dayIndex`. 4. For the first day (`dayIndex === 0`), set `currentDescentSubsequenceLength` to 1, as any single day is a smooth descent. 5. For subsequent days, retrieve `priorDayPrice` and `todayPrice`. If `todayPrice` is exactly `priorDayPrice - 1`, it means the smooth descent continues, so increment `currentDescentSubsequenceLength`. Otherwise, the smooth descent chain is broken, and a new one starts with the current day, so reset `currentDescentSubsequenceLength` to 1. 6. In each iteration, add the current `currentDescentSubsequenceLength` to `totalSmoothPeriodsCount`. 7. Increment `dayIndex` and continue until all prices are processed. 8. Finally, return `totalSmoothPeriodsCount`.
 * Dry Run: prices = [3, 2, 1]
 * - Initialize: totalSmoothPeriodsCount = 0, currentDescentSubsequenceLength = 0, dayIndex = 0
 * - Loop (dayIndex = 0):
 *   - dayIndex === 0 is true. Set currentDescentSubsequenceLength = 1.
 *   - Add currentDescentSubsequenceLength (1) to totalSmoothPeriodsCount. totalSmoothPeriodsCount = 1.
 *   - Increment dayIndex to 1.
 * - Loop (dayIndex = 1):
 *   - dayIndex === 0 is false.
 *   - priorDayPrice = prices[0] = 3. todayPrice = prices[1] = 2.
 *   - todayPrice (2) === priorDayPrice (3) - 1 is true. Increment currentDescentSubsequenceLength to 2.
 *   - Add currentDescentSubsequenceLength (2) to totalSmoothPeriodsCount. totalSmoothPeriodsCount = 1 + 2 = 3.
 *   - Increment dayIndex to 2.
 * - Loop (dayIndex = 2):
 *   - dayIndex === 0 is false.
 *   - priorDayPrice = prices[1] = 2. todayPrice = prices[2] = 1.
 *   - todayPrice (1) === priorDayPrice (2) - 1 is true. Increment currentDescentSubsequenceLength to 3.
 *   - Add currentDescentSubsequenceLength (3) to totalSmoothPeriodsCount. totalSmoothPeriodsCount = 3 + 3 = 6.
 *   - Increment dayIndex to 3.
 * - Loop condition (dayIndex < prices.length) (3 < 3) is false. Loop terminates.
 * - Return totalSmoothPeriodsCount = 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var getDescentPeriods = function (prices) {
  let totalSmoothPeriodsCount = 0;
  let currentDescentSubsequenceLength = 0;
  let dayIndex = 0;

  while (dayIndex < prices.length) {
    if (dayIndex === 0) {
      currentDescentSubsequenceLength = 1;
    } else {
      let priorDayPrice = prices[dayIndex - 1];
      let todayPrice = prices[dayIndex];
      if (todayPrice === priorDayPrice - 1) {
        currentDescentSubsequenceLength++;
      } else {
        currentDescentSubsequenceLength = 1;
      }
    }
    totalSmoothPeriodsCount += currentDescentSubsequenceLength;
    dayIndex++;
  }

  return totalSmoothPeriodsCount;
};
