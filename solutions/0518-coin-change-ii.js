/**
 * Coin Change II
 * Intuition: Unbounded knapsack: after considering each coin, `ways[x]` is combinations using coins seen so far. Outer coin loop avoids permutation double-counting.
 * Approach: 1. `waysToMakeSum[0]=1`, rest 0. 2. For each `currentCoinValue`, for sums from that coin up to `amount`, add `ways[sum - coin]`. 3. Return `waysToMakeSum[amount]`.
 * Dry Run: amount=5, coins=[1,2,5].
 *   - After 1s: all 1. After 2s: ways[5]=3. After 5: ways[5]+=ways[0] → 4.
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
