/**
 * Task Scheduler
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
