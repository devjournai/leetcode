/**
 * Maximum Profit In Job Scheduling
 * Intuition: After sorting by start, dp[i] is max profit from jobs i..end: skip job i, or take it plus dp of the first job starting at/after its end.
 * Approach: 1. Pack (start,end,profit) and sort by start. 2. From the back, binary-search the next non-overlapping job. 3. dp[i]=max(dp[i+1], profit+dp[next]).
 * Dry Run: jobs (1,3,50),(2,4,10),(3,5,40). Take first+third = 90 vs skip → 90.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var jobScheduling = function (startTime, endTime, profit) {
  const numberOfJobs = startTime.length;
  const allJobs = new Array(numberOfJobs);

  for (
    let currentConstructIndex = 0;
    currentConstructIndex < numberOfJobs;
    currentConstructIndex++
  ) {
    allJobs[currentConstructIndex] = [
      startTime[currentConstructIndex],
      endTime[currentConstructIndex],
      profit[currentConstructIndex],
    ];
  }

  allJobs.sort((jobA, jobB) => jobA[0] - jobB[0]);

  const dynamicProgrammingTable = new Array(numberOfJobs + 1).fill(0);

  for (
    let currentJobPosition = numberOfJobs - 1;
    currentJobPosition >= 0;
    currentJobPosition--
  ) {
    const currentJobDetails = allJobs[currentJobPosition];
    const currentJobBeginning = currentJobDetails[0];
    const currentJobEnding = currentJobDetails[1];
    const currentJobReward = currentJobDetails[2];

    const profitSkippingCurrent =
      dynamicProgrammingTable[currentJobPosition + 1];

    let searchLowBoundary = currentJobPosition + 1;
    let searchHighBoundary = numberOfJobs - 1;
    let nextAvailableJobIndex = numberOfJobs;

    while (searchLowBoundary <= searchHighBoundary) {
      const searchMidpoint = Math.floor(
        (searchLowBoundary + searchHighBoundary) / 2
      );
      if (allJobs[searchMidpoint][0] >= currentJobEnding) {
        nextAvailableJobIndex = searchMidpoint;
        searchHighBoundary = searchMidpoint - 1;
      } else {
        searchLowBoundary = searchMidpoint + 1;
      }
    }

    const profitIncludingCurrent =
      currentJobReward + dynamicProgrammingTable[nextAvailableJobIndex];

    dynamicProgrammingTable[currentJobPosition] = Math.max(
      profitSkippingCurrent,
      profitIncludingCurrent
    );
  }

  return dynamicProgrammingTable[0];
};
