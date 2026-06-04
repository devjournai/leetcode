/**
 * Maximum Value Of K Coins From Piles
 * Intuition: This problem can be modeled as a variation of the knapsack problem. For each pile, we can choose to take a certain number of coins (a prefix of the pile) or none at all. The goal is to maximize the total value for exactly 'k' coins.
 * Approach: 1. Utilize dynamic programming with a bottom-up approach. Define `dpScores[j]` as the maximum value obtainable by picking exactly `j` coins from the piles processed so far.
 * 2. Initialize `dpScores` array of size `k + 1` with zeros. `dpScores[0]` represents zero value for zero coins.
 * 3. Iterate through each `currentPile` in the input `piles` array.
 * 4. For each `currentPile`, iterate `coinBudgetIterator` from `k` down to `0`. Iterating downwards ensures that when we query `dpScores[coinBudgetIterator - coinsQuantityTaken]`, we are referencing values from *previous* piles, not the `currentPile`'s contributions in the same iteration (which would be an incorrect re-use of the current pile).
 * 5. Inside the `coinBudgetIterator` loop, iterate through possible `coinsQuantityTaken` from the `currentPile`. Maintain `currentPileValueAccumulator` for the sum of coins taken from the current pile.
 * 6. Update `dpScores[coinBudgetIterator]` by taking the maximum of its current value (representing not taking any coins from `currentPile`) and the sum of `currentPileValueAccumulator` (value from `currentPile`) plus `dpScores[coinBudgetIterator - coinsQuantityTaken]` (value from previous piles using remaining budget).
 * 7. After processing all piles, `dpScores[k]` will hold the maximum total value.
 * Dry Run: piles = [[1,100],[2,3],[4]], k = 2
 * Initial: dpScores = [0, 0, 0] (indices 0, 1, 2)
 *
 * Pile 0: [1, 100] (length 2)
 *   coinBudgetIterator = 2:
 *     currentPileValueAccumulator = 0, coinsTakenActual = 0
 *     - Take 1 coin (1): accumulator = 1, coins = 1. dpScores[2] = max(dpScores[2], 1 + dpScores[1]) = max(0, 1 + 0) = 1.
 *     - Take 2 coins (1, 100): accumulator = 101, coins = 2. dpScores[2] = max(dpScores[2], 101 + dpScores[0]) = max(1, 101 + 0) = 101.
 *   coinBudgetIterator = 1:
 *     currentPileValueAccumulator = 0, coinsTakenActual = 0
 *     - Take 1 coin (1): accumulator = 1, coins = 1. dpScores[1] = max(dpScores[1], 1 + dpScores[0]) = max(0, 1 + 0) = 1.
 * After Pile 0: dpScores = [0, 1, 101]
 *
 * Pile 1: [2, 3] (length 2)
 *   coinBudgetIterator = 2:
 *     currentPileValueAccumulator = 0, coinsTakenActual = 0
 *     - Take 1 coin (2): accumulator = 2, coins = 1. dpScores[2] = max(dpScores[2], 2 + dpScores[1]) = max(101, 2 + 1) = 101.
 *     - Take 2 coins (2, 3): accumulator = 5, coins = 2. dpScores[2] = max(dpScores[2], 5 + dpScores[0]) = max(101, 5 + 0) = 101.
 *   coinBudgetIterator = 1:
 *     currentPileValueAccumulator = 0, coinsTakenActual = 0
 *     - Take 1 coin (2): accumulator = 2, coins = 1. dpScores[1] = max(dpScores[1], 2 + dpScores[0]) = max(1, 2 + 0) = 2.
 * After Pile 1: dpScores = [0, 2, 101]
 *
 * Pile 2: [4] (length 1)
 *   coinBudgetIterator = 2:
 *     currentPileValueAccumulator = 0, coinsTakenActual = 0
 *     - Take 1 coin (4): accumulator = 4, coins = 1. dpScores[2] = max(dpScores[2], 4 + dpScores[1]) = max(101, 4 + 2) = 101.
 *   coinBudgetIterator = 1:
 *     currentPileValueAccumulator = 0, coinsTakenActual = 0
 *     - Take 1 coin (4): accumulator = 4, coins = 1. dpScores[1] = max(dpScores[1], 4 + dpScores[0]) = max(2, 4 + 0) = 4.
 * After Pile 2: dpScores = [0, 4, 101]
 *
 * Final Result: dpScores[2] = 101.
 * Time Complexity: O(K * T)
 * Space Complexity: O(K)
 */
var maxValueOfCoins = function (piles, k) {
  const totalPiles = piles.length;
  const dpScores = new Array(k + 1).fill(0);

  for (
    let pileIndexIterator = 0;
    pileIndexIterator < totalPiles;
    pileIndexIterator++
  ) {
    const currentPileData = piles[pileIndexIterator];
    const currentPileDataLength = currentPileData.length;

    for (
      let coinBudgetIterator = k;
      coinBudgetIterator >= 0;
      coinBudgetIterator--
    ) {
      let currentPileValueAccumulator = 0;
      let coinsTakenActual = 0;

      while (
        coinsTakenActual < currentPileDataLength &&
        coinBudgetIterator - (coinsTakenActual + 1) >= 0
      ) {
        currentPileValueAccumulator += currentPileData[coinsTakenActual];
        coinsTakenActual++;

        const valueFromPreviousPiles =
          dpScores[coinBudgetIterator - coinsTakenActual];
        const potentialTotalValue =
          currentPileValueAccumulator + valueFromPreviousPiles;

        dpScores[coinBudgetIterator] = Math.max(
          dpScores[coinBudgetIterator],
          potentialTotalValue,
        );
      }
    }
  }

  return dpScores[k];
};
