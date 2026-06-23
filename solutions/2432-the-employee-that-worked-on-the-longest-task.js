/**
 * The Employee That Worked On The Longest Task
 * Intuition: The problem asks for the employee who spent the longest duration on a task, with a tie-breaking rule for the smallest employee ID. Each task's duration is the difference between its finish time and the previous task's finish time (or 0 for the first task). We need to iterate through the logs, calculate each task's duration, and keep track of the maximum duration found so far and the corresponding employee ID, updating based on the tie-breaking rule.
 * Approach: 1. Initialize variables to store the maximum duration found (`longestTaskDurationTracker`), the ID of the employee associated with that duration (`employeeWithLongestTask`), and the completion time of the previous task (`previousTaskFinishTime`). `employeeWithLongestTask` should be initialized to a value larger than any possible employee ID (e.g., `n`) to correctly handle the smallest ID tie-breaker for the first valid task. 2. Iterate through the `logs` array using a standard `for` loop with an index. 3. For each log entry, extract the employee ID and the leave time. 4. Calculate the current task's duration by subtracting `previousTaskFinishTime` from the current leave time. 5. Compare this `currentTaskSpan` with `longestTaskDurationTracker`. If `currentTaskSpan` is strictly greater, update both `longestTaskDurationTracker` and `employeeWithLongestTask`. 6. If `currentTaskSpan` is equal to `longestTaskDurationTracker`, then compare the current employee's ID with `employeeWithLongestTask`. If the current employee's ID is smaller, update `employeeWithLongestTask`. 7. After processing each log, update `previousTaskFinishTime` to the current task's leave time for the next iteration. 8. After the loop completes, `employeeWithLongestTask` will hold the ID of the employee who worked on the longest task, respecting the tie-breaking rule.
 * Dry Run: n = 10, logs = [[0,3],[1,5],[0,9],[2,15]]
 * Initial:
 *   longestTaskDurationTracker = 0
 *   employeeWithLongestTask = 10 (value of n)
 *   previousTaskFinishTime = 0
 *
 * Iteration 1 (currentLogIndex = 0): currentLogEntry = [0, 3]
 *   currentWorkerId = 0, currentLeaveMoment = 3
 *   currentTaskSpan = 3 - 0 = 3
 *   currentTaskSpan (3) > longestTaskDurationTracker (0):
 *     longestTaskDurationTracker = 3
 *     employeeWithLongestTask = 0
 *   previousTaskFinishTime = 3
 *
 * Iteration 2 (currentLogIndex = 1): currentLogEntry = [1, 5]
 *   currentWorkerId = 1, currentLeaveMoment = 5
 *   currentTaskSpan = 5 - 3 = 2
 *   currentTaskSpan (2) > longestTaskDurationTracker (3) is false.
 *   currentTaskSpan (2) === longestTaskDurationTracker (3) is false.
 *   previousTaskFinishTime = 5
 *
 * Iteration 3 (currentLogIndex = 2): currentLogEntry = [0, 9]
 *   currentWorkerId = 0, currentLeaveMoment = 9
 *   currentTaskSpan = 9 - 5 = 4
 *   currentTaskSpan (4) > longestTaskDurationTracker (3):
 *     longestTaskDurationTracker = 4
 *     employeeWithLongestTask = 0
 *   previousTaskFinishTime = 9
 *
 * Iteration 4 (currentLogIndex = 3): currentLogEntry = [2, 15]
 *   currentWorkerId = 2, currentLeaveMoment = 15
 *   currentTaskSpan = 15 - 9 = 6
 *   currentTaskSpan (6) > longestTaskDurationTracker (4):
 *     longestTaskDurationTracker = 6
 *     employeeWithLongestTask = 2
 *   previousTaskFinishTime = 15
 *
 * Loop ends.
 * Return employeeWithLongestTask = 2.
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var hardestWorker = function (n, logs) {
  let longestTaskDurationTracker = 0;
  let employeeWithLongestTask = n;
  let previousTaskFinishTime = 0;

  for (
    let currentLogIndex = 0;
    currentLogIndex < logs.length;
    currentLogIndex++
  ) {
    const currentLogEntry = logs[currentLogIndex];
    const currentWorkerId = currentLogEntry[0];
    const currentLeaveMoment = currentLogEntry[1];

    const currentTaskSpan = currentLeaveMoment - previousTaskFinishTime;

    if (currentTaskSpan > longestTaskDurationTracker) {
      longestTaskDurationTracker = currentTaskSpan;
      employeeWithLongestTask = currentWorkerId;
    } else if (currentTaskSpan === longestTaskDurationTracker) {
      if (currentWorkerId < employeeWithLongestTask) {
        employeeWithLongestTask = currentWorkerId;
      }
    }
    previousTaskFinishTime = currentLeaveMoment;
  }

  return employeeWithLongestTask;
};
