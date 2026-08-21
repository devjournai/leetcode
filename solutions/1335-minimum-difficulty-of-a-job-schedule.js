/**
 * Minimum Difficulty Of A Job Schedule
 * Intuition: Partition n jobs into d contiguous days; a day's cost is the max job that day. DP[day][jobs] = min of previous day + max of the last block.
 * Approach: 1. If jobs < d return -1. 2. dp[0][0]=0, rest Infinity. 3. For day, for j jobs, walk the last-block start, tracking the block max. 4. Return dp[d][n] or -1.
 * Dry Run: jobDifficulty = [6,5,4,3,2,1], d=2. Best split after first job: 6 + 5 = 11.
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
          jobDifficulty[previousJobBoundary]
        );
        minimumTotalDifficulties[currentDayIteration][jobsProcessedUpTo] =
          Math.min(
            minimumTotalDifficulties[currentDayIteration][jobsProcessedUpTo],
            minimumTotalDifficulties[currentDayIteration - 1][
              previousJobBoundary
            ] + dailyJobMaxDifficulty
          );
      }
    }
  }

  return minimumTotalDifficulties[d][jobCountValue] === Infinity
    ? -1
    : minimumTotalDifficulties[d][jobCountValue];
};
