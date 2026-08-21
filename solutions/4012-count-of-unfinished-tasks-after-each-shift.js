/**
 * Count of Unfinished Tasks After Each Shift
 * Intuition: We first precompute the prefix sum array s of task  * , where s[i] represents the total time required for the first i tasks.
 * Approach: We first precompute the prefix sum array s of task  * , where s[i] represents the total time required for the first i tasks. Then we use a variable i to record the index of the task currently being processed, and a variable cur to record how much time has already been spent on that task. We simulate each shift in order: - If the current shift time shifts[j] is less than the time needed to finish the current task tasks[i] - cur, the shift can only make partial progress on the current task. We update cur gets cur + shifts[j], and the number of unfinished tasks is m - i; - Otherwise, the current task is finished, and the remaining time is t = shifts[j] - (tasks[i] - cur). If t ge s[m] - s[i + 1], all tasks can be completed, so the next shift restarts from task 0, i.e., i gets 0, cur gets 0, and the number of unfinished tasks is 0. Otherwise, we binary search in the range [i + 1, m] for the largest index l such that s[l] - s[i + 1] le t, meaning the shift ends while processing task l with cur = t - (s[l] - s[i + 1]) time already spent on it, and the number of unfinished tasks is m - l.
 * Dry Run: Input: tasks = [1,4,4], shifts = [9,1,4]. Output: [0,2,1].
 * Time Complexity: O((m+n) * logm)
 * Space Complexity: O(m)
 */
var countTasks = function (tasks, shifts) {
  const m = tasks.length;
  const n = shifts.length;

  const s = new Array(m + 1).fill(0);
  for (let i = 0; i < m; i++) {
    s[i + 1] = s[i] + tasks[i];
  }

  const ans = new Array(n).fill(0);

  let i = 0;
  let cur = 0;

  for (let j = 0; j < n; j++) {
    if (shifts[j] < tasks[i] - cur) {
      cur += shifts[j];
      ans[j] = m - i;
    } else {
      const t = shifts[j] - (tasks[i] - cur);

      if (t >= s[m] - s[i + 1]) {
        i = 0;
        cur = 0;
      } else {
        let l = i + 1;
        let r = m;

        while (l < r) {
          const mid = (l + r) >> 1;
          if (t < s[mid + 1] - s[i + 1]) {
            r = mid;
          } else {
            l = mid + 1;
          }
        }

        cur = t - (s[l] - s[i + 1]);
        i = l;
        ans[j] = m - i;
      }
    }
  }

  return ans;
};
