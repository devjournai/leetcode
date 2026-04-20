/**
 * Sell Diminishing Valued Colored Balls
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxProfit = function (inventory, orders) {
  const modulusValue = 1e9 + 7;
  let overallProfit = 0;
  let remainingOrders = orders;

  inventory.sort((firstItem, secondItem) => secondItem - firstItem);

  let currentLevelIndex = 0;
  while (remainingOrders > 0 && currentLevelIndex < inventory.length) {
    let currentLevelCount = inventory[currentLevelIndex];
    let nextLevelCount =
      currentLevelIndex + 1 < inventory.length
        ? inventory[currentLevelIndex + 1]
        : 0;

    if (currentLevelCount === nextLevelCount) {
      currentLevelIndex++;
      continue;
    }

    let distinctColorsAtCurrentLevel = currentLevelIndex + 1;
    let countDifferential = currentLevelCount - nextLevelCount;

    let sellableBallsInBatch = distinctColorsAtCurrentLevel * countDifferential;

    if (remainingOrders >= sellableBallsInBatch) {
      let startValueBig = BigInt(currentLevelCount);
      let endValueBig = BigInt(nextLevelCount + 1);
      let numberOfBallsPerColor = BigInt(countDifferential);

      let sumPerColorBig =
        ((startValueBig + endValueBig) * numberOfBallsPerColor) / BigInt(2);
      let batchTotalProfitBig =
        (sumPerColorBig * BigInt(distinctColorsAtCurrentLevel)) %
        BigInt(modulusValue);

      overallProfit =
        (overallProfit + Number(batchTotalProfitBig)) % modulusValue;
      remainingOrders -= sellableBallsInBatch;
    } else {
      let ballsPerColorToSell = Math.floor(
        remainingOrders / distinctColorsAtCurrentLevel,
      );
      let remainingSingleSales = remainingOrders % distinctColorsAtCurrentLevel;

      if (ballsPerColorToSell > 0) {
        let sellStartValBig = BigInt(currentLevelCount);
        let sellEndValBig = BigInt(currentLevelCount - ballsPerColorToSell + 1);
        let salesCountPerColorBig = BigInt(ballsPerColorToSell);

        let partialSumPerColorBig =
          ((sellStartValBig + sellEndValBig) * salesCountPerColorBig) /
          BigInt(2);
        let partialBatchProfitBig =
          (partialSumPerColorBig * BigInt(distinctColorsAtCurrentLevel)) %
          BigInt(modulusValue);

        overallProfit =
          (overallProfit + Number(partialBatchProfitBig)) % modulusValue;
      }

      if (remainingSingleSales > 0) {
        let valueForRemainingBalls = BigInt(
          currentLevelCount - ballsPerColorToSell,
        );
        let remainderProfitBig =
          (valueForRemainingBalls * BigInt(remainingSingleSales)) %
          BigInt(modulusValue);

        overallProfit =
          (overallProfit + Number(remainderProfitBig)) % modulusValue;
      }
      remainingOrders = 0;
    }
    currentLevelIndex++;
  }

  return overallProfit;
};
