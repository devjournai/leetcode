/**
 * Date Range Generator
 * Intuition: To generate a sequence of dates, start from the initial date, and repeatedly add the specified step value to the current date until it exceeds the end date.
 * Approach: 1. Parse the input `start` and `end` strings into `Date` objects for easier comparison and manipulation. 2. Initialize a loop variable `iterateDate` with the parsed start date. 3. Iterate using a `for` loop as long as `iterateDate` is less than or equal to the parsed end date. 4. In each iteration, yield the current `iterateDate` formatted as 'YYYY-MM-DD'. 5. Increment `iterateDate` by adding `step` days to it within the loop's increment clause.
 * Dry Run: Input: start = "2023-01-01", end = "2023-01-05", step = 2
 *   1. `startPoint` becomes `Date` object for "2023-01-01".
 *   2. `endPoint` becomes `Date` object for "2023-01-05".
 *   3. `incrementValue` is `2`.
 *   4. Loop starts: `for (let iterateDate = new Date(startPoint); iterateDate <= endPoint; iterateDate.setDate(iterateDate.getDate() + incrementValue))`
 *      - Iteration 1:
 *          - Initialize `iterateDate` to `Date`("2023-01-01").
 *          - Condition `Date`("2023-01-01") <= `Date`("2023-01-05") is true.
 *          - `yield "2023-01-01"`.
 *          - Increment: `iterateDate` becomes `Date`("2023-01-03").
 *      - Iteration 2:
 *          - Condition `Date`("2023-01-03") <= `Date`("2023-01-05") is true.
 *          - `yield "2023-01-03"`.
 *          - Increment: `iterateDate` becomes `Date`("2023-01-05").
 *      - Iteration 3:
 *          - Condition `Date`("2023-01-05") <= `Date`("2023-01-05") is true.
 *          - `yield "2023-01-05"`.
 *          - Increment: `iterateDate` becomes `Date`("2023-01-07").
 *      - Iteration 4:
 *          - Condition `Date`("2023-01-07") <= `Date`("2023-01-05") is false.
 *   5. Loop terminates.
 *   Yielded values: "2023-01-01", "2023-01-03", "2023-01-05".
 * Time Complexity: O((end - start) / step)
 * Space Complexity: O(1)
 */
var dateRangeGenerator = function* (start, end, step) {
  const startPoint = new Date(start);
  const endPoint = new Date(end);
  const incrementValue = step;

  for (
    let iterateDate = new Date(startPoint);
    iterateDate <= endPoint;
    iterateDate.setDate(iterateDate.getDate() + incrementValue)
  ) {
    yield iterateDate.toISOString().split("T")[0];
  }
};
