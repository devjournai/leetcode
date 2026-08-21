/**
 * Task Scheduler
 * Intuition: The tightest schedule is driven by the most frequent task: `(maxFreq-1)` full cycles of length `n+1`, then one extra slot per task that also has that max frequency. If that formula is shorter than `tasks.length`, idle time is unused and the answer is just the task count.
 * Approach: 1. Count into `taskFrequencies`, tracking `highestFrequencyValue` and how many tasks share it (`highestFrequencyCount`). 2. `intervalsFromSchedule = (highestFrequencyValue-1)*(n+1) + highestFrequencyCount`. 3. Return `Math.max(tasks.length, intervalsFromSchedule)`.
 * Dry Run: tasks=["A","A","A","B","B","B"], n=2.
 *   - Freq A=3,B=3, max=3, count=2. Formula (3-1)*3+2=8. max(6,8)=8.
 * Time Complexity: O(T)
 * Space Complexity: O(U)
 */
var leastInterval = function (tasks, n) {
  const taskFrequencies = new Map();
  let highestFrequencyValue = 0;
  let highestFrequencyCount = 0;

  for (const singleTask of tasks) {
    const currentFrequency = (taskFrequencies.get(singleTask) || 0) + 1;
    taskFrequencies.set(singleTask, currentFrequency);

    if (currentFrequency > highestFrequencyValue) {
      highestFrequencyValue = currentFrequency;
      highestFrequencyCount = 1;
    } else if (currentFrequency === highestFrequencyValue) {
      highestFrequencyCount++;
    }
  }

  const cyclesForMaxFrequency = highestFrequencyValue - 1;
  const slotLengthPerCycle = n + 1;
  const intervalsFromSchedule =
    cyclesForMaxFrequency * slotLengthPerCycle + highestFrequencyCount;

  return Math.max(tasks.length, intervalsFromSchedule);
};
