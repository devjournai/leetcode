/**
 * Earliest Time To Finish One Task
 * Intuition: Tasks run independently, so the first finish time is the minimum of start + duration over all tasks.
 * Approach: Scan each [start, duration] pair and keep the minimum start + duration.
 * Dry Run: tasks = [[1, 6], [2, 3]] finishes at 7 and 5 → 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var earliestTime = function (tasks) {
  let earliestFinish = Infinity;
  for (const [startTime, duration] of tasks) {
    earliestFinish = Math.min(earliestFinish, startTime + duration);
  }
  return earliestFinish;
};
