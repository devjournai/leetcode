/**
 * Find Minimum Time To Finish All Jobs Ii
 * Intuition: To minimize the maximum number of days needed, assign the most time-consuming jobs to the most efficient workers. This strategy ensures that tasks that could become bottlenecks are handled by the resources best equipped to complete them quickly, thereby minimizing the overall longest completion time.
 * Approach: 1. Sort the `jobs` array in descending order to arrange tasks from longest to shortest duration. 2. Sort the `workers` array in descending order to arrange workers from most to least capable. 3. Iterate through both sorted arrays using a single index, pairing the `k`-th longest job with the `k`-th most capable worker. 4. For each such pairing, calculate the number of days required by dividing the job's duration by the worker's capacity and taking the ceiling. 5. Maintain a running maximum of these calculated daily requirements. This maximum value represents the minimum total days needed for all jobs to be completed.
 * Dry Run: jobs = [5, 10], workers = [2, 3]
 *   1. Sort `jobs` in descending order: `jobs` becomes `[10, 5]`
 *   2. Sort `workers` in descending order: `workers` becomes `[3, 2]`
 *   3. Initialize `overallMaximumDays = 0`.
 *   4. Begin iteration with `jobIterationIndex` from `0` to `length - 1` (which is `1`):
 *      - When `jobIterationIndex = 0`:
 *        `jobDurationValue = jobs[0] = 10`
 *        `workerCapacityValue = workers[0] = 3`
 *        `currentAssignmentDays = Math.ceil(10 / 3) = Math.ceil(3.33...) = 4`
 *        `overallMaximumDays = Math.max(0, 4) = 4`
 *      - When `jobIterationIndex = 1`:
 *        `jobDurationValue = jobs[1] = 5`
 *        `workerCapacityValue = workers[1] = 2`
 *        `currentAssignmentDays = Math.ceil(5 / 2) = Math.ceil(2.5) = 3`
 *        `overallMaximumDays = Math.max(4, 3) = 4`
 *   5. The loop finishes.
 *   6. Return `overallMaximumDays`, which is `4`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimumTime = function (jobs, workers) {
  jobs.sort((firstJob, secondJob) => secondJob - firstJob);
  workers.sort((firstWorker, secondWorker) => secondWorker - firstWorker);

  let overallMaximumDays = 0;
  for (
    let jobIterationIndex = 0;
    jobIterationIndex < jobs.length;
    jobIterationIndex++
  ) {
    const jobDurationValue = jobs[jobIterationIndex];
    const workerCapacityValue = workers[jobIterationIndex];
    const currentAssignmentDays = Math.ceil(
      jobDurationValue / workerCapacityValue
    );
    overallMaximumDays = Math.max(overallMaximumDays, currentAssignmentDays);
  }

  return overallMaximumDays;
};
