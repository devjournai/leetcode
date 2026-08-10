/**
 * Minimum Processing Time
 * Intuition: To minimize the maximum completion time across all tasks, it is optimal to assign the longest tasks to the processors that become available earliest. This strategy ensures that the processors that are ready sooner start processing the most time-consuming tasks, thereby balancing the overall workload and preventing any single task or processor from disproportionately delaying the total completion time.
 * Approach: 1. Create a mutable copy of the `tasks` array and sort it in descending order (longest tasks first). 2. Create a mutable copy of the `processorTime` array and sort it in ascending order (earliest available processors first). 3. Initialize a variable `overallMinCompletionTime` to zero to track the maximum time any task finishes. 4. Iterate through the sorted `processorAvailabilityTimes` array. For each processor, calculate the completion time for the four tasks it will process (these tasks are the next four from the sorted `taskDurations` array). 5. Update `overallMinCompletionTime` with the maximum of its current value and the completion times of these four tasks. 6. After iterating through all processors, `overallMinCompletionTime` will hold the minimum possible maximum completion time.
 * Dry Run: processorTime = [8, 10], tasks = [2, 2, 3, 1, 8, 7, 4, 5]
 *   1. taskDurations sorted (desc): [8, 7, 5, 4, 3, 2, 2, 1]
 *   2. processorAvailabilityTimes sorted (asc): [8, 10]
 *   3. overallMinCompletionTime = 0
 *   4. Iterate `processorAvailabilityTimes`:
 *      - processorIndex = 0, currentProcessorAvailableTime = 8
 *        - taskStartIndex = 0 * 4 = 0
 *        - currentTaskDurationOne = taskDurations[0] = 8 => completionTimeForTaskOne = 8 + 8 = 16. overallMinCompletionTime = max(0, 16) = 16
 *        - currentTaskDurationTwo = taskDurations[1] = 7 => completionTimeForTaskTwo = 8 + 7 = 15. overallMinCompletionTime = max(16, 15) = 16
 *        - currentTaskDurationThree = taskDurations[2] = 5 => completionTimeForTaskThree = 8 + 5 = 13. overallMinCompletionTime = max(16, 13) = 16
 *        - currentTaskDurationFour = taskDurations[3] = 4 => completionTimeForTaskFour = 8 + 4 = 12. overallMinCompletionTime = max(16, 12) = 16
 *      - processorIndex = 1, currentProcessorAvailableTime = 10
 *        - taskStartIndex = 1 * 4 = 4
 *        - currentTaskDurationOne = taskDurations[4] = 3 => completionTimeForTaskOne = 10 + 3 = 13. overallMinCompletionTime = max(16, 13) = 16
 *        - currentTaskDurationTwo = taskDurations[5] = 2 => completionTimeForTaskTwo = 10 + 2 = 12. overallMinCompletionTime = max(16, 12) = 16
 *        - currentTaskDurationThree = taskDurations[6] = 2 => completionTimeForTaskThree = 10 + 2 = 12. overallMinCompletionTime = max(16, 12) = 16
 *        - currentTaskDurationFour = taskDurations[7] = 1 => completionTimeForTaskFour = 10 + 1 = 11. overallMinCompletionTime = max(16, 11) = 16
 *   5. Return 16.
 * Time Complexity: O(N log N + M log M)
 * Space Complexity: O(N + M)
 */
var minProcessingTime = function (processorTime, tasks) {
  const taskDurations = [...tasks];
  const processorAvailabilityTimes = [...processorTime];

  taskDurations.sort(
    (firstTaskDuration, secondTaskDuration) =>
      secondTaskDuration - firstTaskDuration,
  );
  processorAvailabilityTimes.sort(
    (firstProcessorTime, secondProcessorTime) =>
      firstProcessorTime - secondProcessorTime,
  );

  let overallMinCompletionTime = 0;
  const coreCountPerProcessor = 4;
  const processorCount = processorAvailabilityTimes.length;

  for (
    let processorIndex = 0;
    processorIndex < processorCount;
    processorIndex++
  ) {
    const currentProcessorAvailableTime =
      processorAvailabilityTimes[processorIndex];

    const taskStartIndex = processorIndex * coreCountPerProcessor;

    const currentTaskDurationOne = taskDurations[taskStartIndex];
    const completionTimeForTaskOne =
      currentProcessorAvailableTime + currentTaskDurationOne;
    overallMinCompletionTime = Math.max(
      overallMinCompletionTime,
      completionTimeForTaskOne,
    );

    const currentTaskDurationTwo = taskDurations[taskStartIndex + 1];
    const completionTimeForTaskTwo =
      currentProcessorAvailableTime + currentTaskDurationTwo;
    overallMinCompletionTime = Math.max(
      overallMinCompletionTime,
      completionTimeForTaskTwo,
    );

    const currentTaskDurationThree = taskDurations[taskStartIndex + 2];
    const completionTimeForTaskThree =
      currentProcessorAvailableTime + currentTaskDurationThree;
    overallMinCompletionTime = Math.max(
      overallMinCompletionTime,
      completionTimeForTaskThree,
    );

    const currentTaskDurationFour = taskDurations[taskStartIndex + 3];
    const completionTimeForTaskFour =
      currentProcessorAvailableTime + currentTaskDurationFour;
    overallMinCompletionTime = Math.max(
      overallMinCompletionTime,
      completionTimeForTaskFour,
    );
  }

  return overallMinCompletionTime;
};
