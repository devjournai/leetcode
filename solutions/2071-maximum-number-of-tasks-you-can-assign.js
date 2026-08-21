/**
* Maximum Number Of Tasks You Can Assign
* Intuition: The problem asks for the maximum number of tasks. This pattern often suggests binary search on the answer. If we can assign `k` tasks, we can always assign `k-1` tasks. Thus, we can binary search for the largest `k` for which a helper function `checkPossibility(k)` returns true.
* Approach: 1. Sort both the `tasks` and `workers` arrays in ascending order. This helps in a greedy matching strategy. 2. Implement a binary search over the possible number of tasks `k`, ranging from `0` to `min(tasks.length, workers.length)`. 3. Define a helper function, `checkPossibility(k)`, which determines if it's possible to assign `k` tasks. This function will try to assign the `k` most difficult tasks (from the `k` easiest available tasks) to the `k` strongest workers. 4. In `checkPossibility(k)`:
    * a. Select the `k` easiest tasks and `k` strongest workers.
    * b. Iterate through the selected tasks from the hardest (`tasks[k-1]`) to the easiest (`tasks[0]`).
    * c. For each task, first try to assign it to the strongest available worker *without* using a pill. If successful, remove that worker and proceed to the next task.
    * d. If not successful without a pill, and if pills are available, try to find the *weakest* available worker who can complete the task *with* a pill. If successful, remove that worker, decrement pill count, and proceed.
    * e. If neither assignment strategy works for a task, then `k` tasks cannot be assigned, so return `false`.
    * f. If all `k` tasks are assigned, return `true`.
* Dry Run:
    tasks = [10, 15, 20], workers = [5, 10, 20, 25], pills = 1, strength = 5
    1. Sort: tasks = [10, 15, 20], workers = [5, 10, 20, 25]
    2. Binary Search: `lowBoundary = 0`, `highBoundary = min(3, 4) = 3`
    - Loop 1: `lowBoundary = 0`, `highBoundary = 3`. `currentMiddle = floor((0 + 3 + 1) / 2) = 2`.
    - Call `checkPossibility(2)`:
        - `tasksToAssignCount = 2`.
        - `slicedTaskRequirements = [10, 15]` (first 2 tasks).
        - `availableWorkerStrengths = [20, 25]` (last 2 workers).
        - `currentPillsRemaining = 1`.
        - `taskProcessIndex = 1` (for task `15`).
        - Task `15`: `strongestAvailableWorker = 25`. `25 >= 15` is true. `availableWorkerStrengths.pop()` (removes 25). `availableWorkerStrengths = [20]`. `assignedThisTask = true`.
        - `taskProcessIndex = 0` (for task `10`).
        - Task `10`: `strongestAvailableWorker = 20`. `20 >= 10` is true. `availableWorkerStrengths.pop()` (removes 20). `availableWorkerStrengths = []`. `assignedThisTask = true`.
        - All tasks assigned. `checkPossibility(2)` returns `true`.
        - `lowBoundary = 2`.
    - Loop 2: `lowBoundary = 2`, `highBoundary = 3`. `currentMiddle = floor((2 + 3 + 1) / 2) = 3`.
    - Call `checkPossibility(3)`:
        - `tasksToAssignCount = 3`.
        - `slicedTaskRequirements = [10, 15, 20]`.
        - `availableWorkerStrengths = [10, 20, 25]`.
        - `currentPillsRemaining = 1`.
        - `taskProcessIndex = 2` (for task `20`).
        - Task `20`: `strongestAvailableWorker = 25`. `25 >= 20` is true. `availableWorkerStrengths.pop()` (removes 25). `availableWorkerStrengths = [10, 20]`. `assignedThisTask = true`.
        - `taskProcessIndex = 1` (for task `15`).
        - Task `15`: `strongestAvailableWorker = 20`. `20 >= 15` is true. `availableWorkerStrengths.pop()` (removes 20). `availableWorkerStrengths = [10]`. `assignedThisTask = true`.
        - `taskProcessIndex = 0` (for task `10`).
        - Task `10`: `strongestAvailableWorker = 10`. `10 >= 10` is true. `availableWorkerStrengths.pop()` (removes 10). `availableWorkerStrengths = []`. `assignedThisTask = true`.
        - All tasks assigned. `checkPossibility(3)` returns `true`.
        - `lowBoundary = 3`.
    - Loop 3: `lowBoundary = 3`, `highBoundary = 3`. Condition `lowBoundary < highBoundary` is false. Loop ends.
    3. Return `lowBoundary = 3`.
* Time Complexity: O((N + M) log(N + M) + min(N, M)^2 * log(min(N, M)))
* Space Complexity: O(N + M)
*/
var maxTaskAssign = function (tasks, workers, pills, strength) {
  tasks.sort((taskA, taskB) => taskA - taskB);
  workers.sort((workerA, workerB) => workerA - workerB);

  const taskCount = tasks.length;
  const workerCount = workers.length;

  let lowBoundary = 0;
  let highBoundary = Math.min(taskCount, workerCount);
  let maximumAssignableTasks = 0;

  while (lowBoundary <= highBoundary) {
    const currentMiddle = Math.floor((lowBoundary + highBoundary) / 2);

    if (currentMiddle === 0) {
      maximumAssignableTasks = Math.max(maximumAssignableTasks, currentMiddle);
      lowBoundary = currentMiddle + 1;
      continue;
    }

    if (checkPossibility(currentMiddle)) {
      maximumAssignableTasks = Math.max(maximumAssignableTasks, currentMiddle);
      lowBoundary = currentMiddle + 1;
    } else {
      highBoundary = currentMiddle - 1;
    }
  }

  return maximumAssignableTasks;

  function checkPossibility(tasksToAssignCount) {
    if (tasksToAssignCount === 0) {
      return true;
    }

    const slicedTaskRequirements = tasks.slice(0, tasksToAssignCount);
    const availableWorkerStrengths = workers.slice(
      workerCount - tasksToAssignCount
    );
    let currentPillsRemaining = pills;

    let taskProcessIndex = tasksToAssignCount - 1;
    let allTasksAssignable = true;

    while (taskProcessIndex >= 0 && allTasksAssignable) {
      const currentTaskRequirement = slicedTaskRequirements[taskProcessIndex];
      let assignedThisTask = false;

      if (
        availableWorkerStrengths.length > 0 &&
        availableWorkerStrengths[availableWorkerStrengths.length - 1] >=
          currentTaskRequirement
      ) {
        availableWorkerStrengths.pop();
        assignedThisTask = true;
      } else {
        if (currentPillsRemaining > 0) {
          let workerSearchIndex = 0;
          while (
            workerSearchIndex < availableWorkerStrengths.length &&
            !assignedThisTask
          ) {
            if (
              availableWorkerStrengths[workerSearchIndex] + strength >=
              currentTaskRequirement
            ) {
              availableWorkerStrengths.splice(workerSearchIndex, 1);
              currentPillsRemaining--;
              assignedThisTask = true;
            }
            workerSearchIndex++;
          }
        }
      }

      if (!assignedThisTask) {
        allTasksAssignable = false;
      }

      taskProcessIndex--;
    }

    return allTasksAssignable;
  }
};
