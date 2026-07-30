/**
 * Maximum Coins Heroes Can Collect
 * Intuition: To efficiently find the maximum coins a hero can collect, we need to quickly determine all monsters they can defeat and sum their corresponding coins. Sorting monsters by power allows us to use binary search to find the count of defeatable monsters for any hero. A prefix sum of coins for these sorted monsters then enables constant time calculation of the total coins.
 * Approach: 1. Pair each monster's power with its coin value. 2. Sort these pairs in ascending order based on monster power. 3. Create a prefix sum array from the sorted coin values, where each element represents the total coins from monsters up to that index. 4. For each hero, use a binary search (specifically, `bisect_right` or equivalent) on the sorted monster powers to find the count of monsters they can defeat. 5. Use this count as an index into the prefix sum array to retrieve the maximum coins the hero can collect. 6. Store and return these results for all heroes.
 * Dry Run: Input: heroes=[3, 4, 5], monsters=[1, 2, 3], coins=[10, 20, 30]
 * 1. `combinedMonsterCoinInfo` becomes `[[1, 10], [2, 20], [3, 30]]`.
 * 2. `sortedMonsterCoinInfo` remains `[[1, 10], [2, 20], [3, 30]]` as it's already sorted.
 * 3. `sortedMonsterStrengths` becomes `[1, 2, 3]`.
 * 4. `sortedEarnableCoins` becomes `[10, 20, 30]`.
 * 5. `runningCoinTotals` (prefix sum):
 *    - `[0]`
 *    - `[0, 10]` (0 + 10)
 *    - `[0, 10, 30]` (10 + 20)
 *    - `[0, 10, 30, 60]` (30 + 30)
 * 6. Iterate `heroPowersParam`:
 *    - `currentHeroPower = 3`: `findRightmostInsertPoint([1,2,3], 3)` returns `3`.
 *      `defeatableMonsterCount = 3`. `totalCoinsCollected = runningCoinTotals[3] = 60`. `finalHeroOutcomes = [60]`.
 *    - `currentHeroPower = 4`: `findRightmostInsertPoint([1,2,3], 4)` returns `3`.
 *      `defeatableMonsterCount = 3`. `totalCoinsCollected = runningCoinTotals[3] = 60`. `finalHeroOutcomes = [60, 60]`.
 *    - `currentHeroPower = 5`: `findRightmostInsertPoint([1,2,3], 5)` returns `3`.
 *      `defeatableMonsterCount = 3`. `totalCoinsCollected = runningCoinTotals[3] = 60`. `finalHeroOutcomes = [60, 60, 60]`.
 * 7. Return `[60, 60, 60]`.
 * Time Complexity: O(M log M + N log M)
 * Space Complexity: O(M + N)
 */
var maximumCoins = function (
  heroPowersParam,
  monsterPowersParam,
  coinValuesParam,
) {
  const combinedMonsterCoinInfo = monsterPowersParam.map((monsterVal, mIdx) => [
    monsterVal,
    coinValuesParam[mIdx],
  ]);

  combinedMonsterCoinInfo.sort((a, b) => a[0] - b[0]);

  const sortedMonsterStrengths = combinedMonsterCoinInfo.map((item) => item[0]);
  const sortedEarnableCoins = combinedMonsterCoinInfo.map((item) => item[1]);

  const runningCoinTotals = [0];
  for (
    let prefixSumIdx = 0;
    prefixSumIdx < sortedEarnableCoins.length;
    prefixSumIdx++
  ) {
    const currentMonsterCoinAmount = sortedEarnableCoins[prefixSumIdx];
    runningCoinTotals[prefixSumIdx + 1] =
      runningCoinTotals[prefixSumIdx] + currentMonsterCoinAmount;
  }

  const finalHeroOutcomes = [];
  for (const currentHeroPower of heroPowersParam) {
    const defeatableMonsterCount = findRightmostInsertPoint(
      sortedMonsterStrengths,
      currentHeroPower,
    );
    const totalCoinsCollected = runningCoinTotals[defeatableMonsterCount];
    finalHeroOutcomes.push(totalCoinsCollected);
  }

  return finalHeroOutcomes;

  function findRightmostInsertPoint(powerArray, powerTarget) {
    let leftBoundary = 0;
    let rightBoundary = powerArray.length;

    while (leftBoundary < rightBoundary) {
      const midpointIndex = Math.floor((leftBoundary + rightBoundary) / 2);
      const midpointValue = powerArray[midpointIndex];
      if (midpointValue <= powerTarget) {
        leftBoundary = midpointIndex + 1;
      } else {
        rightBoundary = midpointIndex;
      }
    }
    return leftBoundary;
  }
};
