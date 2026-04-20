/**
 * Maximum Profit In Job Scheduling
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
        (searchLowBoundary + searchHighBoundary) / 2,
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
      profitIncludingCurrent,
    );
  }

  return dynamicProgrammingTable[0];
};
