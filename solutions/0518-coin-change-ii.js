/**
 * Coin Change II
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 */
var change = function (amount, coins) {
  const totalTargetAmount = amount;
  const availableDenominations = coins;

  const waysToMakeSum = new Array(totalTargetAmount + 1).fill(0);

  waysToMakeSum[0] = 1;

  for (const currentCoinValue of availableDenominations) {
    for (
      let targetSumIndex = currentCoinValue;
      targetSumIndex <= totalTargetAmount;
      targetSumIndex++
    ) {
      waysToMakeSum[targetSumIndex] +=
        waysToMakeSum[targetSumIndex - currentCoinValue];
    }
  }

  return waysToMakeSum[totalTargetAmount];
};
