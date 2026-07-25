/**
 * Number Of Employees Who Met The Target
 * Intuition: To count elements satisfying a condition, iterate through the array, check the condition for each element, and accumulate a count.
 * Approach: 1. Initialize an accumulator variable to zero. 2. Use the `reduce` method on the `hours` array. 3. For each `individualHours`, if it meets or exceeds `target`, increment the accumulator. 4. Otherwise, keep the accumulator value unchanged. 5. The final value of the accumulator is the result.
 * Dry Run: hours = [0, 1, 2, 3, 4, 5], target = 2
 *   1. initialCount = 0.
 *   2. reduce starts:
 *      - currentAccumulator = 0, individualHours = 0. 0 < 2, currentAccumulator remains 0.
 *      - currentAccumulator = 0, individualHours = 1. 1 < 2, currentAccumulator remains 0.
 *      - currentAccumulator = 0, individualHours = 2. 2 >= 2, currentAccumulator becomes 0 + 1 = 1.
 *      - currentAccumulator = 1, individualHours = 3. 3 >= 2, currentAccumulator becomes 1 + 1 = 2.
 *      - currentAccumulator = 2, individualHours = 4. 4 >= 2, currentAccumulator becomes 2 + 1 = 3.
 *      - currentAccumulator = 3, individualHours = 5. 5 >= 2, currentAccumulator becomes 3 + 1 = 4.
 *   3. reduce finishes, employeesMetTarget = 4.
 *   4. Return 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numberOfEmployeesWhoMetTarget = function (hours, target) {
  let initialCount = 0;

  let employeesMetTarget = hours.reduce(
    (currentAccumulator, individualHours) => {
      if (individualHours >= target) {
        return currentAccumulator + 1;
      }
      return currentAccumulator;
    },
    initialCount,
  );

  return employeesMetTarget;
};
