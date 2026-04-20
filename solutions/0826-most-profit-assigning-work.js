/**
 * Most Profit Assigning Work
 * Time Complexity: O(N log N + M log M)
 * Space Complexity: O(N)
 */
var maxProfitAssignment = function (
  difficultyInput,
  profitInput,
  workerAbilityInput,
) {
  const jobItems = [];
  const jobsQuantity = difficultyInput.length;
  for (
    let currentJobIndex = 0;
    currentJobIndex < jobsQuantity;
    currentJobIndex++
  ) {
    jobItems.push({
      difficultyLevel: difficultyInput[currentJobIndex],
      potentialProfit: profitInput[currentJobIndex],
    });
  }

  jobItems.sort((jobA, jobB) => jobA.difficultyLevel - jobB.difficultyLevel);

  workerAbilityInput.sort((workerA, workerB) => workerA - workerB);

  let totalEarnings = 0;
  let jobPointer = 0;
  let maximumAchievableProfit = 0;

  const workersCount = workerAbilityInput.length;
  for (
    let currentWorkerPointer = 0;
    currentWorkerPointer < workersCount;
    currentWorkerPointer++
  ) {
    const currentWorkerAbility = workerAbilityInput[currentWorkerPointer];

    while (
      jobPointer < jobsQuantity &&
      jobItems[jobPointer].difficultyLevel <= currentWorkerAbility
    ) {
      maximumAchievableProfit = Math.max(
        maximumAchievableProfit,
        jobItems[jobPointer].potentialProfit,
      );
      jobPointer++;
    }

    totalEarnings += maximumAchievableProfit;
  }

  return totalEarnings;
};
