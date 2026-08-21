/**
 * Find Minimum Time To Finish All Jobs
 * Intuition: Assign jobs to `k` workers minimizing the max load. Sort jobs descending and DFS with pruning: skip assignments that exceed the current best max, and skip identical empty workers (symmetry).
 * Approach: 1. Sort `jobs` descending; `workerCurrentLoads` start at 0. 2. `recursiveSolver` tries each worker; update `minOverallMaxDuration` at the leaves. 3. Break after assigning to an empty worker. 4. Return the min max load.
 * Dry Run: jobs = [3,2,3], k = 3
 * Each job its own worker → max 3.
 * Time Complexity: O(k^N)
 * Space Complexity: O(N + k)
 */
var minimumTimeRequired = function (jobs, k) {
  const numberOfJobs = jobs.length;
  const totalWorkers = k;
  const workerCurrentLoads = new Array(totalWorkers).fill(0);
  let minOverallMaxDuration = Infinity;

  const sortCompare = (durationA, durationB) => durationB - durationA;
  jobs.sort(sortCompare);

  const recursiveSolver = (currentJobPointer, maxDurationSoFar) => {
    if (currentJobPointer === numberOfJobs) {
      minOverallMaxDuration = Math.min(minOverallMaxDuration, maxDurationSoFar);
      return;
    }

    if (maxDurationSoFar >= minOverallMaxDuration) {
      return;
    }

    const currentJobDuration = jobs[currentJobPointer];

    for (
      let iterateWorkerId = 0;
      iterateWorkerId < totalWorkers;
      iterateWorkerId++
    ) {
      const potentialNewWorkerLoad =
        workerCurrentLoads[iterateWorkerId] + currentJobDuration;

      if (potentialNewWorkerLoad >= minOverallMaxDuration) {
        continue;
      }

      workerCurrentLoads[iterateWorkerId] = potentialNewWorkerLoad;
      const newMaxDurationForPath = Math.max(
        maxDurationSoFar,
        workerCurrentLoads[iterateWorkerId]
      );
      recursiveSolver(currentJobPointer + 1, newMaxDurationForPath);
      workerCurrentLoads[iterateWorkerId] -= currentJobDuration;

      if (workerCurrentLoads[iterateWorkerId] === 0) {
        break;
      }
    }
  };

  recursiveSolver(0, 0);

  return minOverallMaxDuration;
};
