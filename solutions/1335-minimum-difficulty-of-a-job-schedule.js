/**
 * Minimum Difficulty Of A Job Schedule
 * Time Complexity: O(d * n^2)
 * Space Complexity: O(d * n)
 */
var minDifficulty = function (jobDifficulty, d) {
  const jobCountValue = jobDifficulty.length;

  if (jobCountValue < d) {
    return -1;
  }

  const minimumTotalDifficulties = new Array(d + 1)
    .fill(null)
    .map(() => new Array(jobCountValue + 1).fill(Infinity));

  minimumTotalDifficulties[0][0] = 0;

  for (
    let currentDayIteration = 1;
    currentDayIteration <= d;
    currentDayIteration++
  ) {
    for (
      let jobsProcessedUpTo = currentDayIteration;
      jobsProcessedUpTo <= jobCountValue;
      jobsProcessedUpTo++
    ) {
      let dailyJobMaxDifficulty = 0;
      for (
        let previousJobBoundary = jobsProcessedUpTo - 1;
        previousJobBoundary >= currentDayIteration - 1;
        previousJobBoundary--
      ) {
        dailyJobMaxDifficulty = Math.max(
          dailyJobMaxDifficulty,
          jobDifficulty[previousJobBoundary],
        );
        minimumTotalDifficulties[currentDayIteration][jobsProcessedUpTo] =
          Math.min(
            minimumTotalDifficulties[currentDayIteration][jobsProcessedUpTo],
            minimumTotalDifficulties[currentDayIteration - 1][
              previousJobBoundary
            ] + dailyJobMaxDifficulty,
          );
      }
    }
  }

  return minimumTotalDifficulties[d][jobCountValue] === Infinity
    ? -1
    : minimumTotalDifficulties[d][jobCountValue];
};
