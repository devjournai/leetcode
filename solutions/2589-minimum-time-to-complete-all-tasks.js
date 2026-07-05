/**
 * Minimum Time to Complete All Tasks
 *
 * Intuition:
 * Since multiple tasks can run simultaneously, turning the computer on at a
 * particular second can contribute to every task whose interval contains that
 * second.
 *
 * To maximize reuse of already selected time points, process tasks in order of
 * increasing end time. For each task:
 *
 * - Count how many selected seconds already lie inside its interval.
 * - If more seconds are needed, greedily turn on the computer starting from the
 *   task's end and move backwards. Choosing the latest available seconds leaves
 *   earlier seconds available for future tasks.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort all tasks by their ending time.
 *
 * 2. Maintain:
 *
 *      used[t]
 *
 *      = whether the computer is already turned on at second t.
 *
 * 3. Process every task.
 *
 *      Let:
 *
 *          [start, end, duration]
 *
 *      Count the number of already selected seconds in [start, end].
 *
 *      remaining =
 *          duration - selectedSeconds
 *
 * 4. If remaining > 0,
 *      traverse from end towards start.
 *
 *      Whenever an unused second is found:
 *
 *          mark it used
 *          remaining--
 *
 *      Stop once remaining becomes 0.
 *
 * 5. After all tasks are processed,
 *      count the total selected seconds.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * tasks =
 *
 * [[2,3,1],
 *  [4,5,1],
 *  [1,5,2]]
 *
 * After sorting:
 *
 * Same order.
 *
 * --------------------
 * Task 1
 *
 * [2,3], need=1
 *
 * Choose:
 *
 * second 3
 *
 * --------------------
 * Task 2
 *
 * [4,5], need=1
 *
 * Choose:
 *
 * second 5
 *
 * --------------------
 * Task 3
 *
 * [1,5], need=2
 *
 * Already selected:
 *
 * 3
 * 5
 *
 * Requirement satisfied.
 *
 * Total selected:
 *
 * 2
 *
 * Return 2.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × T)
 * Space Complexity: O(T)
 */

var findMinimumTime = function (tasks) {
  tasks.sort((a, b) => a[1] - b[1]);

  const maxTime = 2001;
  const used = new Array(maxTime).fill(false);

  for (const [start, end, duration] of tasks) {
    let completed = 0;

    for (let t = start; t <= end; t++) {
      if (used[t]) {
        completed++;
      }
    }

    let remaining = duration - completed;

    for (let t = end; remaining > 0 && t >= start; t--) {
      if (!used[t]) {
        used[t] = true;
        remaining--;
      }
    }
  }

  let answer = 0;

  for (const state of used) {
    if (state) {
      answer++;
    }
  }

  return answer;
};
