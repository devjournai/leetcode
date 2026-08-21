/**
 * Most Profit Assigning Work
 * Intuition: Sort jobs by difficulty and workers by ability. A two-pointer walk lets each worker take the max profit among all jobs they can do, which is nondecreasing as ability grows.
 * Approach: 1. Pack `{difficultyLevel, potentialProfit}` and sort. 2. Sort workers. 3. Advance `jobPointer` while difficulty ≤ ability, tracking `maximumAchievableProfit`. 4. Add that to `totalEarnings`.
 * Dry Run: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]. Workers get 20,20,30,30 → 100.
 * Time Complexity: O(N log N + M log M)
 * Space Complexity: O(N)
 */
var maxProfitAssignment = function (
  difficultyInput,
  profitInput,
  workerAbilityInput
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
        jobItems[jobPointer].potentialProfit
      );
      jobPointer++;
    }

    totalEarnings += maximumAchievableProfit;
  }

  return totalEarnings;
};
