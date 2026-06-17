/**
 * Task Scheduler Ii
 * Intuition: To minimize total days, we process tasks sequentially. For each task, we determine the earliest possible day it can be completed, considering the `space` constraint for tasks of the same type. This involves tracking the last completion day for each task type.
 * Approach: 1. Initialize a map to store the last day each task type was completed. 2. Initialize a counter for the total days elapsed, starting from zero. 3. Iterate through the given tasks array: a. Increment the total days elapsed by one, representing the current day we are considering. b. Check if the current task type has been encountered before in the map. c. If it has, retrieve its `previousCompletionDay`. d. Calculate the number of days that have passed since its `previousCompletionDay`. e. If the `space` constraint is violated (i.e., `currentDay - previousCompletionDay <= space`), adjust the `currentDay` to be `previousCompletionDay + space + 1` to ensure the minimum space requirement is met. f. Update the map with the current task type and its *actual* completion day (the potentially adjusted `currentDay`). 4. After processing all tasks, the final value of the total days elapsed counter will be the minimum days needed.
 * Dry Run: tasks = [1, 2, 1, 2], space = 2
 * lastCompletionDayByType = {}
 * totalDaysElapsed = 0
 *
 * 1. currentTaskType = 1:
 *    totalDaysElapsed becomes 1.
 *    Map does not contain 1.
 *    lastCompletionDayByType.set(1, 1).
 *    totalDaysElapsed is 1.
 *
 * 2. currentTaskType = 2:
 *    totalDaysElapsed becomes 2.
 *    Map does not contain 2.
 *    lastCompletionDayByType.set(2, 2).
 *    totalDaysElapsed is 2.
 *
 * 3. currentTaskType = 1:
 *    totalDaysElapsed becomes 3.
 *    Map contains 1. previousCompletionDay = 1.
 *    Days passed = 3 - 1 = 2.
 *    Since 2 <= space (2), constraint violated.
 *    totalDaysElapsed is updated to previousCompletionDay + space + 1 = 1 + 2 + 1 = 4.
 *    lastCompletionDayByType.set(1, 4).
 *    totalDaysElapsed is 4.
 *
 * 4. currentTaskType = 2:
 *    totalDaysElapsed becomes 5.
 *    Map contains 2. previousCompletionDay = 2.
 *    Days passed = 5 - 2 = 3.
 *    Since 3 > space (2), constraint not violated.
 *    lastCompletionDayByType.set(2, 5).
 *    totalDaysElapsed is 5.
 *
 * Loop ends. Return totalDaysElapsed = 5.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var taskSchedulerII = function (tasks, space) {
  const lastCompletionDayByType = new Map();
  let totalDaysElapsed = 0;

  for (const currentTaskType of tasks) {
    totalDaysElapsed++;
    if (lastCompletionDayByType.has(currentTaskType)) {
      const previousCompletionDay =
        lastCompletionDayByType.get(currentTaskType);
      const daysSincePreviousCompletion =
        totalDaysElapsed - previousCompletionDay;
      if (daysSincePreviousCompletion <= space) {
        totalDaysElapsed = previousCompletionDay + space + 1;
      }
    }
    lastCompletionDayByType.set(currentTaskType, totalDaysElapsed);
  }

  return totalDaysElapsed;
};
