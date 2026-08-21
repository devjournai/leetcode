/**
 * Coin Change
 * Intuition: The fewest coins for amount x is 1 plus the fewest for x - coin, over all coins. Memoize each remainder so overlapping subproblems are not recomputed.
 * Approach: 1. Negative amount → -1; 0 → 0. 2. Array of size amount + 1 filled with -2 (unknown); index 0 is 0. 3. Recurse: if remainder < 0 return -1; if memoized return it; else try each coin and take min 1 + result. 4. Store -1 when no combination works; return memo[amount].
 * Dry Run: coins = [1, 2, 5], amount = 11.
 *   - findMinCoins(11) explores 11 - 5, 11 - 2, 11 - 1; 5 + 5 + 1 uses 3 coins.
 *   - Memo fills smaller remainders first; return 3.
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 */
var coinChange = function (coins, amount) {
  if (amount < 0) {
    return -1;
  }
  if (amount === 0) {
    return 0;
  }

  const memoizedResults = new Array(amount + 1).fill(-2);
  memoizedResults[0] = 0;

  function findMinCoins(currentSumToAchieve) {
    if (currentSumToAchieve < 0) {
      return -1;
    }
    if (memoizedResults[currentSumToAchieve] !== -2) {
      return memoizedResults[currentSumToAchieve];
    }

    let currentMinimumCoins = Infinity;

    for (const denominationValue of coins) {
      const recursiveResult = findMinCoins(
        currentSumToAchieve - denominationValue
      );

      if (recursiveResult !== -1) {
        currentMinimumCoins = Math.min(
          currentMinimumCoins,
          1 + recursiveResult
        );
      }
    }

    memoizedResults[currentSumToAchieve] =
      currentMinimumCoins === Infinity ? -1 : currentMinimumCoins;
    return memoizedResults[currentSumToAchieve];
  }

  const finalCoinCount = findMinCoins(amount);
  return finalCoinCount;
};
